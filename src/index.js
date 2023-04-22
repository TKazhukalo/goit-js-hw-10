import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/';
import './css/styles.css';
    

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchBox.addEventListener('input', debounce(onInputClick,DEBOUNCE_DELAY));



function onInputClick(e) {
    e.preventDefault();
    const textValue = e.target.value.trim();
    if (!textValue) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return;
    }

 //   let { name, flags } = e.target.elements;
 fetchCountries(textValue) 
     .then(data => {
   //console.log(data);
         if (data.length > 10) {
             Notiflix.Notify.info(
                 "Too many matches found. Please enter a more specific name"
             );
             return;
      
         }
         createListData(data);
     })
     .catch((err) => {
               countryInfo.innerHTML = '';
         countryList.innerHTML = '';
          Notiflix.Notify.failure('Oops, there is no country with that name');
        });
};
function createListData(data) {
    if (data.length === 1) {
        countryList.innerHTML = '';
        const dataInfo = createListCountry(data);
        countryInfo.innerHTML = dataInfo;
    } else {
        countryInfo.innerHTML = '';
        const dataList = createMarkup(data);
        countryList.innerHTML = dataList;
  }
};

function createListCountry(data) {
    return data.map(({ flags,name, official, capital, population, languages }) =>
        `<div class='box-list'>
        <img src="${flags.svg}" alt="${name.official}" width='120'>
<h2>${name.official}</h2>
<p><b>Capital:</b> ${capital}</p>
<p><b>Population:</b> ${population}</p>
<p><b>Languages:</b> ${Object.values(languages)}</p></div>`)
.join('');
};


function createMarkup(data) {
    return data.map(({ flags, name }) => 
        `<li>
       <img src="${flags.svg}" alt="${name.official}" width="50" heigth='50'>
       <h2 class='country-title'>${name.official}</h2></li>`
    )
        .join('');
};

/*fetch(`https://restcountries.com/v3.1/all?fields=name`).then(resp => {
    //console.log(resp.json());
    return resp.json();
}).then(country => {
    console.log(country);
  
}).catch(err => {
    console.log(err);
});*/
