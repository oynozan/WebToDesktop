const { app, BrowserWindow, Menu, webContents  } = require('electron');

const pageTitle = "Example_Title";
let win;
let isMac = process.platform === 'darwin'

const createWindow = () => {
    win = new BrowserWindow({
        title: pageTitle,
        width: 800,
        height: 600,
        icon: __dirname + "favicon_path"
    });
    win.setTitle(pageTitle);
    win.maximize();
    win.loadURL("https://www.example.com");

    win.on('page-title-updated', function(e) {
        e.preventDefault()
    });
};

app.whenReady().then(() => {
    createWindow();

    //Menu
    const template = [
        {
            label: "Options",
            submenu: [
                {
                    label: "Back",
                    click() {
                        win.webContents.goBack()
                    }
                },
                {
                    label: "Forward",
                    click() {
                        win.webContents.goForward()
                    }
                },
                { type: 'separator' },
                { label:"Undo", role: 'undo' },
                { label:"Redo", role: 'redo' },
                { type: 'separator' },
                { label:"Cut", role: 'cut' },
                { label:"Copy", role: 'copy' },
                { label:"Paste", role: 'paste' },
                { label:"Delete", role: 'delete' },
                { type: 'separator' },
                { label:"Select All", role: 'selectAll' },
                { type: 'separator' },
                { label:"Reload", role: 'reload' },
                { label:"Force Reload", role: 'forceReload' },
                { 
                    label:"Clear Caches", 
                    click() {
                        win.webContents.session.clearStorageData();
                    }
                },
                { label:"Open DevTools", role: 'toggleDevTools' }
            ]
        },
        {
            label: 'View',
            submenu: [
            { label:"Original View", role: 'resetZoom' },
            { label:"Zoom In", role: 'zoomIn' },
            { label:"Zoom Out", role: 'zoomOut' },
            { type: 'separator' },
            { label:"Fullscreen", role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { label:"Minimize Window", role: 'minimize' },
                { label:"Close", role: 'close' }
            ]
        }
    ];
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});