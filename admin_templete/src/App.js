import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home/Home';
import Order from './components/Pages/Order/Order';
import SignIn from './components/Pages/Signin/Signin'
import Category from './components/Pages/Category/Category'
import Product from './components/Pages/Product/Product';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
      </Routes>

    </>
  )
}

export default App;
