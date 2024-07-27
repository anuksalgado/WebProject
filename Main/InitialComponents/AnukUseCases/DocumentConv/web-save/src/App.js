import SideBar from './SideBar';
import DocumentConverter from './DocumentConverter';
import Navbar from './Navbar';

function App() {
  return (<>
  <Navbar></Navbar>
  <div className='flex'>
  <SideBar></SideBar> 
  <DocumentConverter></DocumentConverter>
  </div>

  </>)
}

export default App;
