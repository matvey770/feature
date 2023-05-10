import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {React, useState, useEffect} from 'react';
import FeatureCart from '../featureCart/FeatureCart';
import FeatureMainPage from '../pages/featureMainPage/FeatureMainPage';
import SingleItemLayout from '../pages/singleItemLayout/SingleItemLayout';
import CategoryPage from '../pages/categoryPage/CategoryPage';
import InfoPage from '../pages/infoPage/InfoPage';
import AdminPanel from '../pages/adminPanel/AdminPanel';
import Spinner from '../spinner/Spinner';

import './App.scss'

const App = () => {

  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(1) //количество продукта
  const [addedItem, setAddedItem] = useState(false) //добавлен ли товар в корзину (для кнопки в singleItemLayout)

  useEffect(() => { //получение базы продуктов
    const firstItemCart = JSON.parse(localStorage.getItem('cart'))
    if (!firstItemCart) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
    setCart(JSON.parse(localStorage.getItem('cart')))
    console.log('effect')
  }, [])

  useEffect(() => { //таймер "товар добавлен в корзину"
    if (addedItem) {
      setTimeout(() => {
        setAddedItem(false)
        console.log(addedItem)
      }, 3000)
    }
  }, [addedItem])

  const addCartItem = (id, title, img, descr, price, size) => {  // добавление элемента в корзину
    setAddedItem(true)

    const newCartItem = {
        cartId: id,
        cartTitle: title,
        cartImg: img,
        cartDescr: descr,
        cartPrice: price,
        cartSize: size,
        cartCounter: 1
    }
      
    if (size === "") return

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
          <Routes>
            <Route path="/new" element={<CategoryPage cart={cart} onAdd={addCartItem} dataType='new'/>}/>
            <Route path="/t-shirts" element={<CategoryPage cart={cart} onAdd={addCartItem} dataType='t-shirt'/>}/>
            <Route path="/hoodies" element={<CategoryPage cart={cart} onAdd={addCartItem} dataType='hoodie'/>}/>
            <Route path="/products/:id" element={<SingleItemLayout onAdd={addCartItem} cart={cart} addedItem={addedItem}/>}/>
            <Route path="/" element={<FeatureMainPage cart={cart} onAdd={addCartItem}/>}/>
            <Route path="/about" element={<InfoPage cart={cart}/>}/>
            <Route path="/cart" 
                   element={<FeatureCart 
                              cart={cart} 
                              addCount={addCountItem} 
                              reduceCount={reduceCountItem} 
                              clearCart={clearCart}
                            />}
            />
            <Route path='/admin-panel' element={<AdminPanel/>}/>
          </Routes>
      </div>
    </Router>
  )
}

export default App;
