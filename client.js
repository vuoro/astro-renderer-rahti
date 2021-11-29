import { createRoot } from "@vuoro/rahti";

const parser = new DOMParser();

export default (element) => {
  const root = createRoot(element);

  return (effect, props, childHtml) => {
    const children = [];

    if (childHtml) {
      const childDocument = parser.parseFromString(childHtml, "text/html");
      children.push(...childDocument.body.childNodes);
    }

    effect(root, props, children);
  };
};
