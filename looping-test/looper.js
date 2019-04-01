const fs = require('fs');
const path = require('path');
const process = require("process");
const stencilOutput = require('./json-outputs/stencil-components-output.json');

const baseFolderLocation = "/Users/benyoobic/Documents/playground/storybook-to-json/looping-test/src";
let results = [];
let discards = [];


/**
 * Walks though all the folders and sub folders in a given path
 * and extracts out all the files with .tsx and moves them into an array 
 */
function walk(dir) {
    const EXTENSION = '.tsx';
    let list = fs.readdirSync(dir);

    list.forEach(file => {
        file = dir + '/' + file;
        let stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            discards = discards.concat(walk(file));
        } else {
            if (path.extname(file).toLowerCase() === EXTENSION) {
                let fileName = file.substring(file.lastIndexOf('/')+1).split('.').slice(0, -1).join('.');
                results.push(fileName);
            };
        }
    });
    return results;
}

/**
 * Writes a file with all the results from the scrape
 */
function writeIt(a) {
    let fileName = './json-outputs/looper-output.json';
    fs.writeFile(fileName, JSON.stringify(results), err => {
        if (err) {
            console.error('Err: ' + err);
        }
        console.log('File Written');
    }
    );
}

function nameExtractor() {
    let a = stencilOutput.components.map(arr => {
        return arr
    });
    console.log(a);
}

/**
 * Reads the scrape results file
 */
function readIt() {
    let fileName = './json-outputs/looper-output.json';
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        let parsedLinks = JSON.parse(data);
        console.log(parsedLinks);
    });
}

function init() {
    if(walk(baseFolderLocation)) {
        writeIt();
    };
    readIt();
    nameExtractor();
}

init();