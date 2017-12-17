'use strict';

const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const url = require('url');

const VIEW_PATH = '../view/';

var mainWindow;
var addWindow;

// Wait for app to be ready.
app.on('ready', () => {
    // Create window.
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
    });
    //Load view.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, VIEW_PATH + 'main.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Quit app when main window is closed.
    mainWindow.on('closed', () => {
        app.quit();
    })

    // Create menu. In this case, the menu is empty.
    Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenu));
});

// Create a window to add a TODO.
function createTodo() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add TODO'
    });

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, VIEW_PATH + 'add.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Discard window so it can be garbage collected.
    addWindow.on('closed', () => {
        addWindow = null;
    });

    addWindow.setMenu(null);
}

// Catch todo:add
ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

// Crete menu bar.
const mainMenu = [{
    label: 'Add',
    // Shortcuts; darwin is MacOS' platform.
    accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
    click() {
        createTodo();
    }
}, {
    label: 'Close',
    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
    click() {
        app.quit();
    }
}];