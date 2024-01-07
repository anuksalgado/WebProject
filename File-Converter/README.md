# Track-record and IMPORTANT (will be updated in the coming days if any change)

- To NOTE: Patterson Leon's Document Converter shall not be used for complex word structure files, as it uses Mammoth JS and puppeteer to do the conversion. To get proper detailed conversion of word to pdf file, we"ll have to use a corporate API such as pspd or convertapi, etc which we have to pay money for.

- The converted document would not preserve exact indentation but would include all the elements of the word file with images embedded.

# To run the program and information about some folders/files

- open new terminal within vscode and cd into the proper directory the File-Converter and then type < npm run build-css > to run script to make Tailwind changes effective and to watch for future changes automatically, and then open another terminal and type < nodemon TestServer.js > to start the server. (by using nodemon you dont have to type the command to restart the server each time after a change, it automatically does it when the changes are saved so you can directly refresh the browser to observe changes). afterwards go to browser and type http://localhost:3000/ and the homepage that is uploadDoc.ejs should render.

# Folder Structure

- "public" is where the static files are such as styles.css, etc. Within public folder the Document folder is where when you upload the word doc it first gets saved into that folder and then after conversion the converted pdf file gets saved to the same Document folder itself.

- "src" is where the usual styles.css file is located, and its located in the src folder because Tailwind takes input from that styles.css and outputs the styles.css file that is used by the program to the "public" folder. The program files all requiring styling link to the styles.css file inside the public folder.

- "views" folder is where the EJS files are stored, and within it the "partials" folder is there but as of now nothing is there in that, but it is there to include EJS files that can be reused multiple times, such as a header and footer.

- "TestServer.js" is the server file which handles the document conversion and rendering and communicating data with front-end.

# TODO's and extra mentions
 
- Proper Styling for the downloadDoc.ejs file needs to be done, and if the conversion was unsuccessfull for that styling needs to be done as well. Also overall styling can be improved in the coming days.

- The animation used in the homepage was taken from a youtube video I reffered for an individual project of mine, which i cant find the video to mention as reference. 