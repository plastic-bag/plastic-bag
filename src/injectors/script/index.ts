'use strict';

import { AppLoader } from '../../plastic-bag';
import { ContentInjector, ContentInjectorRegistry } from '../injector';
import { ScriptHandler } from './script-state';

export class ScriptInjector extends ContentInjector {
  private contentInjected = false;
  private scriptElement: HTMLScriptElement;

  constructor(loader: AppLoader) {
    super(loader);
  }

  public async inject() {
    this.scriptElement = document.createElement('script');
    this.scriptElement.type = 'text/javascript';
    this.scriptElement.src = this.loader.src;
    this.loader.rootElement.appendChild(this.scriptElement);
    await new ScriptHandler(this.scriptElement).waitForScriptLoad();
    this.contentInjected = true;
  }

  public async remove() {
    if (this.scriptElement) {
      this.scriptElement.remove();
      this.scriptElement = null;
      this.contentInjected = false;
    }
  }

  public get injected() {
    return this.contentInjected;
  }
}

ContentInjectorRegistry.register(
  'script',
  loader => new ScriptInjector(loader)
);
