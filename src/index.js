import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/';

    

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
 //const name = inputForm.elements.object.value;
 //   let { name, flags } = e.target.elements;
 fetchCountries(textValue) 
     .then((data) => {
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

//https://restcountries.com/v3.1/all?fields=name,flags
/*function getCountry() {
    const fields = new URLSearchParams({
        name,
        flags
    });
   
   return fetch(`${BASE_URL}${END_POINT}?${fields}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText)
        } return resp.json()
    })
}*/
function createListCountry(data) {
    return data.map(({ flags, name, official, capital, population, languages }) =>
        `<div class='box-list'>
        <img src="${flags.svg}" alt="${name.official}" width='120'>
<h2>${name.official}</h2>
<p>${capital}</p>
<p>${Object.value(languages)}</p>
<p>${population}</p></div>`);
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
});
<li>
<img src="${Object.value(svg)}" alt="${official}">
<h2 class='country-title'>${official}</h2>
<p class='text-list'>${capital}</p>
<p class='text-list'>${languages}</p>
<p class='text-list'>${population}</p>
</li>*/