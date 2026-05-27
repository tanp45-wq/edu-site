/// <reference types="vite/client" />

declare module 'gsap-trial/SplitText' {
  export class SplitText {
    constructor(target: any, vars?: any);
    chars: any[];
    lines: any[];
    words: any[];
    revert(): void;
  }
}

declare module 'gsap-trial/ScrollSmoother' {
  export class ScrollSmoother {
    static create(vars: any): ScrollSmoother;
    static refresh(value?: boolean): void;
    static get(): ScrollSmoother;
    scrollTop(val?: number): number;
    paused(value?: boolean): boolean | void;
    scrollTo(target: any, smooth?: boolean, position?: string): void;
  }
}
