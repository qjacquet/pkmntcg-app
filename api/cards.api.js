const API_TOKEN = '';

export function getCards(page) {
    const url = 'https://api.pokemontcg.io/v1/cards?page=' + page;
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}