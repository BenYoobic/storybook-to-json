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
                    console.log('here!')
                    // 2. Pull out JS contnet
                    let stringifiedFile = JSON.stringify(fileContents);

                    // 3. find specific js elements needed
                    let strArr = stringifiedFile.split(" ");
                    let jsStart = strArr.indexOf('let');
                    let jsEnd = strArr.indexOf('return');
                    let tagNameStart = strArr.indexOf('createElement') + 2;
                    let tagNameEnd = strArr.indexOf(')', tagNameStart) - 1;
        
                    // 4. make string of just the javascript portion of the story
                    let onlyJsArr = [];
                    onlyJsArr = strArr.slice(jsStart, jsEnd);
                    let onlyJs = JSON.stringify(onlyJsArr.join().replace(/,/g, ' '));
                    //  TODO -> error handling ie. if there is no js (empty string?)
        
                    // 5. add extra peice of js - document.body.appendChild(// specific element \\);
                    let componentNameLocation = strArr.indexOf('let') + 1;
                    let componentName = strArr[componentNameLocation];
                    let finalJs = onlyJs.concat(`document.body.appendChild('yoo-${componentName}')`);
                    finalJsString = finalJs;
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