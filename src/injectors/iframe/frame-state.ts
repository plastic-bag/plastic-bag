'use strict';

export class FrameHandler {
  private frameElement: HTMLIFrameElement;

  constructor(frameElement: HTMLIFrameElement) {
    this.frameElement = frameElement;
  }

  public async waitForFrameLoad() {
    return Promise.all([this.checkStatus(), this.checkFrameLoad()]);
  }

  private checkStatus() {
    return fetch(this.frameElement.src, { method: 'HEAD' }).then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    });
  }

  static timeout = 60 * 1000; // 1 min for default timeout

  private checkFrameLoad() {
    return new Promise<void>((resolve, reject) => {
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
          new Error(
            `Timeout error. The frame did not load after ${
              FrameHandler.timeout
            } ms`
          )
        );
      }, FrameHandler.timeout);
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
