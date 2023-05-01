const { app, BrowserWindow, Tray, Menu } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}

// app.whenReady().then(() => {
//   createWindow()
//   console.log(`欢迎来到 Electron 👋`)
// })

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const iconPath = 'img/icon.png';

const tray = new Tray(iconPath)      //实例化一个tray对象，构造函数的唯一参数是需要在托盘中显示的图标url  

tray.setToolTip('Tasky')       //鼠标移到托盘中应用程序的图标上时，显示的文本

tray.on('click', () => {       //点击图标的响应事件，这里是切换主窗口的显示和隐藏
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    mainWindow.show()
  }
})

tray.on('right-click', () => {    //右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
  const menuConfig = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: () => app.quit()
    }
  ])
  tray.popUpContextMenu(menuConfig)
})

