// DOM nodes
let items = document.getElementById('items');

// Track items in storage
// if localStorage is not declared yet, set as an empty array
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

// Persist storage
exports.save = () => {
	localStorage.setItem('readit-items', JSON.stringify(this.storage));
};

// Add new item
exports.addItem = (item, isNew = false) => {
	// Create a new DOM node
	let itemNode = document.createElement('div');

	// Assign "read-item" class
	itemNode.setAttribute('class', 'read-item');

	// Add inner HTML
	itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;

	// Append new node to "items"
	items.appendChild(itemNode);

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
