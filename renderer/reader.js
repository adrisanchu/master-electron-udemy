// Create button in remote content to mark item as "Done"
let readitClose = document.createElement('div');
readitClose.innerText = 'Done';

// Style our button
readitClose.style.position = 'fixed';
readitClose.style.bottom = '15px';
readitClose.style.right = '15px';
readitClose.style.padding = '5px 10px';

// absolute size is better, since we're adding this button into an unknown environment
// otherwise, the button will inherit the font size from the site
readitClose.style.fontSize = '18px';
readitClose.style.fontWeight = 'bold';
readitClose.style.background = 'dodgerblue';
readitClose.style.color = 'white';
readitClose.style.borderRadius = '5px';
readitClose.style.borderRadius = '5px';
readitClose.style.cursor = 'default';
readitClose.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.2)';
// force the button to be on top of the rest of the content
readitClose.style.zIndex = '9999';

// Attach click event
readitClose.onclick = (e) => {
	// make a reference to the parent component (the main app)
	// by using window.opener() along with the postMessage API
	// we have to listen to this event from the main component
	window.opener.postMessage(
		{
			action: 'delete-reader-item',
			// since we don't know the index of the current item, 
			// we will add it later from the main thread
			itemIndex: '{{index}}',
		},
		'*'
	);
};

// Append button to body
// by listening to an event from main.js
document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementsByTagName('body')[0].append(readitClose);
});
