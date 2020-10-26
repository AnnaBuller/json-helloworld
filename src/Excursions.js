export default class Excursions {
  constructor(api) {
    this.apiService = api;
  }

  load() {
    this.apiService.loadData()
        .then(data => {
            this.insert( data );
        })
        .catch(err => console.error(err));
  }

  insert(data) {
    const ulEl = this._findRootList();
        this._clearElement(ulEl);
        data.forEach( item => {
            const liEl = this._createLi(item);
            ulEl.appendChild( liEl );
        });
  }

  remove() {
    const ulEl = this._findRootList();
    this._clearElement(ulEl);
    ulEl.addEventListener('click', e => {
      const targetEl = e.target;
      console.log(e.target)
      if(this._isElementOfTagName(targetEl, 'A')) {
        const id = this._getIdFromRoot(targetEl);
        this.apiService.removeData(id)
            .catch(err => console.error(err))
            .finally( this.load() );
    }
  })
  }

  add(){
    const form = document.querySelector('form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const {name, price} = e.target.elements;
      const data = {
          name: name.value, price: price.value
      };
      this.apiService.addData(data)
        .catch(err => console.error(err))
        .finally( this.load() );
  });
  }

  update(){
    const ulEl = this._findRootList();
    ulEl.addEventListener('click', e => {
      const targetEl = e.target;
      if(this._isElementOfTagName(targetEl, 'BUTTON')) {
          const spanList = this._findItemRoot(targetEl).querySelectorAll('span');
          const isEditable = [...spanList].every(span => span.isContentEditable);
          if(isEditable) {
            const id = this._getIdFromRoot(targetEl);
            const data = {
                name: spanList[0].innerText,
                price: spanList[1].innerText,
            }
           this.apiService.updateData(id, data)
              .catch(err => console.error(err))
              .finally( () => {
                targetEl.innerText = 'edytuj';
                spanList.forEach(
                    span => span.contentEditable = false
                );
            });
          } else {
            targetEl.innerText = 'zapisz';
            spanList.forEach(
                span => span.contentEditable = true
            );
          }
      }
  });
  }

  _findRootList(){
    return document.querySelector('.excursions');
  }

  _clearElement(element) {
    element.innerHTML = '';
}

  _isElementOfTagName(element, tag) {
    return element.tagName === tag
  }
  
  _createLi(itemData) {
    const liEl = document.createElement('li');
    liEl.dataset.id = itemData.id;
    liEl.classList.add('excursions__item');
    liEl.innerHTML = `
        [<a href="#">usuń</a>]
        <span>${itemData.name}</span>: 
        <span>${itemData.price}</span>PLN
        <button>edytuj</button>
    `;

    return liEl;
  }

  _getIdFromRoot(item) {
    return this._findItemRoot(item).dataset.id;
  }

  _findItemRoot(targetElement) {
    return targetElement.parentElement;
  }

}



