// Modules to control application life and create native browser window
const {app,  BrowserWindow, globalShortcut, dialog, Notification} = require('electron')
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function setAppUserModelId() {
    var updateDotExe = path.join(path.dirname(process.execPath), '..', 'update.exe');

    var packageDir = path.dirname(path.resolve(updateDotExe));
    var packageName = path.basename(packageDir);
    var exeName = path.basename(process.execPath).replace(/\.exe$/i, '');

    global.appUserModelId = `com.squirrel.${exeName}`;
    app.setAppUserModelId(global.appUserModelId);
}
//setAppUserModelId();

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });
    globalShortcut.register('CommandOrControl+K', () => {
        // Do stuff when Y and either Command/Control is pressed.
        dialog.showErrorBox('CommandOrControl', 'Ctrl + K');

    });



}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// app.setAppUserModelId(process.execPath)


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
