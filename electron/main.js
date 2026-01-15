const { app, BrowserWindow } = require('electron');
const path = require('path');
const { fileURLToPath } = require('url');

// 开发模式下加载 Vite 开发服务器，生产模式下加载构建后的文件
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
    // icon: path.join(__dirname, '../public/vite.svg'), // 可选：应用图标
    title: '大庚剑阵',
  });

  if (isDev) {
    // 开发模式：连接到 Vite 开发服务器
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // 生产模式：加载构建后的文件
    const indexPath = path.join(__dirname, '../dist/index.html');
    mainWindow.loadFile(indexPath);
  }

  // 窗口关闭事件
  mainWindow.on('closed', () => {
    // 在 macOS 上，即使所有窗口关闭，应用通常仍保持运行
  });
}

// 应用准备就绪
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // 在 macOS 上，当点击 dock 图标且没有其他窗口打开时，重新创建窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出应用（macOS 除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
