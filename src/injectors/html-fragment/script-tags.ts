'use strict';

import { insertAfter } from '../../utils/dom';
import { runInNextTick } from '../../utils/promise';

export class ScriptTagHandler {
  public static instance() {
    return ScriptTagHandler.scriptTagHandler;
  }

  private static scriptTagHandler: ScriptTagHandler = new ScriptTagHandler();

  private scripts: Array<HTMLScriptElement>;
  private scriptContent: string;
  private originalWrite: (...content: Array<string>) => void;

  private constructor() {}

  /**
   * Evaluates any script inserted on the given element using element.innerHTML.
   * @param element the base element
   */
  public async evaluateScripts(element: HTMLElement) {
    element.insertAdjacentElement('afterbegin', this.getRootElementScript(element))
    if (!this.scripts) {
      this.scripts = new Array<HTMLScriptElement>();
    }
    const scriptElements = element.getElementsByTagName('script');

    if (scriptElements && scriptElements.length > 0) {
      for (let i = 0; i < scriptElements.length; i++) {
        this.scripts.push(scriptElements.item(i));
      }
      await this.processNextScript();
    }
  }

  private getRootElementScript(root: HTMLElement) {
    const isShadow = !document.contains(root)
    const getRootElementScript = document.createElement('script');
    getRootElementScript.async = false;
    if (isShadow) {
      const host = (root.parentNode as ShadowRoot).host
      if (!host.id) {
        throw Error("A plastic-bag element with shadow-root needs an id");
      }
      getRootElementScript.innerText = `function getRoot(){ return document.getElementById('${host.id}').shadowRoot;}`; 
    } else {
      getRootElementScript.innerText = "function getRoot(){ return document;}"; 
    }

    return getRootElementScript
  }

  private async processNextScript() {
    if (this.scripts.length > 0) {
      const script: HTMLScriptElement = this.scripts.shift();
      const cloneScript: HTMLScriptElement = this.cloneScript(script);
      await runInNextTick(async () =>
        this.processScriptTag(script, cloneScript)
      );
    }
  }

  private async processScriptTag(
    script: HTMLScriptElement,
    cloneScript: HTMLScriptElement
  ) {
    this.handleDocWriteFunction();
    try {
      const src = script.src;

      script.parentElement.replaceChild(cloneScript, script);
      // If it is a cross domain script, the content loading is assynchronous
      if (script.async || this.isXDomain(src)) {
        await this.handleAsyncScriptLoad(cloneScript);
      }

      await this.scriptLoadedHandler(cloneScript);
    } catch (e) {
      this.restoreDocWriteFunction();
      throw e;
    }
  }

  private async scriptLoadedHandler(cloneScript: HTMLScriptElement) {
    const content = this.getDocWrittenContent();
    this.restoreDocWriteFunction();
    // If the imported script performed a document.write call, we need to manually
    // attach this content to the DOM to be able to re evaluate this content searching
    // for new scripts
    if (content) {
      const wrapperElement: HTMLDivElement = document.createElement('div');
      wrapperElement.innerHTML = content;
      insertAfter(wrapperElement, cloneScript);
      await runInNextTick(async () => this.evaluateScripts(wrapperElement));
    }
    await this.processNextScript();
  }

  private isXDomain(src: string) {
    if (!src) {
      return false;
    }
    const parts = /^(\w+:)?\/\/([^\/?#]+)/.exec(src);
    return (
      parts &&
      ((parts[1] && parts[1] !== location.protocol) ||
        parts[2] !== location.host)
    );
  }

  // if cloned using node.cloneNode(), browser does not evaluate the
  // inner javascript when tag is attached
  private cloneScript(script: HTMLScriptElement): HTMLScriptElement {
    const cloneScript = document.createElement('script');
    cloneScript.type = 'text/javascript';
    cloneScript.lang = 'javascript';
    if (script.async) {
      cloneScript.async = script.async;
    }
    if (script.hasAttribute('src')) {
      cloneScript.src = script.src;
    } else {
      this.copyScriptContent(script, cloneScript);
    }

    return cloneScript;
  }

  private handleDocWriteFunction() {
    this.scriptContent = '';
    this.originalWrite = document.write;
    document.write = (s: string) => {
      this.scriptContent += s;
    };
  }

  private getDocWrittenContent() {
    return this.scriptContent;
  }

  private restoreDocWriteFunction() {
    this.scriptContent = '';
    document.write = this.originalWrite;
    this.originalWrite = null;
  }

  private async handleAsyncScriptLoad(script: HTMLScriptElement) {
    return new Promise<void>((resolve, reject) => {
      script.onload = (script as any).onreadystatechange = function() {
        if (
          !this.readyState ||
          this.readyState === 'loaded' ||
          this.readyState === 'complete'
        ) {
          script.onload = (script as any).onreadystatechange = null;
          script.parentNode.removeChild(script);
          resolve();
        }
      };
      script.onerror = script.onabort = () =>
        reject(new Error('Can not load script'));
    });
  }

  private copyScriptContent(
    script: HTMLScriptElement,
    cloneScript: HTMLScriptElement
  ) {
    let text = script.innerHTML;
    if (!text) {
      text = script.text;
    }
    cloneScript.appendChild(document.createTextNode(text));
  }
}
