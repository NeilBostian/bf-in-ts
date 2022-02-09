const { exec } = require('child_process')

function runTest(fileName) {
    exec('npx tsc --noEmit ' + fileName, (err, stdout, stderr) => {
        if (err)
            console.log(err);

        if (stdout)
            console.log(`stdout: ${stdout}`);

        if (stderr)
            console.log(`stderr: ${stderr}`);
    });
}

runTest('tests/TestIncDecShift.ts');
runTest('tests/TestStdio.ts');
