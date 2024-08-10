## FOLDER STRUCTURE
 - The folder structure is un-opinionated, I just arrange the folder base on my likings
    - 📁 css
       - all styles css
    - 📁 dist
       - This is where the compiled typescript goes in
    - 📁 html
       - all the static html of your extension
          - popup.html
          - ....
    - 📁 scripts
       - all your scripts
         - content scripts
         - background scripts
         - popup scripts
    - 📁 lib-js
         - This is for already build 3rd party libraries in vanila javasript such as minified/uglified jquery, tailwind, and others
         - I suggest do not put any `.ts` files on this folder as it is ignored by typescript only put "optimized" version of `.js` file here
    - 📁 utils/socket.js 
        - This is for development, it connects hot-reload.js to background script via webs socket
        - This will not be included when you build your project, but any import statement using that uses `socket.js` will need to be commented when you build to production
    
- ⚙️ manifest.json
       - Without this the project wont load on browser, lastest version is manifest v3
       - check [https://developer.chrome.com/docs/extensions/reference/manifest](url)
  
   ***You can make as much folder as you want you just need to configure `tsconfig.json` and webpack.config.js***

## HOW TO RUN
 - Install Dev Depencies
   - yarn install
 - yarn dev
   - `.dev-build` will be created, use this one to `load unpacked` on the browser
   - Hot reload ready using websocket
 - Go to [chrome]("chrome://extensions/") and Enable Developer mode 
   - Click ***`Load unpacked`*** and load `"your project directory"/src` 
  

    ***
    YOU NEED TO MANUALLY RELOAD IT FIRST TO ESTABLISH ***`WS`*** CONNECTION (WORKING ON THIS ONE SO YOU WONT NEED TO MANUALLY RELOAD AT FIRST)
 
    

    YOU ALSO NEED TO ENABLE ***`DEVELOPER MODE`*** FIRST

    [chrome://extensions/](url)
    ***

## BUILD FOR PRODUCTION
 - yarn build
   - This uses webpack you can configure it in ***`webpack/webpack.common.config.js`*** and ***`webpack/webpack.prod.js`***
 - yarn build-vite
   - This uses vite but there is problem with copying of the folders, ***`vite.cofig.js`*** 🚧
      - refer to [issue #1 - vite](https://github.com/koribot/BTE/issues/1)
  