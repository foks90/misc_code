let items;
const savedItems = JSON.parse(localStorage.getItem('items'));

if (Array.isArray(savedItems)) {
	items = savedItems;
} else {
	items = [
		{id: '1',
		img: 'https://web.getbring.com/assets/images/items/aufschnitt.png',
		title: 'Aufschnitt',
		amount: '',
		isInShoppingList: false},
		{id: '2',
		img: 'https://web.getbring.com/assets/images/items/speck.png',
		title: 'Speck',
		amount: '',
		isInShoppingList: false},
		{id: '3',
		img: 'https://web.getbring.com/assets/images/items/milch.png',
		title: 'Milch',
		amount: '',
		isInShoppingList: false},
	];
}
