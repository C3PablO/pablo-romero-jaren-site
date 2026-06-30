type RGB = string | number[];

export const roughGradient4 = (colors: RGB[]) => {
  if (!colors || colors.length === 0) {
    return 'transparent';
  }
  // colorthief may return fewer colors than requested for low-color images;
  // fall back to the last available color so the gradient still renders.
  const at = (i: number) => colors[Math.min(i, colors.length - 1)].toString();
  return `linear-gradient(180deg, rgb(${at(0)}) 0%, rgb(${at(0)}) 25%, rgb(${at(
    1,
  )}) 25.1%, rgb(${at(1)}) 50%, rgb(${at(2)}) 50.1%, rgb(${at(
    2,
  )}) 75%, rgb(${at(3)}) 75.1%, rgb(${at(3)}) 100%)`;
};
