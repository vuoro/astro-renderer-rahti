import { identifier, html, createRoot, ServerElement } from "@vuoro/rahti";

const check = (effect) => !!effect[identifier];

const renderToStaticMarkup = (effect, props, childHtml) => {
  let childFragment;
  if (childHtml) {
    childFragment = html["astro-fragment"]();
    childFragment.append(childHtml);
  }

  const root = createRoot(new ServerElement());
  const result = effect(root, props, childFragment);

  return handleResult(result);
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
