const API_TOKEN = '';

export function getCards(page) {
    const url = 'https://api.pokemontcg.io/v1/cards?page=' + page;
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getCardDetails(id) {
	const url = 'https://api.pokemontcg.io/v1/cards?id=' + id;
	return fetch(url)
		.then((response) => 
			{
				var result = response.cards.json()
				console.log(result)
				return result.cards[0]
			})
		.catch((error) => console.log(error))
}