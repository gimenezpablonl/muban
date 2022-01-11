/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentApi, ComponentFactory } from '../Component.types';
import type { App } from '../api/apiCreateApp';

// TODO move inside the "createApi" ?
export function mount<P extends Record<string, unknown>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app: App,
  component: ComponentFactory,
  container: HTMLElement | null,
  template?: (props: P) => string | Array<string>,
  data?: P,
): ComponentApi | undefined {
  if (!container) {
    // eslint-disable-next-line no-console
    console.error(`The received container is null, so nothing can be rendered`);
    return;
  }

  if (template) {
    const templateResult = template(data || ({} as P));
    // eslint-disable-next-line no-param-reassign
    container.innerHTML = [].concat(templateResult as any).join('');
  }

  const rootElement =
    container.dataset['data-component'] === component.displayName
      ? container
      : container.querySelector<HTMLElement>(`[data-component="${component.displayName}"]`);

  if (!rootElement) {
    // eslint-disable-next-line no-console
    console.error(
      `No element found with "data-component" set to "${component.displayName}", unable to render the component.`,
    );
    return;
  }

  return component(rootElement, { app });
}
