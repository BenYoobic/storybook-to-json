const fs = require('fs');
const path = require('path');
const process = require("process");

const stencilOutput = require('./json-outputs/stencil-components-output.json');
const baseFolderLocation = "/Users/benyoobic/Documents/playground/storybook-to-json/looping-test/src";
const outputFileName = './json-outputs/looper-output.json';
let results = [];
let discards = [];
let stringifiedFiles = [];


/**
 * Walks though all the folders and sub folders in a given path
 * and extracts out all the files with .tsx and moves them into an array
 */
function walkThoughDirectories(dir) {
    const extension = '.tsx';
    let list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            discards = discards.concat(walkThoughDirectories(file));
        } else {
            if (path.extname(file).toLowerCase() === extension) {
                results.push(file);
            };
        }
    });
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
    fs.writeFile(outputFileName, '[' + stringifiedFiles + ']', err => {
        if (err) {
            console.log(`Error with writing file. Error message: ${err}`);
        }
        console.log('File Written');
    }
    );
}

/**
 * This function takes the stencial build doc output and maps all the data from the json
 * The idea of this function will be to pull out the right stuff from the stencil build doc
 * to merge with what we pull out of each component
 */
function nameExtractor() {
    let a = stencilOutput.components.map(arr => {
        return arr
    });
    console.log(a);
}

function init() {
    walkThoughDirectories(baseFolderLocation);
    readFileContents();
    nameExtractor();
}

init();

/**
 * Reads the scrape results file
 */
// function readIt() {
//     let fileName = './json-outputs/looper-output.json';
//     fs.readFile(fileName, (err, data) => {
//         if (err) throw err;
//         let parsedLinks = JSON.parse(data);
//         console.log(parsedLinks);
//     });
// }

