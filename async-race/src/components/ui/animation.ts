const animation = (element: HTMLElement, distance: number, duration: number) => {
  let start: number | null = null;
  const frame = { id: 0 };
  const elem = element;

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const progress = Math.round((time / duration) * distance);

    elem.style.transform = `translateX(${Math.min(progress, distance)}px)`;

    if (progress < distance) {
      frame.id = window.requestAnimationFrame(step);
    }
  };

  frame.id = window.requestAnimationFrame(step);

  return frame;
};

export default animation;
