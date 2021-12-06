import { identifier, html, createRoot, ServerElement } from "@vuoro/rahti";

const check = (effect) => !!effect[identifier];

const renderToStaticMarkup = (effect, props, childHtml) => {
  let childFragment;
  if (childHtml) {
    childFragment = html["astro-fragment"]();
    childFragment.append(childHtml);
  }

  const rootElement = new ServerElement();
  const root = createRoot(rootElement);

  effect(root, props, childFragment);

  return { html: handleResult(rootElement) };
};

const handleResult = (result) => {
  let markup = "";
  const resultType = typeof result;

  if (result instanceof ServerElement || resultType === "string") {
    markup += result;
  } else if (resultType === "object" && Symbol.iterator in result) {
    for (const child of result) {
      markup += handleResult(child);
    }
  }

  return markup;
};

export default {
  check,
  renderToStaticMarkup,
};
