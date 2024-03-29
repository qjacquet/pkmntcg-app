const API_TOKEN = '';

export function getCards(filter, page) {
	 const url = 'https://api.pokemontcg.io/v1/cards?page=' + page + filter;
    return fetch(url)
      .then((response) => response.json())
		  .catch((error) => console.log(error))
}

export function getAllCards(filter) {
	if (filter == "") {
		return null
	}
	const url = 'https://api.pokemontcg.io/v1/cards?pageSize=1000' + filter;
	 return fetch(url)
		 .then((response) => response.json())
		 .catch((error) => console.log(error))
}


export function getCardsFromCardSet(cardSetCode, page) {
	const url = 'https://api.pokemontcg.io/v1/cards?setCode=' + cardSetCode + "&page=" + page;

	return fetch(url, { headers: header	})
			.then((response) => response.json())
			.catch((error) => console.log(error))
}

export function getCardDetails(id) {
	const url = 'https://api.pokemontcg.io/v1/cards?id=' + id;
	return fetch(url)
		.then((response) => 
			{
				return response.json()
			})
		.catch((error) => console.log(error))
}

export function getCardSets(filter) {
    const url = 'https://api.pokemontcg.io/v1/sets?pageSize=1000' + filter;
    return fetch(url)
		.then((response) => 
			{
				var result = response.json()
				return result
			})
        .catch((error) => console.log(error))
}

export function getCardSetsStandard() {
    const url = 'https://api.pokemontcg.io/v1/sets?standardLegal=true';
    return fetch(url)
		.then((response) => 
			{
				var result = response.json()
				return result
			})
        .catch((error) => console.log(error))
}