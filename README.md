## FOLDER STRUCTURE
 - The folder structure is un-opinionated, I just arrange the folder base on my likings
    - 📁 css
       - all styles css
    - 📁 dist
       - This is where the compiled typescript goes in
    - 📁 html
       - all the static html of your extension
          - popups
    - 📁 scripts
       - all your scripts
         - content scripts
         - background scripts
         - popup scripts
    - 📁 lib-js
         - This is for already build 3rd party libraries in vanila javasript such as minified/uglified jquery, tailwind, and others
         - I suggest do not put any `.ts` files on this folder as it is ignored by typescript only put "optimized" version of `.js` file here
    - ⚙️ manifest.json
       - Without this the project wont load on browser, lastest version is manifest v3
       - check [https://developer.chrome.com/docs/extensions/reference/manifest](url)
  
   ***You can make as much folder as you want you just need to configure `tsconfig.json` and webpack.config.js***

## HOW TO RUN
 - Install Dev Depencies
   - yarn install
 - yarn dev
   - The `outDir` of `tsc` is in `dist` folder inside src
   - Hot reload ready
 
 - Go to [chrome://extensions/](url) and Enable Developer mode 
   - Click ***`Load unpacked`*** and load `"your project directory"/src` 
  

    ***
    YOU NEED TO RELOAD THE EXTENSION IF YOU WANT TO SEE THE CHANGES IN BROWSER
    

    NOTE: YOU NEED TO ENABLE ***`DEVELOPER MODE`*** FIRST

    [chrome://extensions/](url)
    ***
## HOT RELOAD (`yarn dev` has hot reload enabled already)
***
 This is helpful if you dont want to manually reload the extension everytime there are changes on your file
  However the manifest.json is not included when changes on manifest.json ocurred you need to manually reload it ***(feel free to contribue if you know how to do it)***
***
- COMMAND
   - `yarn hr` or you can just simply run it via node -> `node hot-reload.js`
      ***
        ***NOTE: YOU NEED TO PROVIDE THE EXTENSION ID ON YOUR ENV***
      ***
## BUILD FOR PRODUCTION
 - yarn build
   - This uses webpack you can configure it in ***`webpack.config.js`***
 - yarn build-vite
   - This uses vite but there is problem with copying of the folders, ***`vite.cofig.js`***
  