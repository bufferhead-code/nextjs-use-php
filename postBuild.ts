
function resetToOriginalState() {
    const path = require('node:path');
    const fse = require('fs-extra');

    const fileName = './src/app/page.tsx';
    fse.removeSync(fileName);
    fse.moveSync(fileName + '.original', fileName);
}

resetToOriginalState();


