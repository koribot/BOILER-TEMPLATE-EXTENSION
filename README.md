# BTE - BOILER TEMPALTE FOR BUILDING EXTENSION


## FEATURES
 - Hot-reload 
   - it does not preserve state it uses:
     - `chrome.runtime.reload` and `chrome.tabs.reload`
     - websocket
        - hot-reload.js
        - socket.script.js
 - Typescript
 - Webpack builder
 - Tailwind `postcss`



## FOLDER STRUCTURE
 - The folder structure is un-opinionated, I just arrange the folder base on my likings
    - 📁 css
       - all styles css
    - 📁 .dist-build
       - This Is Where The Compiled Typescript, And Files Goes In
    - 📁 .production-build
       - production ready using webpack, does not include `zipped` version
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
    - 📁 utils/socket.script.js 
        - This is for development, it connects hot-reload.js to socket.script.js via websocket then socket.script.js communicate with background script to do ***`chrome.runtime.reload`*** and ***`chrome.tabs.reload`***
        - This will not be included when you build your project
    
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
 - Go to [chrome://extensions/](url) and Enable Developer mode 
   - Click ***`Load unpacked`*** and load `"your project directory"/src` 
  

    ***
    YOU NEED TO MANUALLY RELOAD IT FIRST TO ESTABLISH ***`WS`*** CONNECTION (WORKING ON THIS ONE SO YOU WONT NEED TO MANUALLY RELOAD AT FIRST)
 
    

    YOU ALSO NEED TO ENABLE ***`DEVELOPER MODE`*** FIRST

    [chrome://extensions/](url)
    ***

## BUILD FOR PRODUCTION
 - yarn build
   - This uses webpack you can configure it in ***`webpack/webpack.common.config.js`*** and ***`webpack/webpack.prod.js`***
    -You need to commment several codes when you run build:
    
    - You need to comment several codes before running `yarn build` as all this code is for development purpose only
      - at background.script.ts
         ```
        >chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        >  /***COMMENT THIS LINES OF CODES WHEN YOU BUILD THE PROJECT FOR PRODUCTION SO IT WILL NOT BE INCLUDED*/
        > if (request.type === "reload") {
        >  }
        > /************************************************************************/
        >});
        ```
      - at manifest.json
        ```
          {
          "matches": ["<all_urls>"],
          "js": ["dist/utils/socket.script.js"]
          },
        ```

 - yarn build-vite
   - This uses vite but there is problem with copying of the folders, ***`vite.cofig.js`*** 🚧
      - refer to [issue #1 - vite](https://github.com/koribot/BTE/issues/1)
  