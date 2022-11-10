const { ipcRenderer } = require("electron");

// DOM nodes
let showModal = document.getElementById('show-modal'),
	closeModal = document.getElementById('close-modal'),
	modal = document.getElementById('modal'),
	addItem = document.getElementById('add-item'),
	itemUrl = document.getElementById('url');

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

    // clean input field and close modal
		itemUrl.value = '';
		closeModal.click();
	}
});

// Listen for new item from main process
ipcRenderer.on('new-item-success', (e, newItem) => {
  console.log(newItem);
})

// Listen for keyboard submit
itemUrl.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addItem.click();
});
