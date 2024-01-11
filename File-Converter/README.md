# Track-record and IMPORTANT (will be updated in the coming days if any change)

- The Document Converter now can convert accurately in A4 size using LibreOffice software directly.
Multiple types of file formats can be input to convert to pdf. That is it can convert any document format that LibreOffice can import to a pdf file format. But this programs focus as of not is converting Word Docx Doc files to PDF.

- NOTE: If the content is not in A4 format, the content would be cut into the subsequent pages.

- Using MammothJS and puppeteer to do the conversion process was removed.

- Using Unconv as an API to convert documents in LibreOffice was done, after that it was removed to implement a better solution as of now.


# To run the program
- First and foremost make sure you install LibreOffice software.

- On mac to install using homebrew you can run < brew install --cask libreoffice > on the computer terminal. Then make sure the "soffice" executable is present, that should exactly be path "/Applications/LibreOffice.app/Contents/MacOS/soffice".

- On windows install the LibreOffice software from the site normally. Then make sure the "soffice.exe" executable is present, that should exactly be path "C:\\Program Files\\LibreOffice\\program\\soffice.exe".
(THIS HAS NOT BEEN TESTED ON WINDOWS).

- open new terminal within vscode and cd into the proper directory the File-Converter and then type < npm run build-css > to run script to make Tailwind changes effective and to watch for future changes automatically, and then open another terminal and type < nodemon TestServer.js > to start the server(by using nodemon you dont have to type the command to restart the server each time after a change, it automatically does it when the changes are saved so you can directly refresh the browser to observe changes) or else usual node command to start the server would work as well. afterwards go to browser and type http://localhost:3000/ and the homepage that is uploadDoc.ejs should render.

- NOTE: the < > arrow symbols are used above to mention terminal commands. Ignore them when running the commands.

# Folder/File Structure

- "public" is where the static files are such as styles.css, etc. Within public folder the Document folder is where when you upload the word doc it first gets saved into that folder and then after conversion the converted pdf file gets saved to the same Document folder within a sub folder.

- "src" is where the usual styles.css file is located, and its located in the src folder because Tailwind takes input from that styles.css and outputs the styles.css file that is used by the program to the "public" folder. The program files all requiring styling link to the styles.css file inside the public folder.

- "views" folder is where the EJS files are stored, and within it the "partials" folder is there but as of now nothing is there in that, but it is there to include EJS files that can be reused multiple times, such as a header and footer.

- "TestServer.js" is the server file which handles the document conversion and rendering and communicating data with front-end.

- "node_modules" folder is where all the dependencies packages are installed and used in the program.

# TODO's and extra mentions
 
- Proper Styling for the downloadDoc.ejs file can be done, and if the conversion was unsuccessfull for that styling needs to be done as well. Also overall styling can be improved in the coming days.

- The animation used in the homepage was taken from a youtube video I reffered for an individual project of mine, which i cant find the video to mention as reference.

- On Linux we need to install the LibreOffice software and find the path the "soffice" package is located and then update the pathToOffice variable code to test it.

- Tried Integrating Socket.io for real time updates between client and server. (Could not achieve this with current knowledge, will be integrating with time).

- Loading animating should be added once convert button is clicked in uploadDoc.ejs to add more styling.

- The option to select whether document is of docx , doc or other format does not have any functionality other than just styling and making it look like the user is required to select the correct option as per the document being uploaded for conversion.