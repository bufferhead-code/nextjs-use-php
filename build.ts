const fs = require('node:fs');
const path = require('node:path');
const fse = require('fs-extra');
const cp = require("child_process");

function copyCurrentDirectoryToDist() {
    const fileName = './src/app/page.tsx';
    fse.copySync(fileName, fileName + '.original');

    const content = fse.readFileSync(fileName, "utf8");
    const splits = content.split(/["']use php["'];/);
    let result = splits[0];
    for (let i = 1; i < splits.length; i++) {
        const endOfPhpCode = findClosingBrace(splits[i]);
        const cCode = splits[i].slice(0, endOfPhpCode);
        result += `return (await (await fetch("/api/use-php", {method: "POST", body: ${JSON.stringify(cCode)}})).json()).message;`;
        result += splits[i].slice(endOfPhpCode, splits[i].length);
    }
    fse.writeFileSync(fileName, result, "utf8")
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

function resetToOriginalState() {
    const path = require('node:path');
    const fse = require('fs-extra');
    const fileName = './src/app/page.tsx';
    fse.removeSync(fileName);
    fse.moveSync(fileName + '.original', fileName);
}

function build() {

    copyCurrentDirectoryToDist();
    try {
        cp.spawnSync('next', ['build']);
    }
    catch(e){
        console.log(e);
    } finally{
        console.log('cleanup');
        resetToOriginalState();
    }
}

build();

