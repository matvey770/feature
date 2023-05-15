import {React, useEffect, useState} from 'react'

import FeatureForm from '../featureForm/FeatureForm';
import FeatureFooter from '../featureFooter/FeatureFooter';
import FeatureHeader from '../featureHeader/FeatureHeader';

import config from '../../config.json'

import './featureCart.scss'

import credit from "../../img/icons/creditcard.png"
import courier from "../../img/icons/courier.png"
import launch from "../../img/icons/launch.png"

import { Formik, Form, Field } from 'formik'

const FeatureCart = ({cart, addCount, reduceCount, clearCart}) => {

    const [typePromo, setTypePromo] = useState(false)

    let discount = config.DISCOUNT

    useEffect(() => {
        console.log('cartEffect')
    }, [])

    const EmptyCart = () => {
        return (
            <h2 className='cart_label'>Корзина пуста</h2>
        )
    }

    const CartItems = () => {
            const items = cart.map((item, i) => {
                return (
                    <div key={i} className='cart__item'>
                        <img className='cart__item-img' src={`../img/products/${item.cartId}/1.jpg`} alt="itemCart"></img>
                        <div className='cart__item_wrapper'>
                            <img className='cart__item-imgsmall' src={`img/products/${item.cartId}/1.jpg`} alt="itemCart"></img>
                            <div className='cart__item_quantitysmall'>
                                <button onClick={() => {reduceCount(i)}} className='cart__item_quantity-reduce'>-</button>
                                <div className='cart__item_quantity-counter'>{item.cartCounter}</div>
                                <button onClick={() => {addCount(i)}} className='cart__item_quantity-add'>+</button>
                            </div>
                        </div>
                        <div>
                            <div className='cart__item-name'>{item.cartTitle}</div>
                            <div className='cart__item-descr'>{item.cartDescr}</div>
                        </div>
                        <div className='cart__item-size'>{item.cartSize}</div>
                        <div className='cart__item_quantity'>
                            <button onClick={() => {reduceCount(i)}} className='cart__item_quantity-reduce'>-</button>
                            <div className='cart__item_quantity-counter'>{item.cartCounter}</div>
                            <button onClick={() => {addCount(i)}} className='cart__item_quantity-add'>+</button>
                        </div>
                        <div className='cart__item-price'>{item.cartPrice * item.cartCounter} р.</div>
                    </div>
                )
            })
            return (
                <div className='cart__item-wrapper'>
                    {items}
                </div>
            )
    }

    const PromoForm = () => {
        let promoCode = config.PROMOCODE

        return (
            <Formik
            initialValues = {{
                promo: '',
            }}
            onSubmit={value => {
                if (value.promo === promoCode) {
                    setTypePromo(true)
                }
            }}
            >
                <Form className='cart__cost_promo-form'>
                    <div className='cart__cost_promo-text'>Промокод:</div>
                    <Field
                        className='cart__cost_promo-input'
                        id="promo"
                        type="text"
                        name="promo">
                    </Field>
                    <button type="submit" className={`cart__cost_promo-button ${typePromo ? 'promo-true' : ''}`}>&#10003;</button>
                </Form>
            </Formik>
        )
    }

    const CartCostPrice = () => {
        let totalPrice = 0
        let discountValue = 0
        cart.map(item => {
            totalPrice = totalPrice + item.cartCounter * item.cartPrice
        })

        if (typePromo) {
            discountValue = totalPrice - (totalPrice * discount)
            totalPrice = totalPrice * discount
        }
        

        return (
            <div className='cart__cost'>
                <div className='cart__cost_promo'>
                    <PromoForm/>
                </div>
                <div className='cart__cost_price'>
                    <div className='cart__cost_price-item'>Скидка:</div>
                    <div className='cart__cost_price-item'>К оплате:</div>
                    <div className='cart__cost_price-discount'>{discountValue} р.</div>
                    <div className='cart__cost_price-value'>{totalPrice} р.</div>
                </div>
            </div>
        )
    }

    let cartholder
    if (cart.length > 0) {
        cartholder = <CartItems/>
    } else { 
        cartholder = <EmptyCart/>
    }

    return (
        <>
        <FeatureHeader cart={cart}/>
        <div className='cart_wrapper'>
            <h2 className='cart_label'>ОФОРМЛЕНИЕ ЗАКАЗА</h2>
            <div className='cart_title'>
                <div className='cart_title-item'>Товар</div>
                <div className='cart_title-item'>Размер</div>
                <div className='cart_title-item'>Количество</div>
                <div className='cart_title-item'>Цена</div>
            </div>
            <div className='cart_line'></div>
            {cartholder}
            <div className='cart_line'></div>
                <CartCostPrice/>
                <h2 className='cart_label'>Оформление заказа(зарегистрируйтесь или войдите)</h2>
                <div className='cart_line'></div>
                <div className='cart__purchase'>
                    <FeatureForm cart={cart} clearCart={clearCart} typePromo={typePromo}/>
                    <div className='cart__descr'>
                        <div className='cart__descr_wrapper'>
                            <img className='cart__descr-img' src={credit} alt="credit"></img>
                            <div>
                                <div className='cart__descr-title'>Безопасная оплата</div>
                                <div className='cart__descr-text'>Оплата наличными при получении. Безопасная оплата картой по протоколу 3D Secure.</div>
                            </div>
                        </div>
                        <div className='cart__descr_wrapper'>
                            <img className='cart__descr-img' src={courier} alt="courier"></img>
                            <div>
                                <div className='cart__descr-title'>Бесплатная доставка</div>
                                <div className='cart__descr-text'>У вас всегда есть возможность получить бесплатную доставку товаров.</div>
                            </div>
                        </div>
                        <div className='cart__descr_wrapper'>
                            <img className='cart__descr-img' src={launch} alt="launch"></img>
                            <div>
                                <div className='cart__descr-title'>Возврат и обмен</div>
                                <div className='cart__descr-text'>Вы всегда сможете вернуть или обменять товар в течении 14 дней с момента получения.</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <FeatureFooter/>
        </>
    )
}

export default FeatureCart;