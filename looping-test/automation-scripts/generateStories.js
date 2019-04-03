// // // Go though files and look for .stories.tsx file

// const path = require('path');
// const fs = require('fs');

// const baseFileLoctaion = '/Users/benyoobic/Documents/playground/storybook-to-json/looping-test/src';
// const fileMatch = /\.stories.tsx$/;

// let results = [];

// function findStoriesFiles(startPath, filter, callback) {
//     console.log('Starting to look for .storie.tsx files in: '+startPath+'/');
//     if (!fs.existsSync(startPath)) {
//         console.log("no dir ", startPath);
//         return;
//     }
//     let files = fs.readdirSync(startPath);
//     for (let i = 0; i < files.length; i++) {
//         let filename = path.join(startPath, files[i]);
//         let stat = fs.lstatSync(filename);
//         if (stat.isDirectory()) {
//             findStoriesFiles(filename, filter, callback);
//         }
//         else if (filter.test(filename)) callback(filename);
//     };
// };

// findStoriesFiles(baseFileLoctaion, fileMatch, filename => {
//     console.log('-- Found .stories.tsx file in: ', filename);
//     results.push(filename);
// });