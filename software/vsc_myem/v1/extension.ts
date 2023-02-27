import * as vscode from 'vscode';
//var modEM = require('./myemMod.js');
import { moveToLineHead,multiLineToOne,increaseCharList} from './myemMod';
export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "myem" is now active!');
	const channel = vscode.window.createOutputChannel('myem');

	
	let idMoveToLineHead = "myem.moveToLineHead";//CTRL + SHIFT + S
	let idMultiLineToOne = "myem.multiLineToOne";// ALT + Q
	let idInsChar = "myem.increaseCharList";// ALT + N
	let arrIDs = [
		{"id":idMoveToLineHead,"method":moveToLineHead},
		{"id":idMultiLineToOne,"method":multiLineToOne},
		{"id":idInsChar,"method":increaseCharList}
	];
	arrIDs.forEach((item)=>{
		context.subscriptions.push(vscode.commands.registerCommand(item.id,async ()=>{
			await item.method(item.id);
		}));
	
	});


}

// This method is called when your extension is deactivated
export function deactivate() {}
