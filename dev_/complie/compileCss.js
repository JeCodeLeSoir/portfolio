const fs = require('fs')
const minify = false;
const path = require('path')
const shell = require('child_process').execSync;
var path_build = "../../prod/style"
var dirjs = "../style/";
var header = `/*==  Dont Edit is File compile !  ==*/`

return module.exports = {
    Css: {
        //clear Css folder prod -> style
        clear: ()=>
        {
            if(fs.existsSync(path_build)){
                console.log("====== Clear CSS ======")
                shell(`del ${path.resolve(path_build + '/*.css')}`);
            }
        },
        //compile Css folder prod -> style
        compile: () => {
            var build = ""

            var files = fs.readdirSync(dirjs)

            if (!fs.existsSync(path_build)) {
                fs.mkdirSync(path_build)
            }

            files.forEach((file) => {
                console.log(file)
                var data = fs.readFileSync(dirjs + file);
                build += data + "\n\n";
            })

            var data = header + '\n' + build
            var lastlenth = data.length

            if (minify) {

                data = data.replace(/\r?\n|\r/g, '')
                data = data.replace(/\,(\s)+/g, ',')
                data = data.replace(/\:(\s)+/g, ':')
                data = data.replace(/\;(\s)+/g, ';')
                data = data.replace(/\{(\s)+/g, '{')
                data = data.replace(/(\s)+\{/g, '{')
                data = data.replace(/\}(\s)+/g, '}')
                data = data.replace(/(\s)+\}/g, '}')
                data = data.replace(/(\s)+\)/g, ')')
                data = data.replace(/\((\s)+/g, '(')
                data = data.replace(/\>(\s)+/g, '>')
                data = data.replace(/(\s)+\>/g, '>')

                data = data.replace(/\/\*([^*]+)\*\//g, '')

                console.log("==> last lenth " + lastlenth + " new lenth " + data.length + " ==> " + (lastlenth - data.length) + " character delete !")
            }

            fs.writeFileSync(path_build + "/style.css", data)

        }
    }
};