import fs from 'fs';
import { exec } from 'child_process'

function runCommand(cmd) {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running ${cmd}: ${error}`);
      return;
    }
    console.log(`${cmd}: ${stdout}`);
  });
}



function copyFile(source, destination) {
  fs.copyFile(source, destination, (error) => {
    if (error) {
      console.error(`Error copying file: ${error}`);
      return;
    }
    console.log(`File ${source} successfully copied to ${destination}`);
  });
}


const main = () => {
  const dir = process.argv[2]

  process.chdir(dir);

  runCommand('npm install @yext/studio');

  const studioScript =
    runCommand(`npx npm-add-script -k "studio" -v "npm run features && yext pages generate-test-data -a && studio"`);

  copyFile('../studio.config.js', './studio.config.js');

}
main()