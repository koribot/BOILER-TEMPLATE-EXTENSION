const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
require("dotenv").config();

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";

const extensionId = process.env.EXTENSION_ID;

if (!extensionId) {
  console.error("Error: Extension ID not provided");
  process.exit(1);
}
// Recursively traverse the src/ directory and watch for changes to all files
function watchDirectory(dir) {
  let debounceTimeout = null;

  fs.readdirSync(dir).forEach((file) => {
    const fullPath = `${dir}/${file}`;
    const stats = fs.statSync(fullPath);
    if (fullPath !== "src/scripts") {
    console.log(`${GREEN} Watching Folder and its Files: ${YELLOW}${fullPath}`);
    fs.watch(fullPath, {recursive: true, persistent: true}, (e, f) => {
      // Reload the extension in the browser
       const _path = path.resolve(f)
        if (fullPath !== "src/manifest.json") {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            console.log(
              `${YELLOW}\n------------------------------------------------------------`
            );
            console.log(`${GREEN}File Event occurred: ${YELLOW}${_path}`);
            console.log(
              `${RED}Reloading extension with id: ${YELLOW}${extensionId}`
            );
            console.log(
              `${YELLOW}------------------------------------------------------------\n${RESET}`
            );
            exec(`google-chrome-stable --reload-extension=${extensionId}`);
          }, 100);
        } else {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            console.log(`${YELLOW}\n--------------------------------`);
            console.log(
              `${GREEN}File Event Occured on Manifest.json:${YELLOW}${_path}`
            );
            console.log(
              `${RED} YOU NEED TO MANUALLY RELOAD IT: ${YELLOW}chrome://extensions/`
            );
            console.log(`${YELLOW}--------------------------------\n${RESET}`);
          }, 100);
        }
      
    });
  }
    // if (stats.isDirectory()) {
    //   // If the file is a directory, recursively watch it unless its src/scripts as it contains ts files and will trigger changes on both src/scripts and src/dist
    //   if (fullPath !== "src/scripts") {
    //     console.log(
    //       `${GREEN} Watching Folder and its Files: ${YELLOW}${fullPath}`
    //     );
    //     watchDirectory(fullPath);
    //     if (fullPath !== "src/dist/scripts") {
    //       fs.watch(fullPath, { persistent: true }, (eventType,fname) => {
    //         if (eventType === "rename") {
    //           // Reload the extension in the browser
    //           console.log(`${YELLOW}\n------------------------------------------------------------`);
    //           console.log(`${GREEN}Folder Content Changed: ${fullPath}/${fname}`);
    //           console.log(`${RED}Reloading extension with id: ${extensionId}`);
    //           console.log(
    //             `${YELLOW}------------------------------------------------------------\n${RESET}`
    //           );
    //           exec(`google-chrome-stable --reload-extension=${extensionId}`);
    //         }
    //       });
    //     }
    //   }
    // } else {
    //   let debounceTimeout = null;

    //   // If the file is a file, watch it for changes
    //   fs.watch(fullPath, { persistent: false }, (e, f) => {
    //     // Reload the extension in the browser
    //     if (e === "change") {
    //       if (fullPath !== "src/manifest.json") {
    //         clearTimeout(debounceTimeout);
    //         debounceTimeout = setTimeout(() => {
    //           console.log(`${YELLOW}\n------------------------------------------------------------`);
    //           console.log(`${GREEN}File Event occurred: ${YELLOW}${fullPath}`);
    //           console.log(`${RED}Reloading extension with id: ${YELLOW}${extensionId}`);
    //           console.log(
    //             `${YELLOW}------------------------------------------------------------\n${RESET}`
    //           );
    //           exec(`google-chrome-stable --reload-extension=${extensionId}`);
    //         }, 100);
    //       } else {
    //         clearTimeout(debounceTimeout);
    //         debounceTimeout = setTimeout(() => {
    //           console.log(`${YELLOW}\n--------------------------------`);
    //           console.log(`${GREEN}File Event Occured on Manifest.json:${YELLOW}${fullPath}`);
    //           console.log(
    //             `${RED} YOU NEED TO MANUALLY RELOAD IT: ${YELLOW}chrome://extensions/`
    //           );
    //           console.log(
    //             `${YELLOW}--------------------------------\n${RESET}`
    //           );
    //         }, 100);
    //       }
    //     }
    //   });
    // }
  });
}
watchDirectory("src");
