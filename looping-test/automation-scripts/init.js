const fs = require('fs');
const path = require('path');

const baseFolderLocation = "/Users/hannah/Documents/sandbox/storybook-to-json/looping-test/src";
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
                    let stringifiedFile = JSON.stringify(fileContents);
                    // stringifiedFile = stringifiedFile.replace("\n",""); trying to replace the \n newlines
                    let nameStart = stringifiedFile.indexOf('yoo-');
                    let nameEnd = stringifiedFile.indexOf('\')', nameStart);
                    let componentName = stringifiedFile.substring(nameStart, nameEnd);

                    let concatString = `document.body.appendChild('${componentName}')`
                    let jsStart = stringifiedFile.indexOf('let');
                    let jsEnd = stringifiedFile.indexOf('return');
                    let finalJs = stringifiedFile.substring(jsStart, jsEnd);
                    finalJs += concatString;

                    if (finalJs !== null) {
                        writeJsonOutput(file);
                    }
                });
            };
        }
    });

}


function writeJsonOutput(file) {
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
            "html": [
                "test/fixtures/patterns/atoms/paragraph/paragraph.html"
            ],
            "css": [
                "test/fixtures/patterns/atoms/paragraph/css/paragraph.css"
            ],
            "js": ""
        }
    };
    jsonObjectForFrontify.assets.js = finalJsString;
    fs.writeFileSync(`${file}.json`, JSON.stringify(jsonObjectForFrontify));
}

walkThoughDirectories(baseFolderLocation)