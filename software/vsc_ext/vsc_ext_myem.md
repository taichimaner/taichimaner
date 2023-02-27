### VS Code Extension myem
---

#### 多行移到行首

- package.json
  ```
  "contributes": {
    "commands": [
      {
        "command": "myem.moveToLineHead",
        "title": "myem moveToLineHead"
      }
    ]
  },
  ```  

- extension.ts
```
	let idMoveToLineHead = "myem.moveToLineHead";
	const moveToLineHeadCmd = vscode.commands.registerCommand(idMoveToLineHead,async ()=>{
		//低配版本，使用組合技
		await vscode.commands.executeCommand('editor.action.insertCursorAtEndOfEachLineSelected');
		await vscode.commands.executeCommand('cursorHome');
		await vscode.commands.executeCommand('cursorHome');
	});
	context.subscriptions.push(moveToLineHeadCmd);
```
#### multiLineToOne

- package.json
  ```
      {
        "command": "myem.multiLineToOne",
        "title": "myem multiLineToOne"
      }
  ```  

- extension.ts
```
// ALT + Z
	// ALT + N
	let idInsChar = "myem.increaseCharList";
	const insChar = vscode.commands.registerCommand(idInsChar,async ()=>{
		const editor = vscode.window.activeTextEditor;

		if(editor){
			const document = editor?.document;
			const selections = editor.selections;
			const selection = editor.selection;
	
			const word = document.getText(selection);
			console.log("fileName="+document?.fileName);
			let position = editor.document.offsetAt(selection.active);
			let curLine = selection.active.line;
			let curChar = selection.active.character;
			console.log(`curPosition=${position},\t(curLine,curChar)=(${curLine},${curChar})`);
			let ii=0;
			const zeroPad = (num:number, places:number) => String(num).padStart(places, '0');
			editor.edit(editBuilder=>{
				for(let iz=0;iz<5;iz++){
					let workLine =curLine+iz;
					ii+=1;
					if(workLine<document.lineCount){
						let item = document.lineAt(workLine);
						let info = `line=${workLine}:(${item.range.start.character},${item.range.end.character})`;
						info += `,\titem=[${item.text}]`;
						
						if(curChar<=item.range.end.character){
							editBuilder.insert(new vscode.Position(workLine,curChar),zeroPad(ii,2));
						}else{
							let y= curChar-item.range.end.character;
							let newStr = item.text + ' '.repeat(y) + zeroPad(ii,2);
							editBuilder.replace(item.range,newStr);
						}
					}else{
						let newStr =`\r\n${' '.repeat(curChar)}${zeroPad(ii,2)}`;
						editBuilder.insert(new vscode.Position(workLine,0),newStr);
					}
				}
			});
		}
		//vscode.window.showInformationMessage(`[taichi]id=${idInsChar}`); 
	});
	context.subscriptions.push(insChar);
```

#### increaseCharList

- package.json
  ```
      {
        "command": "myem.increaseCharList",
        "title": "myem increaseCharList"
      }
  ```  

- extension.ts
```
	// ALT + N
	let idInsChar = "myem.increaseCharList";
	const insChar = vscode.commands.registerCommand(idInsChar,async ()=>{
		const editor = vscode.window.activeTextEditor;

		if(editor){
			const document = editor?.document;
			const selections = editor.selections;
			const selection = editor.selection;
	
			console.log("selections=");
			console.log(selections);
			console.log("selection=");
			console.log(selection);
			const word = document.getText(selection);
			console.log("fileName="+document?.fileName);
			console.log(selections.length);
			var w=0;
			for(w=0;w<selections.length;w++){
				console.log(document.getText(selections[w]) + 'w='+w);
				let position = editor.document.offsetAt(selections[w].active);
				console.log('position='+position);
				console.log('end');
			}
			console.log("===selection BGN===");
			console.log(word);
			
			let position = editor.document.offsetAt(selection.active);
			console.log('active='+editor.document.offsetAt(selection.active));
			console.log('  line='+selection.active.line);
			console.log('  character='+selection.active.character);
			console.log('anchor='+editor.document.offsetAt(selection.anchor));
			console.log('start='+editor.document.offsetAt(selection.start));
			console.log('end='+editor.document.offsetAt(selection.end));
			console.log("===selection END===");
			var opt = {
				placeHolder: "default: %d:0:1",
				prompt: "Input format or format:start:step"
			};
			var input = vscode.window.showInputBox(opt);
			
			const newWord = `'${word.replace(/\r\n/g,"','")}'`;
			channel.appendLine(newWord);
			editor.edit(editBuilder=>{
				//editBuilder.insert(new vscode.Position(0,1),"===");
				editBuilder.replace(selection,newWord);
			});
		}
		vscode.window.showInformationMessage(`[taichi]id=${idInsChar}`); 
	});
	context.subscriptions.push(insChar);
```