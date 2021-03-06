const fs = require('fs');
const URL = require('url');
const path = require('path');
const electron = require('electron');
const app = electron.app;
const shell = electron.shell;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const inject = require('../inject/config');
const IMTray = require('./y2w_IMTray');
const localStorage = require('./y2w_localstorage');
const argv = require('./y2w_ArgvHandler');
const downloadFile = require('./y2w_downloadFile');


const IM = function () {
    this.window = null;
    this.tray = null;
};


IM.prototype.createWindow = function () {
    var self = this;
    if (self.window) {
        return;
    }

    self.window = new BrowserWindow({
        show: false,
        frame: false,
        transparent: true,
        webPreferences: {
            webSecurity: false,
            preload: path.join(__dirname, '../inject/index.js')
        }
    });
    self.window.on('closed', function () {
        self.window = null;
    });
    self.window.webContents.on('did-finish-load', function () {
        // self.resizeWindow();
    });
    self.window.webContents.on('dom-ready', function (event) {
        event.sender.insertCSS(inject.css);
        self.resizeWindow();
    });
    self.window.webContents.on('new-window', function (event, url) {
        event.preventDefault();
        shell.openExternal(url);
    });
    self.window.webContents.session.on('will-download', function (event, item) {
        var url = item.getURL();
        var id = url.match(/attachments\/[0-9]+\/content/)[0].replace('attachments/', '').replace('/content', '');
        var savePath = path.join(app.getPath('downloads'), id, item.getFilename());

        self.window.webContents.send('download', {url: url, isDownloading: true});
        downloadFile(url, savePath, function (error) {
            self.window.webContents.send('download', {url: url, isDownloading: false});
            if (error) {
                return dialog.showErrorBox("下载失败", JSON.stringify(error));
            }
            shell.showItemInFolder(savePath);
        }, id);
        item.cancel();
    });
    ipcMain.on('badge-changed', function (event, count) {
        var badge = count ? count + '' : '';
        if (process.platform == "darwin") {
            app.dock.setBadge(badge);
        }
        self.tray.setTitle(badge);
    });
    ipcMain.on('downloadFile', function (event, url, name, ext) {
        var savePath = path.join(app.getPath('downloads'), name + '.' + ext.replace('.', ''));
        downloadFile(url, savePath, function (error) {
            if (error) {
                return dialog.showErrorBox("下载失败", JSON.stringify(error));
            }
            shell.showItemInFolder(savePath);
        });
    });
    // self.window.webContents.openDevTools();

    this.createTray();
    this.autoLogin();
    this.load();
};

IM.prototype.resizeWindow = function () {
    var self = this;
    var isMain = false;
    var size = {width: 0, height: 0};
    var minSize = {width: 0, height: 0};

    switch (path.basename(self.window.webContents.getURL(), '.html')) {
        case 'index':
            minSize = size = {width: 350, height: 495};
            break;

        case 'register':
            minSize = size = {width: 350, height: 495};
            break;

        case 'main':
            isMain = true;
            size = {width: 960, height: 640};
            minSize = {width: 500, height: 495};
            break;
    }
    //size.width = 600;

    this.window.setResizable(isMain);
    this.window.setFullScreenable(isMain);
    this.window.setMaximizable(isMain);
    this.window.setMinimumSize(minSize.width, minSize.height);
    this.window.setContentSize(size.width, size.height, true);
    this.window.show();
};


IM.prototype.createTray = function () {
    if (this.tray) {
        return;
    }
    this.tray = new IMTray(this);
};

IM.prototype.autoLogin = function () {
    if (!argv.hasParms())
        return;

    localStorage.removeItem('y2wIMCurrentUserId');
    ipcMain.once('autoLogin', function (event) {
        var parms = argv.getParms();
        event.sender.send('autoLogin', parms);
    });
};

IM.prototype.isLogged = function () {
    //localStorage.removeItem('y2wIMCurrentUserId');
    return !!localStorage.getItem('y2wIMCurrentUserId');
};

IM.prototype.load = function () {
    var name = this.isLogged() ? 'main' : 'index';
    this.window.loadURL('file://' + __dirname + '/../render/web/' + name + '.html');
};

IM.prototype.show = function () {
    if (!this.window) {
        return this.createWindow();
    }
    this.window.show();
};

IM.prototype.hide = function () {
    if (!this.window) {
        return;
    }
    this.window.hide();
};

module.exports = IM;
