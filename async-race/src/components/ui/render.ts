import './render.css';
import store from '../store/store';
import { Car } from '../api/api';

const getCarImg = (color: string) => `
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" "="" viewBox="0 5 20 20" preserveAspectRatio="xMinYMin slice" x="0" y="0" width="73" height="33">
  <g>
    <g>
      <path style="fill:${color};" d="M20.07,10.102c0,0-0.719-1.593-5.363-1.53c0,0-4.626-4.644-13.986,0.582
        c0,0,0.205,1.018-0.566,1.018c-0.159,0.765-0.322,1.769,0.203,2.294c1.146,0,1.257,0,1.266,0c-0.028-0.123-0.044-0.25-0.044-0.381
        c0-0.951,0.771-1.722,1.722-1.722s1.722,0.771,1.722,1.722c0,0.131-0.016,0.258-0.044,0.381h0.268h8.357h1.119
        c-0.027-0.123-0.043-0.25-0.043-0.381c0-0.951,0.771-1.722,1.721-1.722c1.297,0,2.037,1.318,1.906,2.092l1.762-0.182
        C19.801,10.687,20.07,10.102,20.07,10.102z M6.936,8.835H2.829c0,0,1.703-0.798,4.107-1.261V8.835z M7.827,8.835V7.427
        c3.442-0.498,6.143,1.408,6.143,1.408H7.827z"></path>
      <path style="fill:${color};" d="M16.402,10.742c-0.734,0-1.33,0.595-1.33,1.33c0,0.733,0.596,1.329,1.33,1.329
        s1.514-0.596,1.514-1.329C17.916,11.336,17.137,10.742,16.402,10.742z M16.402,12.582c-0.283,0-0.512-0.229-0.512-0.511
        s0.229-0.512,0.512-0.512c0.281,0,0.512,0.229,0.512,0.512C16.914,12.353,16.683,12.582,16.402,12.582z"></path>
      <path style="fill:${color};" d="M3.268,10.742c-0.734,0-1.329,0.595-1.329,1.33c0,0.733,0.595,1.329,1.329,1.329
        c0.735,0,1.33-0.596,1.33-1.329C4.597,11.336,4.003,10.742,3.268,10.742z M3.268,12.582c-0.282,0-0.512-0.229-0.512-0.511
        s0.23-0.512,0.512-0.512s0.512,0.229,0.512,0.512C3.78,12.353,3.55,12.582,3.268,12.582z"></path>
    </g>
  </g>
</svg>
`;

const renderCar = ({ id, name, color }: Car) => `
  <div>
    <button class="btn select-btn" id="select-car-${id}">Select</button>
    <button class="btn remove-btn" id="remove-car-${id}">Remove</button>
    <span class="car-name">${name}</span>
  </div>
  <div class="track">
    <div class="start">
      <div class="engine-btns">
        <button class="btn start-engine-btn" id="start-engine-car-${id}">Start</button>
        <button class="btn stop-engine-btn" id="stop-engine-car-${id}" disabled>Stop</button>
      </div>
      <div class="car" id="car-${id}">
        ${getCarImg(color)}
      </div>
    </div>
    <div class="flag" id="flag-${id}">⚑</div>
  </div>
`;

const renderGarage = () => `
  <h1>Garage (${store.carsNumber})</h1>
  <h2>Page #${store.carsPage}</h2>
  <ul class="garage">
    ${store.cars.map((car) => `
      <li>${renderCar(car)}</li>
    `).join('')}
  </ul>
`;

const renderGarageViewContent = () => `
  <div>
    <form class="form" id="create">
      <input class="input" id="create-name" name="name" type="text">
      <input class="color" id="create-color" name="color" type="color" value="#4689C8">
      <button class="btn" type="submit">Create</button>
    </form>
    <form class="form" id="update">
      <input class="input" id="update-name" name="name" type="text" disabled>
      <input class="color" id="update-color" name="color" type="color" value="#f0f0f0" disabled>
      <button class="btn" id="update-submit" type="submit" disabled>Update</button>
    </form>
  </div>
  <div class="race-btns">
    <button class="btn race-btn primary" id="race-start">Race</button>
    <button class="btn reset-btn primary" id="reset-race">Reset</button>
    <button class="btn generate-btn primary">Generate cars</button>
  </div>
  <div id="garage">
    ${renderGarage()}
  </div>
  <div>
    <p class="message" id="message"></p>
  </div>
`;

export const renderWinnersViewContent = () => `
  <h1>Winners (${store.winnersNumber})</h1>
  <h2>Page #${store.winnersPage}</h2>
  <table class="table" cellspacing="0" border="0" cellpadding="0">
    <thead>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th class="table-btn table-wins ${store.sortBy === 'wins' ? store.sortOrder : ''}">Wins</th>
      <th class="table-btn table-time ${store.sortBy === 'time' ? store.sortOrder : ''}">Best time</th>
    </thead>
    <tbody>
      ${store.winners.map((winner, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${getCarImg(winner.color)}</td>
          <td>${winner.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

const render = () => {
  const html = `
    <div class="menu">
      <button class="btn garage-menu-btn primary">Garage</button>
      <button class="btn winners-menu-btn primary">Winners</button>
    </div>
    <div id="garage-view" >
      ${renderGarageViewContent()}
    </div>
    <div id="winners-view" style="display: none">
      ${renderWinnersViewContent()}
    </div>
    <div class="pagination">
      <button class="btn prev-btn" id="prev" disabled>Prev</button>
      <button class="btn next-btn" id="next" disabled>Next</button>
    </div>
  `;
  const appView = document.createElement('div');
  appView.innerHTML = html;
  document.body.appendChild(appView);
};

export default render;
