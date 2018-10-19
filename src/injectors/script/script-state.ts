'use strict';

export class ScriptHandler {
  private scriptElement: HTMLScriptElement;

  constructor(scriptElement: HTMLScriptElement) {
    this.scriptElement = scriptElement;
  }

  public async waitForScriptLoad() {
    return new Promise<void>((resolve, reject) => {
      this.scriptElement.onerror = () => {
        this.clearCallbacks();
        reject('Error loading script tag');
      };
      this.scriptElement.onload = () => {
        this.clearCallbacks();
        resolve();
      };
      const scriptElement: any = this.scriptElement;
      scriptElement.onreadystatechange = () => {
        if (
          scriptElement.readyState === 'complete' ||
          scriptElement.readyState === 'loaded'
        ) {
          scriptElement.onload();
        }
      };
    });
  }

  private clearCallbacks() {
    this.scriptElement.onerror = (this
      .scriptElement as any).onreadystatechange = this.scriptElement.onload = function() {
      //
    };
  }
}
