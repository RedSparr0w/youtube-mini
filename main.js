// Modules to control application life and create native browser window
const electron = require('electron'),
	{ app, BrowserWindow } = electron,
	fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  const screenSize = electron.screen.getPrimaryDisplay().workAreaSize,
    width = 480,
    height = 270,
    minWidth = width,
    minHeight = height,
    x = screenSize.width - width,
    y = screenSize.height - height;

  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth,
    minHeight,
    x,
    y,
    show: false,
    backgroundColor: '#222f3e',
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
  });

  // Keep window always on top even with full screen apps
  mainWindow.setAlwaysOnTop(true, 'floating');
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  // Load YouTube TV
  mainWindow.loadURL('https://youtube.com/tv');

  // Inject script and css once loaded
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.insertCSS(
      fs.readFileSync('./renderer.css').toString()
    );
    mainWindow.webContents.executeJavaScript(
      fs.readFileSync('./renderer.js').toString()
    );
  });

  // Hide until window has mostly loaded content
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Destroy object, close app
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
