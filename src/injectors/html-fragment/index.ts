'use strict';

import { AppLoader } from '../../plastic-bag';
import { ContentInjector, ContentInjectorRegistry } from '../injector';
import { ScriptTagHandler } from './script-tags';

export class HTMLInjector extends ContentInjector {
  private scriptTagHandler: ScriptTagHandler = ScriptTagHandler.instance();
  private contentInjected = false;
  private contentElement: HTMLDivElement;

  constructor(loader: AppLoader) {
    super(loader);
  }

  public async inject() {
    this.contentElement = document.createElement('div');
    this.contentElement.className = 'content';
    this.loader.rootElement.appendChild(this.contentElement);
    this.contentElement.innerHTML = await this.getContent();
    await this.scriptTagHandler.evaluateScripts(this.contentElement);
    this.contentInjected = true;
  }

  public async remove() {
    if (this.contentElement) {
      this.contentElement.remove();
      this.contentElement = null;
      this.contentInjected = false;
    }
  }

  public get injected() {
    return this.contentInjected;
  }

  private async getContent() {
    // TODO receive an optional options object, to allow fetch configuration.
    // something like: this.loader.fetchOptions
    const response = await fetch(this.loader.src);

    if (response.ok) {
      return await response.text();
    }
    throw new Error(`Error loading resource. Status: ${response.statusText}`);
  }
}

ContentInjectorRegistry.register(
  'html-fragment',
  loader => new HTMLInjector(loader)
);
