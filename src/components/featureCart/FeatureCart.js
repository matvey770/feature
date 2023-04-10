import './featureCart.scss'

import credit from "../../img/icons/creditcard.png"
import courier from "../../img/icons/courier.png"
import launch from "../../img/icons/launch.png"


const FeatureCart = () => {
    return (
        <div className='cart_wrapper'>
            <h2 className='cart_label'>ОФОРМЛЕНИЕ ЗАКАЗА</h2>
            <div className='cart_title'>
                <div className='cart_title-item'>Товар</div>
                <div className='cart_title-item'>Размер</div>
                <div className='cart_title-item'>Количество</div>
                <div className='cart_title-item'>Цена</div>
            </div>
            <div className='cart_line'></div>
            <h2 className='cart_label'>Корзина пуста</h2>
            {/* ТУТ БУДУТ ЭЛЕМЕНТЫ */}
            <div className='cart_line'></div>
            <div className='cart__cost'>
                <div className='cart__cost_promo'>
                    <form className='cart__cost_promo-form'>
                    <div className='cart__cost_promo-text'>Промокод:</div>
                        <label>
                            <input type="text" name="name" />
                            <input type="submit" value=""/>
                        </label>
                    </form>
                </div>
                <div className='cart__cost_price'>
                        <div className='cart__cost_price-item'>Скидка:</div>
                        <div className='cart__cost_price-item'>К оплате:</div>
                        <div className='cart__cost_price-discount'>0 р</div>
                        <div className='cart__cost_price-value'>10 999 р</div>
                </div>
            </div>
                <h2 className='cart_label'>Оформление заказа(зарегистрируйтесь или войдите)</h2>
                <div className='cart_line'></div>
                <div className='cart__purchase'>
                    <form className='cart__purchase_form'>
                        <label>
                            <div className='cart__purchase_form-name'>Имя:</div>
                            <input className='cart__purchase_form-input' type="text" name="name" />
                        </label>
                        <label>
                            <div className='cart__purchase_form-name'>Телефон:</div>
                            <input className='cart__purchase_form-input' type="text" name="name" />
                        </label>
                        <label>
                            <div className='cart__purchase_form-name'>E-mail:</div>
                            <input className='cart__purchase_form-input' type="text" name="name" />
                        </label>
                        <label>
                            <div className='cart__purchase_form-checkname'>Даю согласие на обработку персональных данных и соглашаюсь с условиями политики</div>
                            <input className='cart__purchase_form-check' type="checkbox"/>
                        </label>
                        <button className='cart__purchase_form-button'>Оплатить</button>
                    </form>
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
    )
}

export default FeatureCart;