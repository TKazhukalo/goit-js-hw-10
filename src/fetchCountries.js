

export const fetchCountries=name=> {
     const BASE_URL = 'https://restcountries.com/v3.1/name/';
    const itemFields = 'fields=name,flags,languages,population,capital';

   
    return fetch(`${BASE_URL}${name}?${itemFields}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`${resp.status}`);
            } return resp.json()
        });
       
}
export default { fetchCountries };