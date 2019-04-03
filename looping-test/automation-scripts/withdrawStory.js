const fs = require('fs');
const path = require('path');
const process = require("process");

// Write out as rudimentary javascript file

const testFileLocation = '/Users/benyoobic/Documents/playground/storybook-to-json/looping-test/src/components/about-component/about.stories.tsx';

let finalJsString = '';

function init() {
    readFile();

    if (readFile) {
        writeJsonOutput();
    }
};

// 1. Go to stories.tsx file
function readFile() {
    fs.readFile(testFileLocation, 'utf8', (err, fileContents) => {
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
        let finalJs = onlyJs += `document.body.appendChild('yoo-${componentName}')`;
        finalJsString = finalJs;
        if (finalJs !== null) {
            writeJsonOutput();
        }
    });
}

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
    console.log(jsonObjectForFrontify);
    fs.writeFileSync('../json-outputs/storypull-output.json', JSON.stringify(jsonObjectForFrontify));
}

init();