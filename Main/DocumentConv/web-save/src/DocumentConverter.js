function DocumentConverter(){
  return(<>
  <div className="w-1/2 p-4 mx-auto text-center my-5 text-xl">
    <p className="">Document Converter</p>
      <div className="flex my-10 ml-16">
        <p>Convert</p>
        <select name="document" id="document" className="ml-3">
          <option value="PDF">PDF</option>
          <option value="Word (DOCX)">Word</option>
        </select>

        <p className="ml-3">To</p>
        <select name="document" id="document" className="ml-3">
          <option value="PDF">PDF</option>
          <option value="Word (DOCX)">Word</option>
        </select>
      </div>

      <div
        className="border border-dashed border-gray-400 p-20 my-10 mx-auto text-center">
        <p>Drop files here</p>
      </div>

      <div
        className="border border-solid rounded-xl border-gray-400 p-2 my-10 text-center w-20 h-10 text-s cursor-pointer">
        <p>Start</p>
      </div>

      <div
        className="border border-solid border-gray-400 rounded-xl p-2 my-10 mx-auto text-center w-20 h-10 text-s cursor-pointer">
        <p>Save</p>
      </div>


      
    </div>
  </>)
}

export default DocumentConverter