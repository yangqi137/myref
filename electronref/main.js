const {app, BrowserWindow} = require('electron');


// Report crashes to our server.
// require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
console.log("hello");
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/views/index.html');

  // Open the devtools.
  //mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  createWindow();
  //BrowserWindow.addDevToolsExtension('/Users/yangqi/Library/Application\ Support/Google/Chrome/Default/Extensions/apehfighfmpoieeniallefdeibodgmmb/1.1_0/');
  //BrowserWindow.addDevToolsExtension('/Users/yangqi/Library/Application\ Support/Google/Chrome/Default/Extensions/hbhhpaojmpfimakffndmpmpndcmonkfa/0.1.2_0/');
  //BrowserWindow.removeDevToolsExtension('ClearBrowserData');
  //BrowserWindow.removeDevToolsExtension('PouchDB Inspector');
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
