// model
const setIsInShoppingList = (id) => {
	for (item of items) {
		if (item.id === id) {
			item.isInShoppingList = !item.isInShoppingList;
			return;
		}
	}
	saveItems();
}

const saveItems = () => {
	localStorage.setItem('items', JSON.stringify(items));
}

// controller
const switchToOtherList = event => {
	const itemButton = event.target;
	const itemButtonId = itemButton.id;

	setIsInShoppingList(itemButtonId);
	render();
}

// view
const render = () => {
	// clear contents
	document.querySelector('#shoppingList-container').innerHTML = '';
	document.querySelector('#recentlyUsed-container').innerHTML = '';
	items.forEach(item => {
		// create buttonElement
		const buttonElement = document.createElement('button');
		buttonElement.id = item.id;
		let containerDiv;
		if (!item.isInShoppingList) {
			containerDiv = document.querySelector('#recentlyUsed-container');
			buttonElement.className = 'recently-button';
		}
		if (item.isInShoppingList) {
			containerDiv = document.querySelector('#shoppingList-container');
			buttonElement.className = 'shopping-button';
		}
		buttonElement.onclick = switchToOtherList;

		// create preview image
		const previewImageElement = document.createElement('img');
		previewImageElement.src = item.img;
		previewImageElement.className = 'item-image';
		buttonElement.appendChild(previewImageElement);

		// create button middlesection container
		const middlesectionContainer = document.createElement('div');
		middlesectionContainer.className = 'button-middlesection';
		buttonElement.appendChild(middlesectionContainer);

		// create item name
		const itemNameElement = document.createElement('div');
		itemNameElement.innerText = item.title;
		itemNameElement.className = 'item-name';
		middlesectionContainer.appendChild(itemNameElement);

		// create item amount
		const itemAmountElement = document.createElement('div');
		itemAmountElement.innerText = item.amount;
		itemAmountElement.className = 'item-amount';
		middlesectionContainer.appendChild(itemAmountElement);

		// create settings image
		const imageSettings = document.createElement('img');
		imageSettings.src = 'icons/icon-menu.png';
		imageSettings.className = 'item-settings';
		imageSettings.id = item.id;
		buttonElement.appendChild(imageSettings);
		
		// append buttonElement to corresponding container div
		containerDiv.appendChild(buttonElement);
	});
}

render()