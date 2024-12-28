import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourites from './components/Favourites';

function App() {
  return (
   <BrowserRouter>
    <NavBar/>
     <Routes>
       <Route path='/' element={<><Banner/><Movies/></>} />
       <Route path='/favourites' element={<Favourites/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
