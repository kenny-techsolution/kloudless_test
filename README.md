# Kloudless Markdown Editor
An markdown editor. The text can be saved to a cloud storage via kloudless API and GUI tool. 


# Installation

 * git clone https://github.com/yoyocicada/kloudless_test.git
 * make sure you have the following: 
 * node.js -> sudo npm install npm -g
 * bower -> npm install -g bower
 * sass -> sudo gem install sass
 * Run the following commands to download the required packages
 * npm install
 * bower install

# Run the application 
 * Enter 'grunt serve' at the project root.
 * There you go!
 
 ## Key features
 * Allow a user to select a folder within cloud storage using the Kloudless File Explorer.
 * Include a textarea or other text input that a user can continuously enter raw markdown
text into.
 * Render the raw markdown text on the page as HTML as the user modifies the raw
markdown text.
 * Periodically save the raw markdown text as a file into the chosen folder of the cloud
storage service as the user modifies the markdown text.(every 1 minute)
 * Preserve the file text across page refreshes by storing the details of where the file is
saved to and downloading the file contents from there on page load.
 * Provide Instruction to guide user using the app.
 * The app can remember if user has read the instruction, and mininizing it if it's read before.
 * The app can remember the service and folder that user selected after page refresh.
 
 ## Implementation Notes
 * It's built using angularJs (angular 1)
 * Sass is used. 
 * Jade(pug) is the template preprocessor used.
 
