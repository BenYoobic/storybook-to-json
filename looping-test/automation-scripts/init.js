const fs = require('fs');
const path = require('path');
const process = require("process");

const baseFolderLocation = "/Users/benyoobic/Documents/playground/storybook-to-json/looping-test/src/components";
const outputFileName = './../json-outputs/looper-output.json';
const fileMatch = /\.stories.tsx$/;
let results = [];
let discards = [];
let stringifiedFiles = [];


/**
 * Walks though all the folders and sub folders in a given path and looks at what that file type is.
 * Then inside all the files that match the file extention .stories.tsx, the read file contents function is called
 */
function walkThoughDirectories(startPath, filter, callback) {
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }
    let files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        let filename = path.join(startPath, files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            walkThoughDirectories(filename, filter, callback);
        }
        else if (filter.test(filename)) callback(filename);
    };
}

/**
 * This function extracts the contents of each .stories.tsx file and finds the JS element of the story
 * and extracts it and turns it into a single string and adds the JS append command to the end of the constructed string
 */
function readFileContents() {
    results.forEach(fileLocation => {
        fs.readFile(fileLocation, 'utf8', (err, fileContents) => {
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
            // console.log(onlyJs);

            // 5. add extra peice of js - document.body.appendChild(// specific element \\);

            let componentNameLocation = strArr.indexOf('let') + 1;
            let componentName = strArr[componentNameLocation];
            let finalJs = onlyJs.concat(`document.body.appendChild('yoo-${componentName}')`);
            finalJsString = finalJs;
            if (finalJs !== null) {
                writeJsonOutput();
            }
        });
    });
}

/**
 * Thsi function is called once the JS function has been extracted from the whole .stories.tsx file
 * It takes the base JSON format needed for Frontify, and inserts the constructed JS string into the JSON
 * It then writes out and saves the JSON in the file system.
 */
function writeJsonOutput() {
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
    // console.log(jsonObjectForFrontify);
    fs.writeFileSync('frontify-data.json', JSON.stringify(jsonObjectForFrontify));
}


/**
 * This function is called when the script is run and starts the script.
 */
walkThoughDirectories(baseFolderLocation, fileMatch, filename => {
    if (filename) {
        results.push(filename);
    }
    readFileContents();
});