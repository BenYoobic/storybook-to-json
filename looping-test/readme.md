# Storybook to Frontify  

This repo is aimed at allowing a user to auto-generate JSON files needed to upload the correct JSON format to the Frontify API

## How to use the script:

* Clone the repo.
* Run ``` npm install ```.
* Navigate to the 'automation-scripts' folder.
* In the ```init.js``` file, change the 'baseFolderLocation' variable to your systems components file location.
* In a terminal at the  'automation-scripts' folder location, run ```node init```, this will run the main script.



## TODO:
- [ ]  Make the script run the extract and run function in each folder it finds a .stories.tsx file
- [ ] Confirm the JS string that is constructed can be consumed by Frontify
- [ ] Test the script can talk the the storybook.js file to talk to the Frontify API
- [ ] Test the script works on the main repo
