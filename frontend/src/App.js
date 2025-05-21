
import './App.css';
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Shop from './pages/shop'
import Shopcategory from './pages/shopcategory'
import Product from './pages/product'
import Cart from './pages/cart'
import Login from './pages/login'
import mens_banner from './components/Assets/banner_mens.png'
import womens_banner from './components/Assets/banner_women.png'
import kids_banner from './components/Assets/banner_kids.png'






function App() {
  return (
    <BrowserRouter>


    
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<Shopcategory banner={mens_banner}category="men"/>}/>
        
        <Route path='/womens' element={<Shopcategory banner={womens_banner}category="women"/>}/>
        
        <Route path='/kids' element={<Shopcategory banner={kids_banner}category="kid"/>}/>
        
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
          </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}></Route>



      </Routes>

      </BrowserRouter>
  
  );
}

export default App;
