'use strict';

export class FrameHandler {
  private frameElement: HTMLIFrameElement;

  constructor(frameElement: HTMLIFrameElement) {
    this.frameElement = frameElement;
  }

  public async waitForFrameLoad(timeout?: number) {
    return new Promise<void>((resolve, reject) => {
      if (!timeout) {
        timeout = 60 * 1000; // 1 min for default timeout;
      }
      const contentLoaded = () => {
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        resolve();
      };

      const checkFrameInterval = setInterval(() => {
        if (this.checkFrameState()) {
          clearInterval(checkFrameInterval);
          contentLoaded();
        }
      }, 10);

      const timeoutTimer = setTimeout(() => {
        clearInterval(checkFrameInterval);
        reject(
          new Error(`Timeout error. The frame did not load after ${timeout} ms`)
        );
      }, timeout);
    });
  }

  private checkFrameState() {
    if (this.frameElement && this.frameElement.contentDocument) {
      const state = this.frameElement.contentDocument.readyState;
      return state === 'complete';
    }
    return false;
  }
}
