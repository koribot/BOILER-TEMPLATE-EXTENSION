## FOLDER STRUCTURE
 - The folder structure is un-opinionated, I just arrange the folder base on my likings
    - 📁 css
       - all styles css
    - 📁 html
       - all the static html of your extension
          - popups
    - 📁 scripts
       - all your scripts
         - content scripts
         - background scripts
         - popup scripts
    - 📁 lib
    - ⚙️ manifest.json
  
   ***You can make as much folder as you want you just need to configure `tsconfig.json`***

## HOW TO RUN
 - Install Dev Depencies
   - yarn install
 - yarn start or `tsc --watch`
   - The `outDir` of `tsc` is in `dist` folder inside src
 
 - Go to [chrome://extensions/](url) and Enable Developer mode 
   - Click ***`Load unpacked`*** and load `"your project directory"/src` 
  

    ***
    YOU NEED TO RELOAD THE EXTENSION IF YOU WANT TO SEE THE CHANGES IN BROWSER
    

    NOTE: YOU NEED TO ENABLE ***`DEVELOPER MODE`*** FIRST

    [chrome://extensions/](url)
    ***


## BUILD FOR PRODUCTION
 - yarn build
   - This uses webpack you can configure it in ***`webpack.config.js`***
 - yarn build-vite
   - This uses vite but there is problem with copying of the folders, ***`vite.cofig.js`***
  