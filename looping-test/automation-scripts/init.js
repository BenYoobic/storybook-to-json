const fs = require('fs');
const path = require('path');

const currentPath = process.cwd();
let usefulPath = currentPath.substring(0, currentPath.indexOf('/bin'));

// const baseFolderLocation = `${usefulPath}/design-system/stencil/src`;
const baseFolderLocation = '/Users/hannah/Documents/sandbox/storybook-to-json/looping-test/src'
let discards = [];
let stringifiedFiles = [];

/**
 * Walks though all the folders and sub folders in a given path and looks at what that file type is.
 * Then inside all the files that match the file extention .stories.tsx, // then read file contents function is called
 */
function walkThoughDirectories(dir) {

    let list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            discards = discards.concat(walkThoughDirectories(file));
        } else {
            if (path.extname(file).toLowerCase() === '.json') {
                // pass
            } else if (file.includes('stories.tsx')) {
                fs.readFile(file, 'utf8', (err, fileContents) => {
                    // find js
                    let stringifiedFile = JSON.stringify(fileContents);
                    let nameStart = stringifiedFile.indexOf('yoo-');
                    let nameEnd = stringifiedFile.indexOf('\')', nameStart);
                    let componentName = stringifiedFile.substring(nameStart, nameEnd);

                    let concatString = `document.body.appendChild('${componentName}')`;
                    let jsStart = stringifiedFile.indexOf('let');
                    let jsEnd = stringifiedFile.indexOf('return');
                    let finalJs = stringifiedFile.substring(jsStart, jsEnd);
                    finalJs += concatString;

                    // find html
                    let htmlStart = stringifiedFile.indexOf('<yoo')
                    let htmlEnd = stringifiedFile.indexOf(`</${componentName}>`)
                    let finalHtml = stringifiedFile.substring(htmlStart, htmlEnd);
                    finalHtml += `</${componentName}>`

                    writeJsonOutput(file, finalJs, finalHtml)

                    // if (finalJs !== null) 
                    //     writeJsonOutput(file, finalJs);
                    
                });
            };
        }
    });
}


function writeJsonOutput(file, finalJs, finalHtml) {
    let jsonObjectForFrontify = {
        "name": "Paragraph",
        "description": "Basic Paragraph",
        "type": "atom",
        "stability": "stable",
        "variations": {
            "lead": {
                "name": "Lead paragraph",
                "assets": {
                    "html": [
                        "test/fixtures/patterns/atoms/paragraph/paragraph_lead.html"
                    ],
                    "css": [
                        "test/fixtures/patterns/atoms/paragraph/css/paragraph_lead.css"
                    ]
                }
            }
        },
        "assets": {
            "html": "",
            "css": "",
            "js": ""
        }
    };
    jsonObjectForFrontify.assets.js = finalJs;
    jsonObjectForFrontify.assets.html = finalHtml;
    fs.writeFileSync(`${file}.json`, JSON.stringify(jsonObjectForFrontify));
}

walkThoughDirectories(baseFolderLocation);
console.log("Script has run!");