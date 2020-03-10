import Utilities from '../utilities.js';

const detailView = {
  currentPosition: 0,
  init(flightNumber, data) {
    // get clicked item
    const selectedItem = document.querySelector(`.flight-${flightNumber}`);
    // get launchlist element
    let launchList = document.querySelector('.launches-list');
    // get position of clicked item in launch list and add 1.
    let newPosition = Array.prototype.indexOf.call(launchList.children, selectedItem) + 1;

    // rounds the position on the amount of items in a row, depending on screen size.
    function rounder(count) {
      if (newPosition % count !== 0) {
        newPosition += 1;
        rounder(count);
      }
    }

    if (window.innerWidth > 1110) {
      rounder(4);
    } else if (window.innerWidth > 840) {
      rounder(3);
    } else if (window.innerWidth > 570) {
      rounder(2);
    }

    // if the multiple of 4 exceeds the total amount of childs,
    // set it to the total amount of childs minus one.
    if (newPosition > launchList.childElementCount) {
      newPosition = launchList.childElementCount - 1;
    }

    // render the element directly after the clicked element on mobile devices.
    if (window.innerWidth < 580) {
      launchList = document.querySelector('.launches-list');

      const detailview = document.querySelector('.detailview');
      const detailviewPosition = Array.prototype.indexOf.call(launchList.children, detailview);
      const potentialNewPosition = Array.prototype.indexOf.call(launchList.children, selectedItem);

      // subtract 1 when the detailview element needs not to be counted.
      if (potentialNewPosition > detailviewPosition && document.querySelector('.detailview')) {
        newPosition = Array.prototype.indexOf.call(launchList.children, selectedItem) - 1;
      } else {
        newPosition = Array.prototype.indexOf.call(launchList.children, selectedItem);
      }
      // add 1 to render the element after the clicked element.
      newPosition += 1;
    }

    // get the adjacent element for the detail view.
    const targetElement = document.querySelectorAll('.launches-list-item')[newPosition - 1];
    // create a title element for the detail view.
    const detailviewTitle = Utilities.createNewElement('h2', 'detailview-title', data.mission_name);

    // if the detail view needs to move:
    if (newPosition !== this.currentPosition) {
      // remove the old detail view,
      Utilities.removeAll('.detailview');
      // create a new detail view element,
      const newDiv = Utilities.createNewElement(
        'div',
        'detailview',
      );
      // append the title,
      newDiv.appendChild(detailviewTitle);
      // and insert the element.
      targetElement.insertAdjacentElement(
        'afterend',
        newDiv,
      );
    } else
    // else, just change the title
    if (document.querySelector('.detailview-title') && document.querySelector('.detailview')) {
      document.querySelector('.detailview-title').remove();
      document.querySelector('.detailview').appendChild(detailviewTitle);
    }

    // render the detail view html with the data for selected item.
    this.renderHtml(data, '.detailview');
    this.currentPosition = newPosition;
  },
  renderHtml(rawData, targetElement) {
    // remove the old property list if there is one.
    if (document.querySelector('.property-list')) document.querySelector('.property-list').remove();

    // adds data to a given list element and adds classes based on the list level.
    function addDataToList(data, list, startLevel) {
      Object.keys(data).forEach((property) => {
        if (data[property] !== null && typeof data[property] !== 'object') {
          const propertySpan = Utilities.createNewElement(
            'span',
            `detail-property-${startLevel}`,
            `${Utilities.capitalize(property.replace(/_/g, ' '))}: `,
          );
          let detailSpan = '';
          if (Utilities.checkForLink(data[property])) {
            detailSpan = Utilities.createNewElement(
              'a',
              'detail-data detail-data-link',
              `${data[property]}`,
            );
            detailSpan.href = data[property];
          } else {
            detailSpan = Utilities.createNewElement(
              'span',
              'detail-data',
              `${data[property]}`,
            );
          }
          const newLi = Utilities.createNewElement(
            'li',
            `detail-level-${startLevel}`,
            '',
            propertySpan,
          );

          newLi.appendChild(detailSpan);
          list.appendChild(newLi);
        } else

        if (data[property] !== null && typeof data[property] === 'object') {
          const newSubUl = Utilities.createNewElement('ul', `property-list-sub-list-${startLevel + 1}`);
          const subListTitle = Utilities.createNewElement('li', 'sub-list-title', `${Utilities.capitalize(property.replace(/_/g, ' '))}: `);
          list.appendChild(subListTitle);
          addDataToList(data[property], newSubUl, startLevel + 1);
          list.appendChild(newSubUl);
        }
      });
    }

    // create a new list element and add all data to it.
    const newUl = Utilities.createNewElement('ul', 'property-list');
    addDataToList(rawData, newUl, 1);

    // append the element to the targeted element.
    Utilities.appendElement(targetElement, newUl);

    // remove any empty lists from the DOM.
    function removeEmptyUls() {
      const sublistTitles = document.querySelectorAll('.sub-list-title');
      sublistTitles.forEach((title) => {
        const subList = title.nextSibling;
        if (subList.childElementCount < 1) {
          subList.remove();
          title.remove();
        }
      });
    }
    removeEmptyUls();
  },
};

export default detailView;
