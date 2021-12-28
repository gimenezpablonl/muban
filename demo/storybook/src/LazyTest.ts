import { defineComponent, propType, refElement } from "@muban/muban";
import { isBoolean, optional } from "isntnt";
import { supportLazy } from "@muban/muban/lib/api/apiLazy";

export const LazyTest = defineComponent({
  name: 'lazy-test',
  props: {
    initialValue: propType.boolean,
    isExpanded: propType.boolean.validate(optional(isBoolean)),
  },
  setup() {
    return [];
  },
});

export const lazy = supportLazy(LazyTest);
