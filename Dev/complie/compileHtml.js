const fs = require('fs')
const path = require('path')
const shell = require('child_process').execSync;

var path_build = "../../prod/"
var dirjs = "../pages/";

return module.exports = {
    Html: {
        clear: ()=>
        {
            if(fs.existsSync(path_build)){
                console.log("====== Clear HTML ======")
                shell(`del ${path.resolve(path_build + '/*.html')}`);
            }
        },
        compile: () => {
            if (!fs.existsSync(path_build)) {
                fs.mkdirSync(path_build)
            }

            var files = fs.readdirSync(dirjs)
            console.log(files)

            function GetFileInclude(file) {

                console.log("Html include ==> " + file)

                var data = fs.readFileSync(file, 'utf-8');

                const incluhtmls = [...data.matchAll(/\/\*\s([^*]+)\s\*\//g)];

                incluhtmls.forEach((group) => {

                    var inclu = path.resolve(path.dirname(file), group[1])

                    data = data.replace(group[0], GetFileInclude(inclu))
                })

                return data;
            }

            files.forEach((file) => {
                if (file.indexOf('.html') !== -1) {
                    fs.writeFileSync(path_build + "/" + file, GetFileInclude(dirjs + file))
                }
            })
        }
    }
}