const { Menu, shell } = require('electron');

// Module function to create main app menu
module.exports = (appWin) => {
	// Menu temlate
	let template = [
		{
			label: 'Items',
			submenu: [
				{
					label: 'Add New',
					accelerator: 'CmdOrCtrl+O',
					click: () => {
						appWin.send('menu-show-modal');
					},
				},
				{
					label: 'Read Item',
					accelerator: 'CmdOrCtrl+Enter',
					click: () => {
						appWin.send('menu-open-item');
					},
				},
        {
					label: 'Delete Item',
					accelerator: 'CmdOrCtrl+Backspace',
					click: () => {
						appWin.send('menu-delete-item');
					},
				},
        {
					label: 'Open in Browser',
					accelerator: 'CmdOrCtrl+Shift+Enter',
					click: () => {
						appWin.send('menu-open-item-native');
					},
				},
			],
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
