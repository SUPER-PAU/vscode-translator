const vscode = require("vscode");
const translate = require("@vitalets/google-translate-api");

async function translateWord() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("No active editor found!");
    return;
  }

  // Получаем выделенный текст
  const selection = editor.selection;
  const text = editor.document.getText(selection);

  if (!text) {
    vscode.window.showWarningMessage("Please select a word or phrase to translate.");
    return;
  }

  try {
    // Перевод текста
    const result = await translate(text, { to: "ru" }); // Перевод на русский
    vscode.window.showInformationMessage(`Translation: ${result.text}`);
  } catch (error) {
    console.error("Translation error:", error);
    vscode.window.showErrorMessage("Failed to translate the text.");
  }
}

function activate(context) {
  const translateCommand = vscode.commands.registerCommand("translator.translateWord", translateWord);

  context.subscriptions.push(translateCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
