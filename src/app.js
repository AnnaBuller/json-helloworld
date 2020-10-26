import API from './API.js'
import Excursions from './Excursions.js'

const api = new API();
const excursions = new Excursions(api);

document.addEventListener('DOMContentLoaded', init);

function init() {
  console.log('DOM');
  excursions.load();
  excursions.remove();
  excursions.add();
  excursions.update();
}
