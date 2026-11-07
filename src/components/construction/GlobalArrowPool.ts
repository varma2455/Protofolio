/**
 * GlobalArrowPool.ts
 * Manages the persistent pool of EXACTLY 8 intelligent arrow agents.
 * Strict constraint: Never instantiate more than 8 arrows. All sections share this pool.
 */

export interface ArrowTrailPoint {
  x: number;
  y: number;
  opacity: number;
}

export type ArrowState = 'home' | 'traveling' | 'working' | 'returning';

export interface ArrowAgent {
  id: string; // 'arrow-1' ... 'arrow-8'
  index: number; // 0..7
  homeAngle: number; // in radians
  state: ArrowState;
  x: number;
  y: number;
  angle: number; // degrees
  targetX: number;
  targetY: number;
  color: string;
  glowColor: string;
  currentTaskId: string | null;
  taskType: 'boundary' | 'text' | 'fill' | null;
  taskProgress: number; // 0..1
  trail: ArrowTrailPoint[];
  lastUsedTimestamp: number;
}

const AGENT_COLORS = [
  { color: '#D6B36A', glow: 'rgba(214, 179, 106, 0.45)' }, // Metallic Champagne Gold
  { color: '#F5F0E6', glow: 'rgba(245, 240, 230, 0.45)' }, // Warm Ivory Silver
  { color: '#B99555', glow: 'rgba(185, 149, 85, 0.40)' },  // Warm Bronze Gold
  { color: '#E5C98A', glow: 'rgba(229, 201, 138, 0.45)' }, // Bright Light Gold
  { color: '#CBD5E1', glow: 'rgba(203, 213, 225, 0.40)' }, // Metallic Chrome Silver
  { color: '#D6B36A', glow: 'rgba(214, 179, 106, 0.45)' }, // Champagne Gold
  { color: '#B99555', glow: 'rgba(185, 149, 85, 0.40)' },  // Bronze
  { color: '#F5F0E6', glow: 'rgba(245, 240, 230, 0.45)' }, // Silver Ivory
];

class GlobalArrowPoolManager {
  private static instance: GlobalArrowPoolManager;
  public readonly agents: ArrowAgent[] = [];
  public circleCenter: { x: number; y: number } = { x: 0, y: 0 };
  public circleRadius: number = 85;
  public circleRotation: number = 0; // degrees

  public isStarted: boolean = false;
  private targetCircleCenter: { x: number; y: number } = { x: 0, y: 0 };
  private targetRadius: number = 85;

  private constructor() {
    // Create exactly 8 persistent arrow agents once
    for (let i = 0; i < 8; i++) {
      const homeAngle = (i * 2 * Math.PI) / 8;
      this.agents.push({
        id: `arrow-${i + 1}`,
        index: i,
        homeAngle,
        state: 'home',
        x: 0,
        y: 0,
        angle: (homeAngle * 180) / Math.PI + 90,
        targetX: 0,
        targetY: 0,
        color: AGENT_COLORS[i].color,
        glowColor: AGENT_COLORS[i].glow,
        currentTaskId: null,
        taskType: null,
        taskProgress: 0,
        trail: [],
        lastUsedTimestamp: 0,
      });
    }

    if (typeof window !== 'undefined') {
      this.updateCircleCenter();
      this.circleCenter = { ...this.targetCircleCenter };
      this.circleRadius = this.targetRadius;
      window.addEventListener('resize', () => this.updateCircleCenter());
    }
  }

  public static getInstance(): GlobalArrowPoolManager {
    if (!GlobalArrowPoolManager.instance) {
      GlobalArrowPoolManager.instance = new GlobalArrowPoolManager();
    }
    return GlobalArrowPoolManager.instance;
  }

  public setStarted(started: boolean = true): void {
    this.isStarted = started;
    this.updateCircleCenter();
  }

  public updateCircleCenter(customCenter?: { x: number; y: number }): void {
    if (customCenter) {
      this.targetCircleCenter = customCenter;
      return;
    }
    if (typeof window !== 'undefined') {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (!this.isStarted) {
        // Initial state: Centered majestically in the viewport
        this.targetCircleCenter = {
          x: vw / 2,
          y: vh * 0.44,
        };
        this.targetRadius = vw > 768 ? 95 : 70;
      } else {
        // Active scroll state: Docked as an elegant master HUD on the right
        this.targetCircleCenter = {
          x: vw > 1024 ? vw - 120 : vw - 65,
          y: vw > 1024 ? vh * 0.38 : 75,
        };
        this.targetRadius = vw > 1024 ? 65 : 45;
      }
    }
  }

  /**
   * Smoothly lerps current circle center toward target
   */
  public stepCircleCenter(): void {
    this.circleCenter.x += (this.targetCircleCenter.x - this.circleCenter.x) * 0.08;
    this.circleCenter.y += (this.targetCircleCenter.y - this.circleCenter.y) * 0.08;
    this.circleRadius += (this.targetRadius - this.circleRadius) * 0.08;
  }

  /**
   * Calculates the exact home coordinates and tangent angle for an agent
   */
  public getHomePosition(agentIndex: number): { x: number; y: number; angle: number } {
    const rotationRad = (this.circleRotation * Math.PI) / 180;
    const currentAngle = this.agents[agentIndex].homeAngle + rotationRad;
    const x = this.circleCenter.x + Math.cos(currentAngle) * this.circleRadius;
    const y = this.circleCenter.y + Math.sin(currentAngle) * this.circleRadius;
    // Tangent angle along the circle (clockwise)
    const angle = (currentAngle * 180) / Math.PI + 90;
    return { x, y, angle };
  }

  /**
   * Acquire an available arrow from the 8-arrow pool.
   * If excludeArrowId is provided (e.g. for text painting after boundary), another arrow is chosen.
   */
  public acquireAvailableArrow(excludeArrowId?: string | null): ArrowAgent | null {
    // 1. Look for an idle 'home' arrow that is not excluded
    const available = this.agents.filter(
      (a) => a.state === 'home' && (!excludeArrowId || a.id !== excludeArrowId)
    );

    if (available.length === 0) {
      return null;
    }

    // Pick least recently used arrow for even distribution
    available.sort((a, b) => a.lastUsedTimestamp - b.lastUsedTimestamp);
    return available[0];
  }

  /**
   * Get all currently available idle arrows
   */
  public getAvailableArrows(): ArrowAgent[] {
    return this.agents.filter((a) => a.state === 'home');
  }

  /**
   * Release an arrow back to its home state
   */
  public releaseArrow(agentId: string): void {
    const agent = this.agents.find((a) => a.id === agentId);
    if (!agent) return;
    agent.state = 'returning';
    agent.currentTaskId = null;
    agent.taskType = null;
    agent.taskProgress = 0;
    agent.lastUsedTimestamp = Date.now();
  }
}

export const GlobalArrowPool = GlobalArrowPoolManager.getInstance();
