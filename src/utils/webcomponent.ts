'use strict';

export class Events {
  public static addEvent(element: any, eventName: string, value: string) {
    if (value) {
      const handler = Function('event', value) as EventListener;
      element.addEventListener(eventName, element);
      element['on' + eventName] = handler;
    } else {
      delete element['on' + eventName];
      element.removeEventListener(eventName, element);
    }

    if (!element['handleEvent']) {
      element['handleEvent'] = (e: any) => {
        return element['on' + e.type](e);
      };
    }
  }

  public static dispatchEvent(
    name: string,
    targetElement: Element,
    properties?: Array<EventProperty>
  ) {
    const targetEvent: any = new CustomEvent(name);
    if (properties) {
      properties.forEach(property => {
        targetEvent[property.name] = property.value;
      });
    }
    targetElement.dispatchEvent(targetEvent);
  }
}

export interface EventProperty {
  name: string;
  value: any;
}

export class Attributes {
  public static initAttribute(
    element: Element,
    attrName: string,
    defaultValue: any
  ) {
    if (!element.hasAttribute(attrName)) {
      element.setAttribute(attrName, defaultValue);
    }
  }
}
