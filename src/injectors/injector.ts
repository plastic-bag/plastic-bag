'use strict';

import { AppLoader } from '../micro-frontend';

export abstract class ContentInjector {
  public injected: boolean;
  protected loader: AppLoader;

  constructor(loader: AppLoader) {
    this.loader = loader;
  }

  public abstract inject(): Promise<void>;
  public abstract remove(): Promise<void>;
}

export type ContentInjectorFactory = (loader: AppLoader) => ContentInjector;

export class ContentInjectorRegistry {
  public static register(type: string, factory: ContentInjectorFactory) {
    ContentInjectorRegistry.registry[type] = factory;
  }

  public static createInjector(loader: AppLoader) {
    const factory = ContentInjectorRegistry.registry[loader.type];
    if (factory) {
      return factory(loader);
    }
    throw new Error('Invalid type of microfront');
  }

  private static registry: { [index: string]: ContentInjectorFactory } = {};
}
