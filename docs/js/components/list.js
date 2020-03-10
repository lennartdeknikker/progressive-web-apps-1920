import Utilities from '../utilities.js';

const List = {
  init(data, identifier) {
    this.updateTitle(identifier);
    this.generate(data, identifier);
  },
  updateTitle(identifier) {
    document.querySelector('.list-title').innerText = `${Utilities.capitalize(identifier)} Launches`;
  },
  generate(data, identifier) {
    const newList = Utilities.createNewElement('ol', 'launches-list');
    for (let i = 0; i < data.length; i += 1) {
      const newUl = Utilities.createNewElement('ul', 'launches-list-item-details-list');
      Object.keys(data[i].data).forEach((element) => {
        if (data[i].data[element] !== null) {
          const newString = Utilities.replace(element, '_', ' ');
          const newDetailLiTitle = Utilities.createNewElement(
            'span',
            'details-list-title',
            // `${Utilities.capitalize(element.replace('_', ' '))}: `,
            `${Utilities.capitalize(newString)}: `,
          );
          const newDetailLi = Utilities.createNewElement(
            'li', 'launches-list-item-details-list-item',
            data[i].data[element],
            newDetailLiTitle,
          );
          newUl.appendChild(newDetailLi);
        }
      });
      const newA = Utilities.createNewElement('a', 'launch-link');
      newA.href = `/#/${identifier}/${data[i].data.flight_number}`;
      const newLi = Utilities.createNewElement(
        'li',
        `launches-list-item flight-${data[i].data.flight_number}`,
      );
      newLi.setAttribute('data-flightnumber', data[i].data.flight_number);
      newA.appendChild(newUl);
      newLi.appendChild(newA);
      if (data[i].links.Patch && identifier === 'past') {
        const newLink = Utilities.createNewElement(
          'img',
          'icon',
        );
        newLink.src = data[i].links.Patch;
        newLi.appendChild(newLink);
      }
      newList.appendChild(newLi);
    }
    Utilities.appendElement('.list-view', newList);
  },
};

export default List;
