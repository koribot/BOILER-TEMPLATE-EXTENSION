const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
require("dotenv").config();
const WebSocket = require("ws");

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";


const wss = new WebSocket.Server({ port: 3000 });
let ws;
let connectedClient = 0;
wss.on("connection", (_ws) => {
  ws = _ws;
  console.log(
    `\n${GREEN}Connection: ${YELLOW}hot-reload.js to ${YELLOW}background.script.ts : ${GREEN}Established`
  );
  ws.on("message", (message) => {
    connectedClient+=1
    console.log(
      `${GREEN}Client: ${YELLOW}${message} ${GREEN}IS CONNECTED`
    );
    console.log(
      `${GREEN}Total Connected Clients: ${YELLOW}${connectedClient}`
    );
  });
  
  console.log(`${GREEN}Connection is running on ${YELLOW}ws://localhost:8080`);
  console.log(`${GREEN}HOT RELOADING IS WORKING\n\n`);

  ws.on("close", (e) => {
    console.log(e)
    console.log(
      `\n\n${RED}Extension Reloading Occured, Restarting Connection`
    );
    connectedClient-=1
    console.log(
      `${GREEN}Total Connected Clients: ${YELLOW}${connectedClient}`
    );
  });
});

let counter = 0; // for some reason w.send is being executed 3 times, so this is my hack, if you knew feel free to fix it
// Recursively traverse the src/ directory and watch for changes to all files
function watchDirectory(dir) {
  let debounceTimeout = null;

  fs.readdirSync(dir).forEach((file) => {
    const fullPath = `${dir}/${file}`;
    const stats = fs.statSync(fullPath);
    // if (fullPath !== "src/scripts") {
    console.log(`${GREEN} Watching Folder and its Files: ${YELLOW}${fullPath}`);
    fs.watch(fullPath, { recursive: true, persistent: true }, (e, f) => {
      // Reload the extension in the browser
      const _path = path.resolve(f);
      if (
        fullPath !== "src/manifest.json"
      ) {
        counter+=1
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          if (ws) {
            console.log(
              `${YELLOW}\n------------------------------------------------------------`
            );
            console.log(`${GREEN}File Event occurred: ${YELLOW}${_path}`);
            console.log(`${RED}Reloading ${YELLOW}extension`);
            console.log(
              `${YELLOW}------------------------------------------------------------\n${RESET}`
            );
          } else {
            console.log(`${YELLOW}\nConnection is not established yet`);
            console.log(
              `${YELLOW}HOT RELOAD NOT WORKING, TRY TO MANUALLY RELOAD THE EXTENSION\n`
            );
          }
          // exec(`google-chrome-stable --update-extension=${extensionId}`);
        }, 100);
        if (ws && counter >=3) {
          ws.send("reload");
          counter=0
        }
      } else {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          if (ws) {
            console.log(
              `${YELLOW}\n-------------------------------------------------------`
            );
            console.log(
              `${GREEN}File Event Occured on Manifest.json: ${YELLOW}${_path}`
            );
            console.log(
              `${RED} YOU NEED TO MANUALLY RELOAD IT: ${YELLOW}chrome://extensions/`
            );
            console.log(
              `${YELLOW}-------------------------------------------------------\n${RESET}`
            );
          } else {
            console.log(`${YELLOW}\nConnection is not established yet`);
            console.log(
              `${YELLOW}HOT RELOAD NOT WORKING, TRY TO MANUALLY RELOAD THE EXTENSION\n`
            );
          }
        }, 100);
        if (ws && counter >=3) {
          ws.send("reload");
          counter=0
        }
      }
    });
  });
}
watchDirectory("src");
