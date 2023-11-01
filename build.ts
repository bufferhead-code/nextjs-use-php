const fs = require('node:fs');
const path = require('node:path');
const fse = require('fs-extra');
const cp = require("child_process");

function copyCurrentDirectoryToDist(filePath: string) {

    fse.copySync(filePath, filePath + '.original');

    const content = fse.readFileSync(filePath, "utf8");
    const isServerActionFile = content.startsWith('\'use server\'');

    const splits = content.split(/'use php'/);
    let result = splits[0];
    for (let i = 1; i < splits.length; i++) {
        const endOfPhpCode = findClosingBrace(splits[i]);
        const phpCode = splits[i].slice(0, endOfPhpCode);
        if (isServerActionFile) {
            result += `'use server'\n`;
        }
        result += `return require('child_process').spawnSync('php', ['-r', \`${phpCode}\`]).stdout.toString()`
        result += splits[i].slice(endOfPhpCode, splits[i].length);
    }
    fse.writeFileSync(filePath, result, "utf8")
// }
// else{
//     const splits = content.split(/'use php'/);
//     let result = splits[0];
//     console.log(result);
//     for (let i = 1; i < splits.length; i++) {
//         const endOfPhpCode = findClosingBrace(splits[i]);
//         const cCode = splits[i].slice(0, endOfPhpCode);
//         result += `return (await (await fetch("/api/use-php", {method: "POST", body: ${JSON.stringify(cCode)}})).json()).message;`;
//         result += splits[i].slice(endOfPhpCode, splits[i].length);
//     }
//     fse.writeFileSync(filePath, result, "utf8")
// }

}

function findClosingBrace(string: String) {
    let codeBlocksCounter = 0;
    let characterCounter = 0;
    while (characterCounter < string.length) {
        const ch = string[characterCounter];
        if (ch === "{") codeBlocksCounter++;
        else if (ch === "}") codeBlocksCounter--;
        if (codeBlocksCounter == -1) return characterCounter;
        characterCounter++;
    }
    return null;
}

function resetToOriginalState(filePath: string) {
    const path = require('node:path');
    const fse = require('fs-extra');
    const finalFileName = filePath.replace('.original', '');
    fse.removeSync(finalFileName);
    fse.moveSync(filePath, finalFileName);
}

function build() {

    fromDir(path.join(__dirname, 'src'), '.js', copyCurrentDirectoryToDist);
    fromDir(path.join(__dirname, 'src'), '.tsx', copyCurrentDirectoryToDist);

    try {
        const output = cp.spawnSync('next', ['build']);
        console.log(output.stdout.toString());
    } catch (e) {
        console.log(e);
    } finally {
        console.log('cleanup');
        fromDir(path.join(__dirname, 'src'), '.js.original', resetToOriginalState);
        fromDir(path.join(__dirname, 'src'), '.tsx.original', resetToOriginalState);
    }
}

function fromDir(startPath: any, filter: any, callback: any) {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory() && filename.startsWith('node_modules') === false && filename.startsWith('.next') === false) {
            fromDir(filename, filter, callback); //recurse
        } else if (filename.endsWith(filter)) {
            callback(filename);
        }
        ;
    }
    ;
};


build();

