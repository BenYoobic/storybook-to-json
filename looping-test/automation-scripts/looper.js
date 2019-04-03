const fs = require('fs');
const path = require('path');
const process = require("process");

// const stencilOutput = require('./json-outputs/stencil-components-output.json');
const baseFolderLocation = "/Users/benyoobic/Documents/playground/storybook-to-json/looping-test/src/components";
const outputFileName = './json-outputs/looper-output.json';
const fileMatch = /\.stories.tsx$/;
let results = [];
let discards = [];
let stringifiedFiles = [];


/**
 * Walks though all the folders and sub folders in a given path
 * and extracts out all the files with .tsx and moves them into an array
 */
function walkThoughDirectories(dir) {
    let list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            discards = discards.concat(walkThoughDirectories(file));
        } else {
            // let regex = RegExp(/\.stories.tsx$/);
            let regex = RegExp(/\.tsx$/);
            if (path.extname(file).toLowerCase() === regex.test(file)) {
                console.log(file);
                results.push(file);
            };
        }
    });
    console.log(results);
    return results;
}

/**
 * This function reads a given file contents and then stringifys the output
 */
function readFileContents() {
    results.forEach(fileLocation => {
        fs.readFile(fileLocation, 'utf8', (err, fileContents) => {
            if (err) {
                console.log(`Error with reading file. Error message: ${err}`);
            }
            let fileContentsResult = JSON.stringify(fileContents);
            stringifiedFiles.push(fileContentsResult);
            if (stringifiedFiles.length > 2) {
                writeIt();
            }
        });
    });
}

/**
 * Writes a file with all the results from the scrape
 */
function writeIt() {
    let allFilesStrings = stringifiedFiles.concat(results);
    fs.writeFile(outputFileName, '[' + allFilesStrings + ']', err => {
        if (err) {
            console.log(`Error with writing file. Error message: ${err}`);
        }
        console.log('File Written');
    }
    );
}

function init() {
    walkThoughDirectories(baseFolderLocation);
    // readFileContents();
}

init();



// const fs = require('fs');
// const path = require('path');
// const process = require("process");

// // const stencilOutput = require('./json-outputs/stencil-components-output.json');
// const baseFolderLocation = "/Users/benyoobic/Documents/playground/storybook-to-json/looping-test/src";
// const outputFileName = './../json-outputs/looper-output.json';
// const fileMatch = /\.stories.tsx$/;
// let results = [];
// let discards = [];
// let stringifiedFiles = [];


// /**
//  * Walks though all the folders and sub folders in a given path
//  * and extracts out all the files with .stories.tsx and moves them into an array
//  */
// function walkThoughDirectories(startPath, filter, callback) {
//     if (!fs.existsSync(startPath)) {
//         console.log("no dir ", startPath);
//         return;
//     }
//     let files = fs.readdirSync(startPath);
//     for (let i = 0; i < files.length; i++) {
//         let filename = path.join(startPath, files[i]);
//         let stat = fs.lstatSync(filename);
//         if (stat.isDirectory()) {
//             walkThoughDirectories(filename, filter, callback);
//         }
//         else if (filter.test(filename)) callback(filename);
//     };
// }

// /**
//  * This function reads a given file contents and then stringifys the output
//  */
// function readFileContents() {
//     results.forEach(fileLocation => {
//         fs.readFile(fileLocation, 'utf8', (err, fileContents) => {
//             // 2. Pull out JS contnet
//             let stringifiedFile = JSON.stringify(fileContents);

//             // 3. find specific js elements needed
//             let strArr = stringifiedFile.split(" ");
//             let jsStart = strArr.indexOf('let');
//             let jsEnd = strArr.indexOf('return');
//             let tagNameStart = strArr.indexOf('createElement') + 2;
//             let tagNameEnd = strArr.indexOf(')', tagNameStart) - 1;

//             // 4. make string of just the javascript portion of the story
//             let onlyJsArr = [];
//             onlyJsArr = strArr.slice(jsStart, jsEnd);
//             let onlyJs = JSON.stringify(onlyJsArr.join().replace(/,/g, ' '));
//             // console.log(onlyJs);

//             // 5. add extra peice of js - document.body.appendChild(// specific element \\);

//             let componentNameLocation = strArr.indexOf('let') + 1;
//             let componentName = strArr[componentNameLocation];
//             let finalJs = onlyJs.concat(`document.body.appendChild('yoo-${componentName}')`);
//             finalJsString = finalJs;
//             if (finalJs !== null) {
//                 writeJsonOutput();
//             }
//         });
//     });
// }

// /**
//  * Writes a json file for each component of .stories.tsx
//  */
// function writeJsonOutput() {
//     let jsonObjectForFrontify = {
//         "name": "Paragraph",
//         "description": "Basic Paragraph",
//         "type": "atom",
//         "stability": "stable",
//         "variations": {
//             "lead": {
//                 "name": "Lead paragraph",
//                 "assets": {
//                     "html": [
//                         "test/fixtures/patterns/atoms/paragraph/paragraph_lead.html"
//                     ],
//                     "css": [
//                         "test/fixtures/patterns/atoms/paragraph/css/paragraph_lead.css"
//                     ]
//                 }
//             }
//         },
//         "assets": {
//             "html": [
//                 "test/fixtures/patterns/atoms/paragraph/paragraph.html"
//             ],
//             "css": [
//                 "test/fixtures/patterns/atoms/paragraph/css/paragraph.css"
//             ],
//             "js": ""
//         }
//     };
//     jsonObjectForFrontify.assets.js = finalJsString;
//     // console.log(jsonObjectForFrontify);
//     fs.writeFileSync('frontify-data.json', JSON.stringify(jsonObjectForFrontify));
// }


// walkThoughDirectories(baseFolderLocation, fileMatch, filename => {
//     if (filename) {
//         results.push(filename);
//     }
//     readFileContents();
// });





// const fs = require('fs');
// const path = require('path');
// const process = require("process");

// // const stencilOutput = require('./json-outputs/stencil-components-output.json');
// const baseFolderLocation = "/Users/benyoobic/Documents/playground/storybook-to-json/looping-test/src";
// const outputFileName = './json-outputs/looper-output.json';
// const fileMatch = /\.stories.tsx$/;
// let results = [];
// let discards = [];
// let stringifiedFiles = [];


// /**
//  * Walks though all the folders and sub folders in a given path
//  * and extracts out all the files with .tsx and moves them into an array
//  */
// function walkThoughDirectories(dir) {


//     let list = fs.readdirSync(dir);
//     list.forEach(file => {
//         file = dir + '/' + file;
//         let stat = fs.statSync(file);
//         if (stat && stat.isDirectory()) {
//             discards = discards.concat(walkThoughDirectories(file));
//         } else {
//             if (path.extname(file).toLowerCase() === fileMatch) {
//                 results.push(file);
//             };
//         }
//     });
//     console.log(results);
//     return results;
// }

// /**
//  * This function reads a given file contents and then stringifys the output
//  */
// function readFileContents() {
//     results.forEach(fileLocation => {
//         fs.readFile(fileLocation, 'utf8', (err, fileContents) => {
//             if (err) {
//                 console.log(`Error with reading file. Error message: ${err}`);
//             }
//             let fileContentsResult = JSON.stringify(fileContents);
//             stringifiedFiles.push(fileContentsResult);
//             if (stringifiedFiles.length > 2) {
//                 writeIt();
//             }
//         });
//     });
// }

// /**
//  * Writes a file with all the results from the scrape
//  */
// function writeIt() {
//     let allFilesStrings = stringifiedFiles.concat(results);
//     fs.writeFile(outputFileName, '[' + allFilesStrings + ']', err => {
//         if (err) {
//             console.log(`Error with writing file. Error message: ${err}`);
//         }
//         console.log('File Written');
//     }
//     );
// }

// function init() {
//     walkThoughDirectories(baseFolderLocation);
//     readFileContents();
// }

// init();