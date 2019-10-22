'use strict';

import { ContentInjector, ContentInjectorRegistry } from './injectors/injector';
import { Attributes, Events } from './utils/webcomponent';

export class AppLoader extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'onloaded', 'onerror', 'width', 'height', 'src', 'with-shadow-dom'];
  }

  get src(): string {
    return this.source;
  }

  set src(value: string) {
    if (this.source !== value) {
      this.source = value;
      this.reload();
    }
  }

  get type(): string {
    return this.injectionType;
  }

  set type(value: string) {
    if (this.injectionType !== value) {
      this.injectionType = value;
      this.injector = null;
    }
  }

  get width(): string {
    return this.style.width;
  }

  set width(value: string) {
    this.style.width = value;
  }

  get height(): string {
    return this.style.height;
  }

  set height(value: string) {
    this.style.height = value;
  }

  get withShadowDOM(): boolean {
    return this.shadowDOM;
  }

  set withShadowDOM(value: boolean) {
    if (this.shadowDOM !== value) {
      if (value) {
        this.attachShadow({ mode: 'open' });
        this.shadowDOM = value;
      } else {
        throw Error('Once created we can\'t remove a shadowDOM.')
      }
    }
  }

  get rootElement() {
    return this.shadowRoot ? this.shadowRoot : this
  }

  private initialized: boolean = false;
  private injectionType: string;
  private injector: ContentInjector;
  private source: string;
  private loaded: boolean = false;
  private shadowDOM: boolean = false;

  constructor() {
    super();
  }

  public connectedCallback() {
    if (!this.initialized) {
      this.style.display = 'block';

      Attributes.initAttribute(this, 'type', 'script');
      Attributes.initAttribute(this, 'height', 'auto');

      this.initialized = true;
    }
  }

  public attributeChangedCallback(
    attrName: string,
    oldValue: any,
    newValue: any
  ) {
    if (/^on/.test(attrName)) {
      Events.addEvent(this, attrName.slice(2), newValue);
    } else if (attrName === 'with-shadow-dom') {
      this.withShadowDOM = newValue !== false;
    } else if (attrName === 'src') {
      this.src = newValue;
    } else if (attrName === 'type') {
      this.type = newValue;
    } else if (attrName === 'width') {
      this.width = newValue;
    } else if (attrName === 'height') {
      this.height = newValue;
    }
  }

  public async reload() {
    await this.unload();
    await this.load();
  }

  public async unload(clear?: boolean) {
    if (this.loaded) {
      if (clear) {
        this.src = '';
      }
      const injector = this.getInjector();
      if (injector.injected) {
        await injector.remove();
      }
      this.loaded = false;
    }
  }

  private async load() {
    if (this.src) {
      try {
        await this.getInjector().inject();
        this.loaded = true;
        Events.dispatchEvent('loaded', this);
      } catch (e) {
        Events.dispatchEvent('error', this, [{ name: 'error', value: e }]);
      }
    }
  }

  private getInjector(): ContentInjector {
    if (!this.injector) {
      this.injector = ContentInjectorRegistry.createInjector(this);
    }
    return this.injector;
  }
}

if (!customElements.get || !customElements.get('plastic-bag')) {
  customElements.define('plastic-bag', AppLoader);
}
