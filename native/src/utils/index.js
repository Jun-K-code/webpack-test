export function renderComponent(container, component) {
  const element = document.createElement('div');
  element.innerHTML = component();
  container.appendChild(element);
}
