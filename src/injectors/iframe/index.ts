'use strict';

import { AppLoader } from '../../micro-frontend';
import { ContentInjector, ContentInjectorRegistry } from '../injector';
import { FrameHandler } from './frame-state';

export class IFrameInjector extends ContentInjector {
  private contentInjected = false;
  private contentFrame: HTMLIFrameElement;

  constructor(loader: AppLoader) {
    super(loader);
  }

  public async inject() {
    this.contentFrame = document.createElement('iframe');
    this.contentFrame.className = 'content';
    this.contentFrame.src = this.loader.src;
    this.loader.appendChild(this.contentFrame);
    await new FrameHandler(this.contentFrame).waitForFrameLoad();
    this.contentInjected = true;
  }

  public async remove() {
    if (this.contentFrame) {
      this.contentFrame.remove();
      this.contentFrame = null;
      this.contentInjected = false;
    }
  }

  public get injected() {
    return this.contentInjected;
  }
}

ContentInjectorRegistry.register(
  'iframe',
  loader => new IFrameInjector(loader)
);
