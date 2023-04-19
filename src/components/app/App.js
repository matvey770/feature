import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {React, useState, useEffect} from 'react';
import FeatureHeader from '../featureHeader/FeatureHeader';
import FeatureFooter from '../featureFooter/FeatureFooter';
import FeatureCart from '../featureCart/FeatureCart';
import FeatureMainPage from '../pages/FeatureMainPage';
import SingleItemLayout from '../singleItemLayout/SingleItemLayout';

import './App.scss'

const App = () => {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(1)

  useEffect(() => {
    const firstItemCart = JSON.parse(localStorage.getItem('cart'))
    if (!firstItemCart) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
    setCart(JSON.parse(localStorage.getItem('cart')))
    console.log('effect')
  }, [])

  const addCartItem = (id, title, img, descr, price, size) => {  // добавление элемента в корзину
      const newCartItem = {
          cartId: id,
          cartTitle: title,
          cartImg: img,
          cartDescr: descr,
          cartPrice: price,
          cartSize: size,
          cartCounter: 1
      }

      let checkOverlap = false // проверка на наличие в корзине такого же элемента

      cart.map((item, i) => {
        if (item.cartId === newCartItem.cartId && item.cartSize === newCartItem.cartSize) {
          setCartCount(cart[i].cartCounter = cart[i].cartCounter + 1)
          checkOverlap = true
        }
      })

      if (!checkOverlap) { setCart([...cart, newCartItem]) }
      localStorage.setItem('cart', JSON.stringify([...cart, newCartItem]))
  
      console.log(cart)
  }

  const addCountItem = (id) => {  // прибавка счетчика
    setCartCount(cart[id].cartCounter = cart[id].cartCounter + 1) 
    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const reduceCountItem = (id) => { // убавление счетчика/удаление из корзины
    setCartCount(cart[id].cartCounter = cart[id].cartCounter - 1)
    localStorage.setItem('cart', JSON.stringify(cart))
    if (cart[id].cartCounter < 1) {
      setCart([...cart.slice(0, id), ...cart.slice(id + 1)])
      localStorage.setItem('cart', JSON.stringify([...cart.slice(0, id), ...cart.slice(id + 1)]))
    } 
    console.log(cart)
  }

  const clearCart = () => {
    setCart([])
    localStorage.setItem('cart', JSON.stringify([]))
  }

  return (
    <Router>
      <div className='app'>    
        <FeatureHeader cart={cart}/>
          <Routes>
            <Route path="products/:id" element={<SingleItemLayout/>}/>
            <Route path="/" element={<FeatureMainPage onAdd={addCartItem}/>}/>
            <Route path="/cart" 
                   element={<FeatureCart 
                              cart={cart} 
                              addCount={addCountItem} 
                              reduceCount={reduceCountItem} 
                              clearCart={clearCart}
                            />}
            />
          </Routes>
        <FeatureFooter/>
      </div>
    </Router>

  )
}

export default App;
