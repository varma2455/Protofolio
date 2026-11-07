/**
 * ScrollVelocityController.ts
 * Real-time scroll velocity tracker adapting arrow agent speed and concurrency.
 * - Slow scrolling: 1-2 arrows work at a time (durations: 1.2 - 1.6s)
 * - Normal scrolling: 3-5 arrows work simultaneously (durations: 0.8 - 1.1s)
 * - Fast scrolling: 6-8 arrows work simultaneously (durations: 0.5 - 0.7s)
 * - Extremely fast scrolling: all 10 arrows work on separate pending tasks (durations: 0.28 - 0.45s)
 * Never allow more than 10 arrows to exist or operate.
 */

export class ScrollVelocityController {
  private static instance: ScrollVelocityController;
  public velocity: number = 0; // px/sec
  public speedMultiplier: number = 1.0; // 1.0x to 3.8x
  public direction: 'down' | 'up' | 'idle' = 'idle';
  public maxConcurrentArrows: number = 2;

  private lastScrollY: number = 0;
  private lastTimestamp: number = 0;
  private idleTimeout: any = null;
  private listeners: Set<(velocity: number, multiplier: number) => void> = new Set();

  private constructor() {
    if (typeof window !== 'undefined') {
      this.lastScrollY = window.scrollY;
      this.lastTimestamp = performance.now();
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }

  public static getInstance(): ScrollVelocityController {
    if (!ScrollVelocityController.instance) {
      ScrollVelocityController.instance = new ScrollVelocityController();
    }
    return ScrollVelocityController.instance;
  }

  private handleScroll = () => {
    const currentY = window.scrollY;
    const currentTimestamp = performance.now();
    const dt = Math.max(1, currentTimestamp - this.lastTimestamp);
    const dy = currentY - this.lastScrollY;

    // Velocity in px per millisecond
    const rawVelocity = Math.abs(dy / dt);

    // Direction
    if (dy > 1) {
      this.direction = 'down';
    } else if (dy < -1) {
      this.direction = 'up';
    }

    // Smooth velocity with lerp
    this.velocity = this.velocity * 0.4 + rawVelocity * 0.6;

    // Speed multiplier: rawVelocity ~ 0 => 1.0x, high speed => up to 3.8x
    const multiplier = Math.min(3.8, Math.max(1.0, 1.0 + this.velocity * 1.6));
    this.speedMultiplier = multiplier;

    // Concurrency based on velocity matching strict specifications:
    // - Slow scrolling: 1-2 arrows work at a time
    // - Normal scrolling: 3-5 arrows can work simultaneously
    // - Fast scrolling: 6-8 arrows can work simultaneously
    // - Extremely fast scrolling: all 10 arrows work on separate pending tasks
    if (this.velocity < 0.3) {
      this.maxConcurrentArrows = 2; // slow scroll: 1-2
    } else if (this.velocity < 1.2) {
      this.maxConcurrentArrows = 5; // normal scroll: 3-5
    } else if (this.velocity < 2.5) {
      this.maxConcurrentArrows = 8; // fast scroll: 6-8
    } else {
      this.maxConcurrentArrows = 10; // extremely fast scroll: all 10 arrows
    }

    this.lastScrollY = currentY;
    this.lastTimestamp = currentTimestamp;

    this.notifyListeners();

    // Idle detection with smooth recovery
    clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(() => {
      this.velocity = 0;
      this.speedMultiplier = 1.0;
      this.direction = 'idle';
      this.maxConcurrentArrows = 2;
      this.notifyListeners();
    }, 200);
  };

  public subscribe(callback: (velocity: number, multiplier: number) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners() {
    this.listeners.forEach((cb) => cb(this.velocity, this.speedMultiplier));
  }

  /**
   * Returns scaled duration for an operation based on current velocity
   */
  public scaleDuration(baseDuration: number): number {
    return Math.max(0.28, baseDuration / this.speedMultiplier);
  }
}

export const scrollVelocity = ScrollVelocityController.getInstance();
