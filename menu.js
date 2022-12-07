const { Menu } = require('electron');

// Module function to create main app menu
module.exports = () => {
	// Menu temlate
	let template = [];

	// Build menu
	let menu = Menu.buildFromTemplate(template);

	// Set as main pp menu
	Menu.setApplicationMenu(menu);
};
