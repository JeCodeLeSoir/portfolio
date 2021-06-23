const fs = require('fs')
const path = require('path')
const shell = require('child_process').execSync;
const minify = true;

var path_build = "../../prod/js"
var dirjs = "../js/";

return module.exports = {
    Js: {
        clear: ()=>
        {
            if(fs.existsSync(path_build)){
                console.log("====== Clear CSS ======")
                shell(`del ${path.resolve(path_build + '/*.js')}`);
            }
        },
        compile: () => {
            var build = ""

            if (!fs.existsSync(path_build)) {
                fs.mkdirSync(path_build)
            }

            var files = fs.readdirSync(dirjs)
            console.log(files)
            files.forEach((file) => {
                console.log(file)
                var data = fs.readFileSync(dirjs + file);
                build += data + "\n\n";
            })

            var header = `
        /*==  Dont Edit is File compile !  ==*/
    `
            build = header + "\n(()=>{\n" + build + "\n})()"

            var lastlenth = build.length

            if (minify) {
                build = build.replace(/\r?\n|\r/g, '')
                build = build.replace(/([\s])+/g, ' ')
            }

            fs.writeFileSync(path_build + "/app.js", build)
        }
    }
}