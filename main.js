// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow} = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let alwaysOnTopWindow

function createWindow () {
	const screenSize = electron.screen.getPrimaryDisplay().workAreaSize,
		minWidth = width = 480,
		minHeight = height = 270,
		x = screenSize.width - width,
		y = screenSize.height - height;

	let alwaysOnTopWindow = new BrowserWindow({width, height, minWidth, minHeight, x, y, show: false, backgroundColor: '#222f3e', frame: false, titleBarStyle: 'customButtonsOnHover'})
	alwaysOnTopWindow.setAlwaysOnTop(true, 'floating')
	alwaysOnTopWindow.setVisibleOnAllWorkspaces(true)
	alwaysOnTopWindow.setFullScreenable(false)

	// and load the index.html of the app.
	alwaysOnTopWindow.loadURL('https://youtube.com/tv')

	alwaysOnTopWindow.once('ready-to-show', () => {
		alwaysOnTopWindow.show()
	})

	// Open the DevTools.
	// alwaysOnTopWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	alwaysOnTopWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		alwaysOnTopWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (alwaysOnTopWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
