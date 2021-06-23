const fs = require('fs')
const path = require('path')

const CSS = require('./compileCss').Css
const JS = require('./compileJS').Js
const Html = require('./compileHtml').Html

console.log(path.resolve(__dirname, "../"))

console.log("==== Compile System ====");

//regarde dans le dossier si il y à des changement / mofidication 
fs.watch(path.resolve(__dirname, "../"), {recursive:true},  (eventType, filename) => {

    console.log("The file", filename, "was modified!");
    console.log("The type of change was:", eventType);

    //on regarde si le nom du fichier à l'extention ".css"
    if(filename.indexOf('.css') !==-1){
        CSS.clear();
        CSS.compile();
    }
    //on regarde si le nom du fichier à l'extention ".js"
    else if(filename.indexOf('.js') !==-1){
        JS.clear();
        JS.compile();
    }
    //on regarde si le nom du fichier à l'extention ".html"
    else if(filename.indexOf('.html') !==-1){
        Html.clear();
        Html.compile();
    }
});