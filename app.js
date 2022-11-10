/* Imports */
import { renderAstroSign, renderBeanie } from './render-utils.js';
import { getAstroSigns, getBeanies } from './fetch-utils.js';
/* Get DOM Elements */
const beanieList = document.getElementById('beanie-list');
const astroSignSelect = document.getElementById('sign-select');
const searchForm = document.getElementById('search-form');

/* State */
let beanies = [];
let astroSigns = [];

/* Events */
window.addEventListener('load', async () => {
    findBeanies();
    const response = await getAstroSigns();
    astroSigns = response.data;
    displayAstroOptions();
});

async function findBeanies(astroSign) {
    const response = await getBeanies(astroSign);
    beanies = response.data;
    displayBeanies();
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    findBeanies(formData.get('astroSign'));
});

/* Display Functions */
function displayBeanies() {
    beanieList.innerHTML = '';
    for (let beanie of beanies) {
        const beanieEl = renderBeanie(beanie);
        beanieList.append(beanieEl);
    }
}

function displayAstroOptions() {
    for (let astroSign of astroSigns) {
        const option = renderAstroSign(astroSign);
        astroSignSelect.append(option);
    }
}

// (don't forget to call any display functions you want to run on page load!)
// displayBeanies();
// displayAstroOptions();
