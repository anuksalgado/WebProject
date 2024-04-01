import React from "react";
// import "./index.css";

function SideBar(){
  return(<div className="p-0 m-0 list-none fixed bg-blue-700 w-64 text-white h-screen">
    <header className="text-3xl text-center" >Navigation</header>
    <ul className="p-3 text-left">
      <li className="border-box border-4 bg-white text-black rounded-xl text-center mt-3">Homepage</li>
      <li className="border-box border-4 bg-white text-black rounded-xl text-center mt-3">Document Converter</li>
      <li className="border-box border-4 bg-white text-black rounded-xl text-center mt-3">Marks Visualiser</li>
      <li className="border-box border-4 bg-white text-black rounded-xl text-center mt-3">Multiple Categorised Notebooks</li>
      <li className="border-box border-4 bg-white text-black rounded-xl text-center mt-3">Calendar</li>
      <li className="border-box border-4 bg-white text-black rounded-xl text-center mt-3">Word Counter Tool</li>
      <li className="border-box border-4 bg-white text-black rounded-xl text-center mt-3">Customise Tabs and Tools</li>
      <li className="border-box border-4 bg-white text-black rounded-xl text-center mt-3">Save and Retrieve Work</li>
    </ul>
  </div>)
}

export default SideBar