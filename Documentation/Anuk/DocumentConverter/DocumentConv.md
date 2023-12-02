# Document Converters

Document converters work with converting documents from one format to another. For example, converting a word document(DOCX) to PDF or MD file to DOCX and vice-versa.

### How document converters work

Converting of data most of the time could lead to meta data lost, hyperlinks not working or issues with the format of the document as we usually see when translating between human languages like french and english. 

There are plenty of rules which govern translation. 

### How to convert from DOCX to MD

1. Allow user to input file to web page
2. Handle file uploading for issues
3. Use a library such as mammoth.js or pandoc on our server side nodeJS implementation through a wrapper to convert from DOCX to HTML. The reason we convert to HTML is it handles alot of the complexities of DOCX which MD might not be able to handle. 
4. Convert from HTML to MD using tools such as turndown or showdown
5. display the result

### Sprint use cases

1. formulate basic graphic description of how the process works
2. implementation of conversion steps in back end
3. handle front end file uploading
4. Testing

