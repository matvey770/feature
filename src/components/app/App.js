import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {React, useState} from 'react';
import FeatureHeader from '../featureHeader/FeatureHeader';
import FeatureFooter from '../featureFooter/FeatureFooter';
import FeatureCart from '../featureCart/FeatureCart';
import FeatureMainPage from '../pages/FeatureMainPage';

import './App.scss'

const App = () => {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(1)

  const addCartItem = (id, title, img, descr, price, size) => {
      const newCartItem = {
          cartId: id,
          cartTitle: title,
          cartImg: img,
          cartDescr: descr,
          cartPrice: price,
          cartSize: size,
          cartCount: 1
      }
      setCart([...cart, newCartItem])
      console.log(cart)
  }

  const addCountItem = (id) => {
    setCartCount(cart[id].cartCount = cart[id].cartCount + 1) 
    console.log(cart)
  }

  const reduceCountItem = (id) => {
    setCartCount(cart[id].cartCount = cart[id].cartCount - 1)
    if (cart[id].cartCount < 1) {
      setCart([...cart.slice(0, id), ...cart.slice(id + 1)])
    } 
    console.log(cart)
  }

  return (
    <Router>
      <div className='app'>    
        <FeatureHeader/>
          <Routes>
            <Route path="/" element={<FeatureMainPage onAdd={addCartItem}/>}/>
            <Route path="/cart" element={<FeatureCart cart={cart} addCount={addCountItem} reduceCount={reduceCountItem}/>}/>
          </Routes>
        <FeatureFooter/>
      </div>
    </Router>

  )
}

export default App;
