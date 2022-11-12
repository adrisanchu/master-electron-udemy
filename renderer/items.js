// DOM nodes
let items = document.getElementById('items');

// Track items in storage
// if localStorage is not declared yet, set as an empty array
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

// Persist storage
exports.save = () => {
	localStorage.setItem('readit-items', JSON.stringify(this.storage));
};

// Set item as selected
exports.select = (e) => {
	// Remove currently selected item class
	document.getElementsByClassName('read-item selected')[0].classList.remove('selected');

	// Add to clicked item
	e.currentTarget.classList.add('selected');
};

// Move to newly selected item
exports.changeSelection = (direction) => {
	// Get current item by searching the only item with "selected" class
	let currentItem = document.getElementsByClassName('read-item selected')[0];

	// Handle up/down
	// Important: You can only move up if there is a previous element!
	if (direction === 'ArrowUp' && currentItem.previousElementSibling) {
		currentItem.classList.remove('selected');
		currentItem.previousElementSibling.classList.add('selected');
	} else if (direction === 'ArrowDown' && currentItem.nextElementSibling) {
		currentItem.classList.remove('selected');
		currentItem.nextElementSibling.classList.add('selected');
	}
};

// Open selected item
exports.open = () => {
	// Only if we have items (in case of menu open)
	if (!this.storage.length) return

	// Get selected item
	let selectedItem = document.getElementsByClassName('read-item selected')[0];

	// Get item's url
	let contentURL = selectedItem.dataset.url;

	console.log('opening...', contentURL);
}

// Add new item
exports.addItem = (item, isNew = false) => {
	// Create a new DOM node
	let itemNode = document.createElement('div');

	// Assign "read-item" class
	itemNode.setAttribute('class', 'read-item');

	// Set item url as data attribute
	itemNode.setAttribute('data-url', item.url);

	// Add inner HTML
	itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;

	// Append new node to "items"
	items.appendChild(itemNode);

	// Attach click handler to select
	itemNode.addEventListener('click', this.select);

	// Attach doubleClick handler to open
	itemNode.addEventListener('dblclick', this.open);

	// If this is the first item, set it as selected
	if (document.getElementsByClassName('read-item').length === 1) {
		itemNode.classList.add('selected');
	}

	// Add item to storage and persist it, only if it is new!
	// Otherwise, just add it to the DOM
	if (isNew) {
		this.storage.push(item);
		this.save();
	}
};

// Add items from storage when app loads
this.storage.forEach((item) => {
	this.addItem(item);
});
