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
            label: "Seçenekler",
            submenu: [
                {
                    label: "Geri",
                    click() {
                        win.webContents.goBack()
                    }
                },
                {
                    label: "İleri",
                    click() {
                        win.webContents.goForward()
                    }
                },
                { type: 'separator' },
                { label:"Geri Al", role: 'undo' },
                { label:"İleri Al", role: 'redo' },
                { type: 'separator' },
                { label:"Kes", role: 'cut' },
                { label:"Kopyala", role: 'copy' },
                { label:"Yapıştır", role: 'paste' },
                { label:"Sil", role: 'delete' },
                { type: 'separator' },
                { label:"Tümünü Seç", role: 'selectAll' },
                { type: 'separator' },
                { label:"Yenile", role: 'reload' },
                { label:"Yenilemeye Zorla", role: 'forceReload' },
                { 
                    label:"Önbelleği Temizle", 
                    click() {
                        win.webContents.session.clearStorageData();
                    }
                },
                { label:"Geliştirici Konsolunu Aç", role: 'toggleDevTools' }
            ]
        },
        {
            label: 'Görünüm',
            submenu: [
            { label:"Orijinal Boyut", role: 'resetZoom' },
            { label:"Yakınlaş", role: 'zoomIn' },
            { label:"Uzaklaş", role: 'zoomOut' },
            { type: 'separator' },
            { label:"Tam Ekran", role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Pencere',
            submenu: [
                { label:"Pencereyi Aşağıya Al", role: 'minimize' },
                { label:"Kapat", role: 'close' }
            ]
        }
    ];
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});