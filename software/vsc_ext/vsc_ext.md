### VS Code Extension
---
#### 參考文件

- [官方教學](https://code.visualstudio.com/api)
- [vsc_ext_SAMPLES](https://github.com/microsoft/vscode-extension-samples)
- [vse](https://code.visualstudio.com/api/get-started/your-first-extension)
- [API-window](https://code.visualstudio.com/api/references/vscode-api#window)
- [ithome-自己用的工具自己做! 30天玩轉VS Code Extension之旅](https://ithelp.ithome.com.tw/articles/10240741)
- [marketPlace](https://marketplace.visualstudio.com/)
- [vscode-docs-release](https://github.com/microsoft/vscode-docs/tree/vnext/release-notes)
- npm install -g @vscode/vsce

---
#### 基本架構

- Editor
- Side Bar
- Activity Bar
- Status Bar
- Panels

- settiong.json
  - User Settings
    - 全域(global scope)
  - Workspace Settings
    - 工作區(workspace)下的.vscode或.code-workspace
  - >Preferences:Open Default Settings
- debug.json
-  Command
   -  Command Palette (Ctrl+Shift+P) : 選取task來觸發命令
   -  KeyBindings (keybindings.json)
   -  可以在keybinding.json加入自己習慣的快速鍵
      - [When Clause Context](https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts)
      - [Commands](https://code.visualstudio.com/api/extension-guides/command) 
      - [Built-in Commands](https://code.visualstudio.com/api/references/commands)
    ```
        "key": "ctrl+shift+d",
        "command": "editor.action.deleteLines",
        "when": "textInputFocus && !editorReadonly"
    ```
---
#### hotkey

- ctrl + d : 選取下個相同的字 editor.action.addSelectionToNextFindMatch
- ctrl + shfit + L : 選取所有相同的字 editor.action.selectHighlights
  - 等同 ctrl + F2
- alt + shitf + mouse : 選取多行，多游標
- ctrl + alt + ↓ : 垂直向下產生多游標 editorTextFocus editor.action.insertCursorBelow

---

#### 開發 Extension

- 安裝nodejs與npm
  - 檢查版本
    ```
    node -v && npm -v
    ```
  - 更新 node
    ```
    npm install node
    ```
  - 更新 npm
    ```
    npm install -g npm@latest
    ```
  - 安裝 yoman
    ```
    npm install -g yo generator-code
    ```
    - 產生Extension專案
    ```
    yo code
    ```
    - 產生vsix
    ```
    npm install -g @vscode/vsce
    vsce package
    ```
---

#### Commands

- package.json
  ```
  ---開啟vscode的時候就啟用extension
  "activationEvents": ["*"],
    "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "vse-hw1.helloWorld",
        "title": "vse_hw1"
      },
      {
        "command": "vse-hw1.getCommand",
        "title": "vse_hw1 getCommand"
      },
      {
        "command": "vse-hw1.textEditorCommand",
        "title": "vse_hw1 textEditorCommand"
      },
      {
        "command": "vse-hw1.executeCommand",
        "title": "vse_hw1 executeCommand"
      }
    ]
  },
  ```  

- extension.ts
  - vscode.commands
    - getCommands : 取得vscode中註冊的commands
    - registerCommand : 向vscode註冊一個可被keyboard shortcut、extension或其他可invoke的命令
    - registerTextEditorCommand : 只有在vscode有開啟檔案的editor(active Editor)觸發
    - executeCommand : 透過給定的commandId執行對應的內建或extension註冊的command
```
	let disposable = vscode.commands.registerCommand('vse-hw1.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vse_hw1!');
	});

	const getCmd = vscode.commands.registerCommand('vse-hw1.getCommand',()=>{
		vscode.commands.getCommands(false).then((data)=>{
			console.log('commands',data);
		});
	});
	const txtCmd = vscode.commands.registerCommand('vse-hw1.textEditorCommand',()=>{
		vscode.window.showInformationMessage('[taichi]show msg only when active Editor!');
	});
	const registerExecCmd = vscode.commands.registerCommand('vse-hw1.executeCommand', async ()=>{
		await vscode.commands.executeCommand('workbench.action.togglePanel');
		vscode.window.showInformationMessage('[taichi]Panel has been toggle!');
	});

	context.subscriptions.push(disposable,getCmd,txtCmd,registerExecCmd);
```

#### Context Menu

- File Explorer Context Menu
- Source Control Context Menu


- package.json
  ```
    "menus": {
      "explorer/context": [
        {
          "command": "vse-hw1-context-menu.panelVisible",
          "alt": "vse-hw1-context-menu.panelVisibleAlt",
          "when": "activePanel",
          "group": "navigation"
        },
        {
          "command": "vse-hw1-context-menu.panelInvisible",
          "when": "!activePanel",
          "group": "navigation"
        }
      ]
    }
  ```  
- extension.ts
```
	let cmd1 = vscode.commands.registerCommand('vse-hw1-context-menu.panelVisible',async ()=>{
		await vscode.commands.executeCommand('workbench.action.togglePanel');
		vscode.window.showInformationMessage('[taichi]show msg only when active Editor!');
	});
	let cmd2 = vscode.commands.registerCommand('vse-hw1-context-menu.panelVisibleAlt',async ()=>{
		await vscode.commands.executeCommand('workbench.action.toggleDevTools');
		vscode.window.showInformationMessage('[taichi]show msg only when active Editor!');
	});
	let cmd3 = vscode.commands.registerCommand('vse-hw1-context-menu.panelInvisible',async ()=>{
		await vscode.commands.executeCommand('workbench.action.togglePanel');
		vscode.window.showInformationMessage('[taichi]show msg only when active Editor!');
	});
	context.subscriptions.push(cmd1,cmd2,cmd3);
```

---
#### 練習 Workspace設定

- todo
  
#### 練習 data storage

```
	console.log('Congratulations, your extension "vse-hw1" is now active!');
	const storagePath = context.storageUri?.path;
	const storagePathCase = (context.storageUri as vscode.Uri).path;
	const globalStoragePath = context.globalStorageUri.path;
	console.log('storagePath',storagePath);
	console.log('storagePathCase',storagePathCase);
	console.log('globalStoragePath',globalStoragePath);
	const logurl = context.logUri;
	console.log('logurl',logurl.path);
	context.environmentVariableCollection.append("taichimanA","taichimanValueA");
	context.environmentVariableCollection.prepend('taichimanB', 'taichimanValueB');
	context.environmentVariableCollection.forEach((variable, mutator, collection) => {
		console.log(variable, mutator);
	});
	console.log('end');
  -- echo ${taichimanA}
  -- echo %taichimanA%
```
---

#### 練習 StatusBar

```
	//satusBar
	const itemCommandId = "vse-hw1.statusBarItem";

	let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left,110000);
	item.text="[taichiman][item]-ori";
	item.command = itemCommandId;
	item.show();

	let i=1;
	const updatItem = vscode.commands.registerCommand(itemCommandId,()=>{
		item.text = "[taichiman][item]-updated="+i;
		i=i+1;
	});
```
```
	const dropdown = async (dropdownItems: string[]) => await vscode.window.showQuickPick(dropdownItems, {
		canPickMany: false,
		placeHolder: `Select your git action`,
	});

const git = new MockGit();
	const updatItem = vscode.commands.registerCommand(itemCommandId,async ()=>{
		//item.text = "[taichiman][item]-updated="+i;
		//i=i+1;
		const answer = await dropdown([
			'Create new branch',
			'aaa','bbb','ccc',
			...git.branch()
		]) || '';
		vscode.window.showInformationMessage(answer);
	});

class MockGit {

	private head = 0;

	private branchs = ['day10-master'];
	
	public get currentBranch() {
		return this.branchs[this.head];
	}

	public checkout(branchName: string) {
        this.head = this.branchs.findIndex(n => n === branchName);
        return this.currentBranch;
	}

	public branch(newBranch?: string) {
		if(newBranch) {
			this.branchs.push(newBranch);
		}
		return this.branchs;
	}
}
```
---
#### window.nameSpace

- 狀態欄物件： vscode.window.createStatusBarItem
- 使用者輸入框: vscode.window.showInputBox
- 下拉選單: vscode.window.showQuickPick
- 通知訊息：vscode.window.showInformationMessage

- window namespace的api分為三部分
  - Varialbe
  ```
  const terminal = vscode.window.activeTerminal;
  terminal?.sendText('git branch');
  ```
  - Event
  ```
  let terminal = vscode.window.activeTerminal;

  vscode.window.onDidChangeActiveTerminal((activeTerminal) => {
    terminal = activeTerminal;
  });
  ```
  - Function
  ```
  const input = vscode.window.createInputBox();
  input.prompt = 'Enter your message';
  input.title = 'message title';
  input.value = 'default value';
  input.onDidChangeValue((value) => {
      vscode.window.showInformationMessage(`changed value: ${value}`);
  });
  input.onDidAccept((value) => {
      input.hide();
  });
  input.show();
  ```

---
#### 練習 TreeView

- package.json
```
   "views": {
      "explorer": [
        {
          "id": "taichiTreeViewId",
          "name": "taichiTreeViewNM",
          "contextualTitle": "contextTitle"
        }
      ]
    },
    "viewsWelcome": [
      {
        "view": "taichiTreeViewId",
        "contents": "welcome to taichiTreeView\n gogogo\n[按我看看](command:vse-hw1-treeview.viewBtn)"
      }
    ]
```

- extension.ts
```
class TreeViewItem extends vscode.TreeItem{
	constructor(label: string, collapsibleState?: vscode.TreeItemCollapsibleState) {
		super(label, collapsibleState);
	}
}
class DataProvider implements vscode.TreeDataProvider<TreeViewItem>{
	getTreeItem(element: TreeViewItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	getChildren(element?: TreeViewItem): vscode.ProviderResult<TreeViewItem[]> {
		return Promise.resolve([
			new TreeViewItem('TreeItem-01'),
			new TreeViewItem('TreeItem-02'),
			new TreeViewItem('TreeItem-03'),
		]);
	}
}

export function activate(context: vscode.ExtensionContext) {
  let cmd5 = vscode.commands.registerCommand('vse-hw1-treeview.viewBtn',()=>{
		vscode.window.registerTreeDataProvider('taichiTreeViewId', new DataProvider());
		vscode.window.showInformationMessage('Create taichiTreeViewId!');	
		vscode.window.showInformationMessage('[taichi]vse-hw1-treeview.viewBtn!');
	});

	context.subscriptions.push(cmd1,cmd2,cmd3,cmd4,item,updatItem,cmd5);
}
```
----
#### 練習 showInputBox
```
			var opt = {
				placeHolder: "default: %d:0:1",
				prompt: "Input format or format:start:step"
			};
			var input = vscode.window.showInputBox(opt);
``` 



---
- 練習的專案
  - 檔案結構
  ```
  D:.
  │  .eslintrc.json
  │  .vscodeignore
  │  CHANGELOG.md
  │  package-lock.json
  │  package.json
  │  README.md
  │  tsconfig.json
  │  vsc-extension-quickstart.md
  ├─.vscode
  │      extensions.json
  │      launch.json
  │      settings.json
  │      tasks.json
  │      
  ├─node_modules
  ├─out
  │  │  extension.js
  │  │  extension.js.map
  │  │  
  │  └─test
  │      │  runTest.js
  │      │  runTest.js.map
  │      │  
  │      └─suite
  │              extension.test.js
  │              extension.test.js.map
  │              index.js
  │              index.js.map
  │              
  └─src
      │  extension.ts
      │  
      └─test
          │  runTest.ts
          │  
          └─suite
                  extension.test.ts
                  index.ts
  ```
