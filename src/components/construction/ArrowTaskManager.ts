/**
 * ArrowTaskManager.ts
 * Central construction coordinator for the 10 persistent arrow agents.
 * - Manages target registry, priority task queue, and velocity-responsive dispatching.
 * - Guarantees that a DIFFERENT arrow from the 10-arrow pool paints the text than the one that built the boundary.
 * - Handles viewport priority and home chakra returns.
 */

import { GlobalArrowPool, ArrowAgent } from './GlobalArrowPool';
import { scrollVelocity } from './ScrollVelocityController';

export interface ConstructionTask {
  id: string;
  targetId: string;
  type: 'boundary' | 'fill' | 'text';
  getBounds: () => DOMRect | null;
  borderRadius?: number;
  priority: number;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed';
  assignedArrowId: string | null;
  excludeArrowId?: string | null; // Arrow that cannot be used (e.g. ensure different arrow for text)
  onProgress?: (progress: number, arrowPos: { x: number; y: number; angle: number } | null) => void;
  onComplete?: () => void;
  builderArrowId?: string; // Stored when boundary completes
}

class ArrowTaskManagerImpl {
  private static instance: ArrowTaskManagerImpl;
  private tasks: Map<string, ConstructionTask> = new Map();
  private completedTaskIds: Set<string> = new Set();
  private isRunning: boolean = false;
  private rafId: number | null = null;
  public isInstantReveal: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('construct-all-regions', () => this.triggerInstantReveal());
    }
  }

  public static getInstance(): ArrowTaskManagerImpl {
    if (!ArrowTaskManagerImpl.instance) {
      ArrowTaskManagerImpl.instance = new ArrowTaskManagerImpl();
    }
    return ArrowTaskManagerImpl.instance;
  }

  /**
   * Register a new task in the queue
   */
  public registerTask(task: ConstructionTask): void {
    if (this.completedTaskIds.has(task.id)) {
      task.onProgress?.(1, null);
      task.onComplete?.();
      return;
    }

    if (this.isInstantReveal) {
      this.completedTaskIds.add(task.id);
      task.status = 'completed';
      task.onProgress?.(1, null);
      task.onComplete?.();
      return;
    }

    this.tasks.set(task.id, task);
    this.ensureLoopRunning();
  }

  /**
   * Unregister task on component unmount
   */
  public unregisterTask(taskId: string): void {
    const task = this.tasks.get(taskId);
    if (task && task.assignedArrowId) {
      GlobalArrowPool.releaseArrow(task.assignedArrowId);
    }
    this.tasks.delete(taskId);
  }

  /**
   * Immediately mark all registered tasks complete (for Instant Reveal Mode)
   */
  public triggerInstantReveal(): void {
    this.isInstantReveal = true;
    this.tasks.forEach((task) => {
      task.status = 'completed';
      task.onProgress?.(1, null);
      task.onComplete?.();
      this.completedTaskIds.add(task.id);
      if (task.assignedArrowId) {
        GlobalArrowPool.releaseArrow(task.assignedArrowId);
      }
    });
    this.tasks.clear();
  }

  /**
   * Reset instant reveal (when live painting is re-enabled)
   */
  public resetInstantReveal(): void {
    this.isInstantReveal = false;
  }

  /**
   * Check if a task is already completed
   */
  public isTaskCompleted(taskId: string): boolean {
    return this.completedTaskIds.has(taskId) || this.isInstantReveal;
  }

  /**
   * Get the arrow ID that built a specific boundary task
   */
  public getBuilderArrowId(boundaryTaskId: string): string | undefined {
    return this.tasks.get(boundaryTaskId)?.builderArrowId;
  }

  private ensureLoopRunning(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.tick();
  }

  /**
   * Main scheduler tick: matches available arrows with highest-priority tasks
   */
  public updateScheduler(): void {
    if (this.isInstantReveal) return;

    // Count how many arrows are currently working
    const activeWorkingCount = GlobalArrowPool.agents.filter(
      (a) => a.state === 'traveling' || a.state === 'working'
    ).length;

    const maxAllowed = scrollVelocity.maxConcurrentArrows;
    if (activeWorkingCount >= maxAllowed) {
      return; // Reached current velocity concurrency limit
    }

    // Filter pending tasks
    const pendingTasks = Array.from(this.tasks.values()).filter(
      (t) => t.status === 'pending'
    );

    if (pendingTasks.length === 0) return;

    // Recalculate dynamic priority based on distance to viewport
    const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;
    const vCenter = vh / 2;

    pendingTasks.forEach((task) => {
      const bounds = task.getBounds();
      if (!bounds) {
        task.priority = -9999;
        return;
      }
      const top = bounds.top;
      const bottom = bounds.bottom;
      const elemCenter = (top + bottom) / 2;
      const dist = Math.abs(elemCenter - vCenter);

      // Tasks in viewport have highest priority (1000 - dist)
      if (top < vh && bottom > 0) {
        task.priority = 10000 - dist;
      } else if (top >= vh) {
        // Below viewport: closer is higher
        task.priority = 5000 - (top - vh);
      } else {
        // Above viewport
        task.priority = 1000 - Math.abs(bottom);
      }
    });

    // Sort descending by priority
    pendingTasks.sort((a, b) => b.priority - a.priority);

    // Assign tasks to available idle arrows
    for (const task of pendingTasks) {
      if (GlobalArrowPool.getAvailableArrows().length === 0) break;
      if (
        GlobalArrowPool.agents.filter(
          (a) => a.state === 'traveling' || a.state === 'working'
        ).length >= maxAllowed
      ) {
        break;
      }

      // Try to acquire an arrow respecting excludeArrowId
      const arrow = GlobalArrowPool.acquireAvailableArrow(task.excludeArrowId);
      if (!arrow) continue;

      this.dispatchTask(task, arrow);
    }
  }

  /**
   * Dispatch a task to an arrow agent
   */
  private dispatchTask(task: ConstructionTask, arrow: ArrowAgent): void {
    task.status = 'in_progress';
    task.assignedArrowId = arrow.id;
    arrow.currentTaskId = task.id;
    arrow.taskType = task.type;
    arrow.taskProgress = 0;
    arrow.state = 'traveling';

    const bounds = task.getBounds();
    if (!bounds) {
      this.completeTask(task, arrow);
      return;
    }

    // Determine target start coordinates
    let startX = bounds.left + Math.min(task.borderRadius || 20, bounds.width / 2);
    let startY = bounds.top;

    if (task.type === 'text') {
      startX = bounds.left;
      startY = bounds.top + bounds.height * 0.5;
    }

    arrow.targetX = startX;
    arrow.targetY = startY;
  }

  /**
   * Complete task and return arrow to circular home slot
   */
  public completeTask(task: ConstructionTask, arrow: ArrowAgent): void {
    task.status = 'completed';
    task.builderArrowId = arrow.id;
    this.completedTaskIds.add(task.id);
    this.tasks.delete(task.id);

    task.onProgress?.(1, null);
    task.onComplete?.();

    // Send arrow back to circular home formation
    GlobalArrowPool.releaseArrow(arrow.id);
  }

  private tick = () => {
    this.updateScheduler();

    // Check if tasks remain or arrows are still returning/working
    const hasActiveArrows = GlobalArrowPool.agents.some((a) => a.state !== 'home');
    const hasPendingTasks = Array.from(this.tasks.values()).some(
      (t) => t.status === 'pending'
    );

    if (hasActiveArrows || hasPendingTasks || !this.isInstantReveal) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.isRunning = false;
    }
  };
}

export const ArrowTaskManager = ArrowTaskManagerImpl.getInstance();
