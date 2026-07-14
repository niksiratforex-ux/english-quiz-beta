import { createElement } from '../renderer';

export function createOptionButton(
  text: string,
  index: number,
  onClick: (index: number) => void
): HTMLElement {
  const button = createElement('button', 'option-button');
  button.setAttribute('data-index', index.toString());
  
  const letter = createElement('span', 'option-letter', String.fromCharCode(65 + index));
  const content = createElement('span', 'option-text', text);
  
  button.appendChild(letter);
  button.appendChild(content);
  
  button.addEventListener('click', () => onClick(index));
  
  return button;
}

export function setSelectedOption(container: HTMLElement, selectedIndex: number): void {
  const buttons = container.querySelectorAll('.option-button');
  buttons.forEach((button, index) => {
    if (index === selectedIndex) {
      button.classList.add('selected');
    } else {
      button.classList.remove('selected');
    }
  });
}

export function disableOptions(container: HTMLElement): void {
  const buttons = container.querySelectorAll('.option-button');
  buttons.forEach(button => {
    (button as HTMLButtonElement).disabled = true;
  });
}

export function enableOptions(container: HTMLElement): void {
  const buttons = container.querySelectorAll('.option-button');
  buttons.forEach(button => {
    (button as HTMLButtonElement).disabled = false;
  });
}
