const fs = require('fs');
const path = require('path');
const process = require("process");

const baseFolderLocation = "/Users/benyoobic/Documents/playground/storybook-to-json/looping-test/src";
// const outputDirectory = "/json-outputs/";
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
                results.push(file);
            };
        }
    });
    return results;
}

/**
 * Writes a file with all the results from the scrape
 */
function writeIt() {
    let fileName = './json-outputs/looper-output.json';
    fs.writeFile(fileName, JSON.stringify(results), err => {
        if (err) {
            console.error('Err: ' + err);
        }






        console.log('File Written');
    }
    );
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
    walk(baseFolderLocation);
}

init();