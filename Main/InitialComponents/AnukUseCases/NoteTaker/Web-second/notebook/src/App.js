import SideBar from './SideBar';
import Navbar from './Navbar';
import Note from './noteTaker';

function App() {
  return (<>
    <Navbar></Navbar>
    <div className='flex'>
    <SideBar></SideBar> 
    <Note></Note>
    </div>
  
    </>)
}

export default App;
