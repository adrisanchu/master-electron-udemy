const { ipcRenderer } = require('electron');
const items = require('./items');

// DOM nodes
let showModal = document.getElementById('show-modal'),
	closeModal = document.getElementById('close-modal'),
	modal = document.getElementById('modal'),
	addItem = document.getElementById('add-item'),
	itemUrl = document.getElementById('url');
search = document.getElementById('search');

// Filter items with "search"
search.addEventListener('keyup', (e) => {
	// Loop items
	Array.from(document.getElementsByClassName('read-item')).forEach((item) => {
		// Hide items that don't match search value
		let hasMatch = item.innerText.toLowerCase().includes(search.value);
		item.style.display = hasMatch ? 'flex' : 'none';
	});
});

// Navigate item selection with up/down arrows
document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
		items.changeSelection(e.key);
	} else if (e.key === 'Enter') {
		items.open();
	}
});

// Disable & Enable modal buttons
const toggleModalButtons = () => {
	// Check state of buttons
	if (addItem.disabled === true) {
		addItem.disabled = false;
		addItem.style.opacity = 1;
		addItem.innerText = 'Add Item';
		closeModal.style.display = 'inline';
	} else {
		addItem.disabled = true;
		addItem.style.opacity = 0.5;
		addItem.innerText = 'Adding...';
		closeModal.style.display = 'none';
	}
};

// show modal
showModal.addEventListener('click', (e) => {
	modal.style.display = 'flex';
	itemUrl.focus();
});

// hide modal
closeModal.addEventListener('click', (e) => {
	modal.style.display = 'none';
});

// add a new item
addItem.addEventListener('click', (e) => {
	// check if url exists
	if (itemUrl.value) {
		// Send new item url to main process
		ipcRenderer.send('new-item', itemUrl.value);

		// Disable buttons...
		toggleModalButtons();
	}
});

// Listen for new item from main process
ipcRenderer.on('new-item-success', (e, newItem) => {
	// Add new item to "items" node
	items.addItem(newItem, true);

	// Enable buttons
	toggleModalButtons();

	// clean input field and close modal
	itemUrl.value = '';
	closeModal.click();
});

// Listen for keyboard submit
itemUrl.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') addItem.click();
});
