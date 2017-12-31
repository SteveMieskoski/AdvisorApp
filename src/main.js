//A Note to myself
//console.log('NEED TO CONFIRM IS ALL ACTIONS WITH DUPLICATE RESOLUTION RESOLVE CORRECTLY (IN PRACTICE OVER MULTIPLE ROUNDS)');

// Framework Imports/Requires
const path = require('path');
const url = require('url');
const electron = require('electron');
// Module to control application life.
const app = electron.app;
const Menu = electron.Menu;
// Module to create native browser window.
//const BrowserWindow = electron.BrowserWindow;
let createWindow = require('./core/utils/window.js');

// Application Specific Imports/Requires
const unhandled = require('electron-unhandled');
const log = require('electron-log');
const devMenuTemplate = require('./core/utils/dev_menu_template.js');
const editMenuTemplate = require('./core/utils/edit_menu_template.js');
const dotenv = require('dotenv').config({path: path.resolve(__dirname, 'core/env-config')});
let backend = require('./core');
//let knex = require('./core/database/knexConnect');
let sequelize = require('./core/database/connection');

// Application Specific Setups
unhandled({logger: logErrors});
function logErrors(error){
	console.log('logging error');
	log.error(error)
}
// Setup Context Menus
const setApplicationMenu = () => {
	const menus = [editMenuTemplate];
	if (process.env.DEPLOY_STATE !== 'production') {
		menus.push(devMenuTemplate);
	}
	Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

/*// Initialize database connection
knex.knex.migrate.latest([knex.knexFile]);
knex.knex.on('query', () =>{
 // console.log('knex query');
    backend.emitter.emit('databaseReady'); // Signal that the database is ready for static file creation or checks
});*/


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) =>{
	if(mainWindow){
		if(mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	}
});

if(shouldQuit){
	app.quit();
}

function setupMainWindow () {
	setApplicationMenu();
  // Create the browser window.
  //mainWindow = new BrowserWindow({width: 1200, height: 800});
    mainWindow = createWindow('main', {width: 1200, height: 800});
  console.log(path.join(__dirname, 'ui', 'dist', 'index.html'));
  // and load the index.html of the app.
    backend.emitter.emit('appReady');
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'ui', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools. <---- OPEN DEV TOOLS
   mainWindow.webContents.openDevTools();
  //
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', setupMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
