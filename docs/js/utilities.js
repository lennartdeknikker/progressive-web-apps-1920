const Utilities = {

  setActiveButton(button) {
    const currentActiveButton = document.querySelector('.active')
    currentActiveButton.classList.remove('active');

    const newActiveButton = document.querySelector(button)
    newActiveButton.classList.add('active');
  },

  capitalize: (string) => string.charAt(0).toUpperCase() + string.slice(1),

  createNewElement(type, className, text, child) {
    const newElement = document.createElement(type);

    if (className) newElement.className = className;
    if (child) newElement.appendChild(child);
    if (text) {
      const textNode = document.createTextNode(text);
      newElement.appendChild(textNode);
    }

    return newElement;
  },

  appendElement(targetClass, child) {
    const target = document.querySelector(targetClass);
    if (target) target.appendChild(child);
  },

  removeAll(elementSelector) {
    const elementList = document.querySelectorAll(elementSelector)
    elementList.forEach((element) => element.remove());
  },

  normalizeDate(unixDate) {
    const addPad = (value) => String(value).padStart(2, '0');
    const date = new Date(unixDate * 1000);

    const day = addPad(date.getDate());
    const month = addPad(date.getMonth() + 1);
    const year = addPad(date.getFullYear());
    const hours = addPad(date.getHours())
    const minutes = addPad(date.getMinutes())

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  },

  checkForLink(text) {
    return String(text).includes('http');
  },

  changeCSSProperty(property, value) {
    document.documentElement.style.setProperty(property, value);
  },

  // reduce experiment
  replace(string, letter, replacement) {
    function replaceLetter(acc, cur) {
      return cur === letter ? acc + replacement : acc + cur;
    }
    return Array.from(string).reduce(replaceLetter);
  },

  // map experiment
  replace2(string, letter, replacement) {
    function replaceLetter(cur) {
      return cur === letter ? replacement : cur;
    }
    return String(Array.from(string).map(replaceLetter)).replace(/,/g, '');
  },
};

export default Utilities;
