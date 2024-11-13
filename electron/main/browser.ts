import {BrowserWindow} from "electron";

export function createBrowserWindow() {
    const newWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    newWindow.loadFile('browser.html'); // 加载新窗口内容
}

