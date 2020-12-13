import './index.html';
import './css/style.css';
import fetchCountries from './js/fetchCountries.js';
import countriesList from './template/countriesList.hbs';
import countryListItem from './template/countryListItem.hbs';
import debounce from 'lodash.debounce';
// import { alert, error } from './node_modules/@pnotify/core/dist/PNotify.js';


const refs = {
    searchInput: document.querySelector('.search__input'),
    searchForm: document.querySelector('#search-form'),
    countryList: document.querySelector('#country-list'),

};


function searchFormInputHandler(e) {
    const searchQuery = e.target.value;

    clearListItems();

    fetchCountries(searchQuery).then(data => {
        const markup = buildListItemMarkup(data);
        const renderCountriesList = buildCountriesList(data);
        if (!data) {
            return;
        } else if (data.length > 10) {
            error({
                title: 'ERROR!!',
                text: 'Please, write correct!',
            });
        } else if (data.length >= 2 && data.length <= 10) {
            insertListItem(renderCountriesList);
        } else if (data.length === 1) {
            insertListItem(markup);
        } else {
            alert(' Error 404');
        }
    });
}

function insertListItem(items) {
    refs.countryList.insertAdjacentHTML('beforeend', items);
}

function buildCountriesList(items) {
    return countriesList(items);
}

function buildListItemMarkup(items) {
    return countryListItem(items);
}

function clearListItems() {
    refs.countryList.innerHTML = '';
}



refs.searchForm.addEventListener('submit', ev => {
    ev.preventDefault();
});

refs.searchForm.addEventListener('input', debounce(e => {
    searchFormInputHandler(e);
}, 500), );









// const inputForm = document.querySelector('.input');



// let errorMsg = ({
//     text: 'Bad request'
// });

// let noticeMsg = notice({
//     text: 'Not found'
// });

// const URL = 'https://restcountries.eu/rest/v2/name/'
// let name = 'usa'
//     // взять из формы





// let input = document.querySelector('input');
// let div = document.querySelector('#country');



// input.addEventListener('input', debounce(() => {
//     fetch(`${URL}${name}`)
//         .then(res => {
//             if (Response.status == 200) {
//                 return res.json()
//             } else if (!name) {
//                 // code
//             } else {
//                 noticeMsg
//             }

//             if (Response.status == 400) {
//                 errorMsg({ text: 'error 404' })
//             }
//         })
//         .then(country => {
//             if (country.lenght > 15 || !country.lenght) {
//                 return errorMsg = error({
//                     text: 'Bad request'

//                 });

//             }
//             country = template(country);
//             div.insertAdjacentHTML('afterbegin', country)
//         })
//         .catch(err => error({
//             text: 'ERROR'
//         }))

// }), 2000)