const getPositionX = (element: Element) => element.getBoundingClientRect().left;

const getDistanceXBetweenElements = (
  a: Element,
  b: Element,
) => getPositionX(b) - getPositionX(a);

export default getDistanceXBetweenElements;
