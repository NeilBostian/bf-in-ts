const fs = require('fs')
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function runTest(fileName) {
  console.log("Run test " + fileName);

  const { stdout, stderr } = await exec("npx tsc --noEmit tests/" + fileName);
  if (stdout) console.log(`stdout: ${stdout}`);
  if (stderr) console.log(`stderr: ${stderr}`);
}

fs.readdir("tests", async (err, files) => {
  if (err) {
    throw err;
  }

  for (const i in files) {
      await runTest(files[i])
  }
});
