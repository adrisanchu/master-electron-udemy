const { Menu, shell } = require('electron');

// Module function to create main app menu
module.exports = () => {
	// Menu temlate
	let template = [
		{
			label: 'Items',
			submenu: [],
		},
		{
			role: 'editMenu',
		},
		{
			role: 'windowMenu',
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'Learn more',
					click: () => {
						shell.openExternal('https://github.com/adrisanchu');
					},
				},
			],
		},
	];

	// Create Mac app menu
	if (process.platform === 'darwin') template.unshift({ role: 'appMenu' });

	// Build menu
	let menu = Menu.buildFromTemplate(template);

	// Set as main pp menu
	Menu.setApplicationMenu(menu);
};
