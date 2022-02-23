const { app, BrowserWindow, Tray, Menu, desktopCapturer, shell } = require('electron');
const path = require('path');
const userAgent =
    "Mozilla/5.0 (X11; FreeBSD amd64 13982.82.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.157 Safari/537.36";
const contextMenu = require('electron-context-menu');

contextMenu({
	showSaveImageAs: true,
	showSaveImage: true,
	showSaveLinkAs: true,
	showCopyImageAddress: true
});

// Disable Menu

Menu.setApplicationMenu(false)

// Win - Icons Var
var splash
var win = '',
    appIcon = null,
    iconpath = path.join(__dirname, 'discord.png');

// Create WIndow

function createWindow() {

    // New Window

    win = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        // frame: false, // Disable appmenu
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, 'discord.png'),
        title: 'Discord',
    });

    // Tray

    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open Discord', click: function () {
                win.show()
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    appIcon = new Tray(iconpath);
    appIcon.setContextMenu(contextMenu);

    // Close Window

    win.on('close', function (event) {
        if (!app.isQuiting) {
            event.preventDefault();
            win.hide();
        }

        return false;
    });

// 516 × 360
    //Splash
    splash = new BrowserWindow({ width: 516, height: 360, transparent: true, frame: false, alwaysOnTop: true });
    splash.loadFile("boot.html");
    // Load Discord
    win.webContents.setUserAgent(userAgent);
    win.webContents.setWindowOpenHandler(({ url }) => {
        // config.fileProtocol is my custom file protocol
        // open url in a browser and prevent default
        shell.openExternal(url);
        return { action: 'deny' };
    });
    win.loadURL('https://discord.com/app');
    win.once('ready-to-show', () => {
        splash.destroy();
        win.show();
    });
}

app.on('ready', createWindow);
