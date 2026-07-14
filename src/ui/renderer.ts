// DOM rendering utilities

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

export function clearElement(element: HTMLElement): void {
  element.innerHTML = '';
}

export function showElement(element: HTMLElement): void {
  element.classList.remove('hidden');
}

export function hideElement(element: HTMLElement): void {
  element.classList.add('hidden');
}
