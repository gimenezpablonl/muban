/* eslint-disable max-lines */
import { html } from '@muban/template';
import type { Story } from '@muban/storybook/types-6-0';
import { bind, defineComponent, computed, ref } from '@muban/muban';

export default {
  title: 'bindings/css',
};

export const CssObjectWithMultipleClasses: Story = () => ({
  component: defineComponent({
    name: 'object',
    refs: {
      item: 'item',
      info1: 'info1',
      info2: 'info2',
      info3: 'info3',
      checkbox1: 'checkbox1',
      checkbox2: 'checkbox2',
    },
    setup({ refs }) {
      const isPositive = ref<boolean>(false);
      const isNegative = ref<boolean>(false);
      return [
        bind(refs.info1, { text: isPositive }),
        bind(refs.info2, { text: isNegative }),
        bind(refs.info3, { text: computed(() => `${isPositive.value ? '.is-positive .foobar ' : ''} ${isNegative.value ? '.is-negative' : ''}` )}),
        bind(refs.checkbox1, { checked: isPositive }),
        bind(refs.checkbox2, { checked: isNegative }),
        bind(refs.item, { css: {
          'is-positive foobar': isPositive,
          'is-negative': isNegative
        }}),
      ];
    },
  }),
  template: () => html` <div data-component="object">
    <div data-ref="item">
      <p>Classnames: <span data-ref="info3"></span></p>
    </div>
    <p>is positive? <span data-ref="info1"></span></p>
    <p><input data-ref="checkbox1" type="checkbox" value="foo"/></p>
    <p>is negative? <span data-ref="info2"></span></p>
    <p><input data-ref="checkbox2" type="checkbox" value="foo" /></p>
  </div>`,
});