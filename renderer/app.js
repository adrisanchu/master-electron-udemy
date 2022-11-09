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
		console.log(itemUrl.value);
		itemUrl.value = '';
		closeModal.click();
	}
});

// Listen for keyboard submit
itemUrl.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addItem.click();
});
