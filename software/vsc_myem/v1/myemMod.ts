import * as vscode from 'vscode';

export async function moveToLineHead(id : String) {
	//低配版本，使用組合技
	await vscode.commands.executeCommand('editor.action.insertCursorAtEndOfEachLineSelected');
	await vscode.commands.executeCommand('cursorHome');
	await vscode.commands.executeCommand('cursorHome');
	// vscode.window.showInformationMessage(`[taichi]id=${id}`);
};

export async function multiLineToOne(id : String) {
	const editor = vscode.window.activeTextEditor;

	if(editor){
		const document = editor?.document;
		await vscode.commands.executeCommand('editor.action.selectAll');
		const selection = editor.selection;
		const word = document.getText(selection);
		const newWord = `'${word.replace(/\r\n/g,"','")}'`;
		editor.edit(editBuilder=>{
			editBuilder.replace(selection,newWord);
		});
	}
	// vscode.window.showInformationMessage(`[taichi]id=${id}`);
};

export async function increaseCharList(id : String) {
	const editor = vscode.window.activeTextEditor;

	if(editor){
		const document = editor?.document;
		const selection = editor.selection;

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
};