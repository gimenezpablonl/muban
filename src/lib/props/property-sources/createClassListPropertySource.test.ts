/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unused-vars,unicorn/prevent-abbreviations,no-console,no-return-assign */
import type { PropTypeInfo } from '../propDefinitions.types';
import { createClassListPropertySource } from './createClassListPropertySource';

// @ts-ignore TS6133 unused variable
function createElementHtml(content: string): HTMLElement {
  const element = document.createElement('div');
  element.innerHTML = content;
  return element.firstChild as HTMLElement;
}

const mockConsoleWarn = () => {
  const consoleOutput: Array<unknown> = [];
  const mockedWarn = (...args: Array<unknown>) => consoleOutput.push(args);
  beforeEach(() => (console.warn = mockedWarn));
  return consoleOutput;
};

const mockConsoleError = () => {
  const consoleOutput: Array<unknown> = [];
  const mockedError = (...args: Array<unknown>) => consoleOutput.push(args);
  beforeEach(() => (console.error = mockedError));
  return consoleOutput;
};

describe('createClassListPropertySource', () => {
  const originalError = console.error;
  afterEach(() => (console.error = originalError));
  // @ts-ignore TS6133 unused variable
  const errorOutput = mockConsoleError();
  const originalWarn = console.warn;
  afterEach(() => (console.warn = originalWarn));
  // @ts-ignore TS6133 unused variable
  const warnOutput = mockConsoleWarn();

  it('should create without errors', () => {
    expect(createClassListPropertySource).not.toThrow();
  });
  it('should allow calling the created source without errors', () => {
    expect(createClassListPropertySource()).not.toThrow();
  });
  describe('hasProp', () => {
    describe('when using default source', () => {
      it('should return false if String property does not exist', () => {
        const element = document.createElement('div');
        const propInfo: PropTypeInfo = {
          name: 'foo',
          type: String,
          source: {
            name: 'str',
            target: element,
          },
        };
        expect(createClassListPropertySource()(element).hasProp(propInfo)).toBe(false);
      });
      it('should return true if Boolean property does not exist', () => {
        const element = document.createElement('div');
        const propInfo: PropTypeInfo = {
          name: 'foo',
          type: Boolean,
          source: {
            name: 'str',
            target: element,
          },
        };
        expect(createClassListPropertySource()(element).hasProp(propInfo)).toBe(true);
      });
      it('should return true if target is null', () => {
        const element = document.createElement('div');
        const propInfo: PropTypeInfo = {
          name: 'foo',
          type: Boolean,
          source: {
            name: 'str',
            target: undefined,
          },
        };
        expect(createClassListPropertySource()(element).hasProp(propInfo)).toBe(true);
      });
    });
    describe('when using explicit source', () => {
      it('should return true if String property does not exist', () => {
        const element = document.createElement('div');
        const propInfo: PropTypeInfo = {
          name: 'foo',
          type: String,
          source: {
            name: 'str',
            target: element,
            type: 'css',
          },
        };
        expect(createClassListPropertySource()(element).hasProp(propInfo)).toBe(true);
      });
      it('should return true if Boolean property does not exist', () => {
        const element = document.createElement('div');
        const propInfo: PropTypeInfo = {
          name: 'foo',
          type: String,
          source: {
            name: 'str',
            target: element,
            type: 'css',
          },
        };
        expect(createClassListPropertySource()(element).hasProp(propInfo)).toBe(true);
      });
      it('should return false if target is null', () => {
        const element = document.createElement('div');
        const propInfo: PropTypeInfo = {
          name: 'foo',
          type: Boolean,
          source: {
            name: 'str',
            target: undefined,
            type: 'css',
          },
        };
        expect(createClassListPropertySource()(element).hasProp(propInfo)).toBe(false);
      });
    });
  });
  // describe('getProp', () => {
  //   it('should return undefined if the property does not exist', () => {
  //     const element = document.createElement('div');
  //     const propInfo: PropTypeInfo = {
  //       name: 'foo',
  //       type: String,
  //       source: {
  //         name: 'str',
  //         target: element,
  //       },
  //     };
  //     expect(createClassListPropertySource()(element).getProp(propInfo)).toBe(undefined);
  //   });
  //   it('should return a string if property does exist', () => {
  //     const element = document.createElement('div');
  //     element.dataset.str = 'foobar';
  //     const propInfo: PropTypeInfo = {
  //       name: 'foo',
  //       type: String,
  //       source: {
  //         name: 'str',
  //         target: element,
  //       },
  //     };
  //     expect(createClassListPropertySource()(element).getProp(propInfo)).toBe('foobar');
  //   });
  //   it('should return undefined if property is type Function', () => {
  //     const element = document.createElement('div');
  //     element.dataset.str = 'foobar';
  //     const propInfo: PropTypeInfo = {
  //       name: 'foo',
  //       type: Function,
  //       source: {
  //         name: 'str',
  //         target: element,
  //       },
  //     };
  //     expect(createClassListPropertySource()(element).getProp(propInfo)).toBe(undefined);
  //   });
  //   describe('conversion', () => {
  //     describe('Number', () => {
  //       it('should return a Number', () => {
  //         const element = document.createElement('div');
  //         element.dataset.value = '123.45';
  //         const propInfo: PropTypeInfo = {
  //           name: 'foo',
  //           type: Number,
  //           source: {
  //             name: 'value',
  //             target: element,
  //           },
  //         };
  //         const value = createClassListPropertySource()(element).getProp(propInfo);
  //         expect(value).toEqual(123.45);
  //         expect(typeof value).toBe('number');
  //       });
  //       it('should return undefined for invalid number', () => {
  //         const element = document.createElement('div');
  //         element.dataset.value = 'sdf';
  //         const propInfo: PropTypeInfo = {
  //           name: 'foo',
  //           type: Number,
  //           source: {
  //             name: 'value',
  //             target: element,
  //           },
  //         };
  //         const value = createClassListPropertySource()(element).getProp(propInfo);
  //         expect(typeof value).toBe('undefined');
  //         expect(value).toEqual(undefined);
  //       });
  //     });
  //
  //     describe('Boolean', () => {
  //       it('should return a true Boolean', () => {
  //         const element = document.createElement('div');
  //         element.dataset.value = 'true';
  //         const propInfo: PropTypeInfo = {
  //           name: 'foo',
  //           type: Boolean,
  //           source: {
  //             name: 'value',
  //             target: element,
  //           },
  //         };
  //         const value = createClassListPropertySource()(element).getProp(propInfo);
  //         expect(typeof value).toBe('boolean');
  //         expect(value).toEqual(true);
  //       });
  //       it('should return a false Boolean', () => {
  //         const element = document.createElement('div');
  //         element.dataset.value = 'false';
  //         const propInfo: PropTypeInfo = {
  //           name: 'foo',
  //           type: Boolean,
  //           source: {
  //             name: 'value',
  //             target: element,
  //           },
  //         };
  //         const value = createClassListPropertySource()(element).getProp(propInfo);
  //         expect(typeof value).toBe('boolean');
  //         expect(value).toEqual(false);
  //       });
  //       it('should return a false Boolean when empty value', () => {
  //         const element = document.createElement('div');
  //         element.dataset.value = '';
  //         const propInfo: PropTypeInfo = {
  //           name: 'foo',
  //           type: Boolean,
  //           source: {
  //             name: 'value',
  //             target: element,
  //           },
  //         };
  //         const value = createClassListPropertySource()(element).getProp(propInfo);
  //         expect(typeof value).toBe('boolean');
  //         expect(value).toEqual(false);
  //       });
  //     });
  //
  //     describe('Date', () => {
  //       it('should return a Date', () => {
  //         const element = document.createElement('div');
  //         element.dataset.value = '1983-09-23T08:35:02.000Z';
  //         const propInfo: PropTypeInfo = {
  //           name: 'foo',
  //           type: Date,
  //           source: {
  //             name: 'value',
  //             target: element,
  //           },
  //         };
  //         const value = createClassListPropertySource()(element).getProp(propInfo);
  //         expect(value).toBeInstanceOf(Date);
  //         expect((value as Date)?.toISOString()).toEqual('1983-09-23T08:35:02.000Z');
  //       });
  //       it('should return undefined for an invalid Date', () => {
  //         const element = document.createElement('div');
  //         element.dataset.value = 'sdf';
  //         const propInfo: PropTypeInfo = {
  //           name: 'foo',
  //           type: Date,
  //           source: {
  //             name: 'value',
  //             target: element,
  //           },
  //         };
  //         const value = createClassListPropertySource()(element).getProp(propInfo);
  //         expect(typeof value).toBe('undefined');
  //         expect(value).toEqual(undefined);
  //       });
  //     });
  //
  //     describe('Array', () => {
  //       it('should return an Array', () => {
  //         const element = document.createElement('div');
  //         element.dataset.value = '[1, true, "foobar"]';
  //         const propInfo: PropTypeInfo = {
  //           name: 'foo',
  //           type: Array,
  //           source: {
  //             name: 'value',
  //             target: element,
  //           },
  //         };
  //         const value = createClassListPropertySource()(element).getProp(propInfo);
  //         expect(value).toBeInstanceOf(Array);
  //         expect(value).toEqual([1, true, 'foobar']);
  //       });
  //       it('should return undefined for an invalid Array', () => {
  //         const element = document.createElement('div');
  //         element.dataset.value = 'sdf';
  //         const propInfo: PropTypeInfo = {
  //           name: 'foo',
  //           type: Array,
  //           source: {
  //             name: 'value',
  //             target: element,
  //           },
  //         };
  //         const value = createClassListPropertySource()(element).getProp(propInfo);
  //         expect(typeof value).toBe('undefined');
  //         expect(value).toEqual(undefined);
  //       });
  //     });
  //   });
  // });
  // // TODO: rename to 'data'
  // describe('css', () => {
  //   const sources = [createClassListPropertySource()];
  //   const getResolvedProps = (element: HTMLElement, props: Record<string, PropTypeDefinition>) => {
  //     const instance = createComponentInstance({}, element, {
  //       name: 'test-component',
  //       setup: () => [],
  //     });
  //     const instanceRefs = createComponentRefs({}, instance);
  //
  //     return getComponentProps(props, element, sources, instanceRefs);
  //   };
  //   describe('string', () => {
  //     it('should return the value when exists', () => {
  //       const element = createElementHtml(`<div data-value="foo">content</div>`);
  //       const props = {
  //         value: propType.string.source({ type: 'data' }),
  //       };
  //
  //       expect(getResolvedProps(element, props)).toEqual({
  //         value: 'foo',
  //       });
  //     });
  //     it(`should return undefined when missing`, () => {
  //       const element = createElementHtml(`<div>content</div>`);
  //       const props = {
  //         value: propType.string.source({ type: 'data' }),
  //       };
  //
  //       const resolvedProps = getResolvedProps(element, props);
  //
  //       expect(resolvedProps).toEqual({});
  //       expect(errorOutput.flat()).toContain('Property "value" is not available in source "data".');
  //     });
  //     it(`should return the default value when missing`, () => {
  //       const element = createElementHtml(`<div>content</div>`);
  //       const props = {
  //         value: propType.string.defaultValue('bar').source({ type: 'data' }),
  //       };
  //
  //       expect(getResolvedProps(element, props)).toEqual({
  //         value: 'bar',
  //       });
  //     });
  //     it(`should return undefined without error when missing and optional`, () => {
  //       const element = createElementHtml(`<div>content</div>`);
  //       const props = {
  //         optionalValue: propType.string.optional.source({ type: 'data' }),
  //       };
  //
  //       const resolvedProps = getResolvedProps(element, props);
  //
  //       expect(resolvedProps).toEqual({});
  //       expect(errorOutput.flat()).not.toContain(
  //         'Property "optionalValue" is not available in source "data".',
  //       );
  //     });
  //   });
  //   describe('boolean', () => {
  //     it('should return the value when exists', () => {
  //       const element = createElementHtml(`<div data-expanded="true">content</div>`);
  //       const props = {
  //         expanded: propType.boolean.source({ type: 'data' }),
  //       };
  //
  //       expect(getResolvedProps(element, props)).toEqual({
  //         expanded: true,
  //       });
  //     });
  //     it(`should return undefined when missing`, () => {
  //       const element = createElementHtml(`<div>content</div>`);
  //       const props = {
  //         expanded: propType.boolean.source({ type: 'data' }),
  //       };
  //
  //       const resolvedProps = getResolvedProps(element, props);
  //
  //       expect(resolvedProps).toEqual({});
  //       expect(errorOutput.flat()).toContain(
  //         'Property "expanded" is not available in source "data".',
  //       );
  //     });
  //     it(`should return the default value when missing`, () => {
  //       const element = createElementHtml(`<div>content</div>`);
  //       const props = {
  //         expanded: propType.boolean.defaultValue(true).source({ type: 'data' }),
  //       };
  //
  //       expect(getResolvedProps(element, props)).toEqual({
  //         expanded: true,
  //       });
  //     });
  //     it(`should return undefined without error when missing and optional`, () => {
  //       const element = createElementHtml(`<div>content</div>`);
  //       const props = {
  //         optionalExpanded: propType.boolean.optional.source({ type: 'data' }),
  //       };
  //
  //       const resolvedProps = getResolvedProps(element, props);
  //
  //       expect(resolvedProps).toEqual({});
  //       expect(errorOutput.flat()).not.toContain(
  //         'Property "optionalExpanded" is not available in source "data".',
  //       );
  //     });
  //   });
  // });
});
