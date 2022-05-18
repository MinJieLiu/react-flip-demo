export function createChildElementRectMap(
  nodes: HTMLElement | null | undefined
) {
  if (!nodes) {
    return new Map();
  }
  const elements = Array.from(nodes.childNodes) as HTMLElement[];
  return new Map(elements.map((node) => [node, node.getBoundingClientRect()]));
}
