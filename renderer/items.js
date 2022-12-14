const fs = require('fs');

// DOM nodes
let items = document.getElementById('items');

// Track items in storage
// if localStorage is not declared yet, set as an empty array
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

// Listen to "done" message from reader window
window.addEventListener('message', (e) => {
	// Check for correct action
	if (e.data.action === 'delete-reader-item') {
		// Delete the selected item
		this.delete();

		// Close the reader window (remote)
		e.source.close();
	}
});

// Delete item
exports.delete = () => {
	let itemToDelete = this.getSelectedItem();

	// Remove item from DOM
	items.removeChild(itemToDelete.node);

	// Remove item from localStorage
	// By cutting the array 1item starting from our given item
	this.storage.splice(itemToDelete.index, 1);

	// Persist new localStorage
	this.save();

	// Select previous or the new first item in the list
	if (this.storage.length) {

		// Get new selected item index
		let newSelectedItemIndex = (itemToDelete.index === 0) ? 0 : itemToDelete.index - 1;

		// Select item at new index
		// console.log('list of items', document.getElementsByClassName('read-item'));
		document.getElementsByClassName('read-item')[newSelectedItemIndex].classList.add('selected');
	};
};

// Get selected item index
exports.getSelectedItem = () => {

	// Get selected node
	let currentItem = document.getElementsByClassName('read-item selected')[0];

	// Get item index
	let itemIndex = 0;
	let child = currentItem;
	while( (child = child.previousElementSibling) != null ) itemIndex++;

	// Return both item and its index
	return { node: currentItem, index: itemIndex };
};

// Persist storage
exports.save = () => {
	localStorage.setItem('readit-items', JSON.stringify(this.storage));
};

// Set item as selected
exports.select = (e) => {
	// Remove currently selected item class
	this.getSelectedItem().node.classList.remove('selected');

	// Add to clicked item
	e.currentTarget.classList.add('selected');
};

// Move to newly selected item
exports.changeSelection = (direction) => {
	// Get current item by searching the only item with "selected" class
	let currentItem = this.getSelectedItem();

	// Handle up/down
	// Important: You can only move up if there is a previous element!
	if (direction === 'ArrowUp' && currentItem.node.previousElementSibling) {
		currentItem.node.classList.remove('selected');
		currentItem.node.previousElementSibling.classList.add('selected');
	} else if (direction === 'ArrowDown' && currentItem.node.nextElementSibling) {
		currentItem.node.classList.remove('selected');
		currentItem.node.nextElementSibling.classList.add('selected');
	}
};

// Open selected item
exports.open = () => {
	// Only if we have items (in case of menu open)
	if (!this.storage.length) return

	// Get selected item
	let selectedItem = this.getSelectedItem();

	// Get item's url
	let contentURL = selectedItem.node.dataset.url;

	// Open item in proxy BrowserWindow
	window.open(contentURL, '', `
		maxWidth=2000,
		maxHeight=2000,
		width=1200,
		height=800,
		backgroundColor=#DEDEDE,
		nodeIntegration=0,
		contextIsolation=1
	`);
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
