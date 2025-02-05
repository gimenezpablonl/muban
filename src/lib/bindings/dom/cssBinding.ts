/* eslint-disable @typescript-eslint/no-explicit-any */
import { unref, watchEffect } from '@vue/runtime-core';
import type { Ref } from '@vue/reactivity';
import type { BindingMap, BindingValue } from '../bindings.types';

const previousCssBindingKey = '__muban__cssValue';

export function cssBinding(
  target: HTMLElement,
  value: BindingValue<string> | BindingMap<boolean>,
): () => void {
  return watchEffect(() => {
    const classes = unref<string | Record<string, boolean> | Record<string, Ref<boolean>>>(value);

    if (typeof classes === 'string') {
      // first remove the previously set classes, since our binding has changed
      const previousCssValue = (target as any)[previousCssBindingKey];
      target.classList.remove(...previousCssValue.split(/\s/gi));

      // then store and set our new classes
      (target as any)[previousCssBindingKey] = classes;
      target.classList.add(...classes.split(/\s/gi));
    } else {
      Object.entries(classes).forEach(([name, shouldHaveClass]) => {
        name.split(/\s/gi).forEach((className) => {
          target.classList.toggle(className, unref(shouldHaveClass));
        });
      });
    }
  });
}
