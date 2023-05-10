import { useState, useEffect } from "react"

import './adminConsole.scss'


const AdminConsole = ({entry}) => {

    const [dataOrders, setDataOrders] = useState([])
    const [dataProducts, setDataProducts] = useState([])
    const [status, setStatus] = useState('idle')
    const [buttonActive, setButtonActive] = useState()

    useEffect(() => {
        const fetchData = async () => { //СДЕЛАТЬ ЧЕРЕЗ HTTP.HOOK

            setStatus('fetching');
            const responseOrder = await fetch(`http://localhost:3002/orders`);
            const dataOrder = await responseOrder.json();
            setDataOrders(dataOrder);

            const responseProduct = await fetch(`https://6447fe3f7bb84f5a3e4f662e.mockapi.io/products`);
            const dataProduct = await responseProduct.json();
            setDataProducts(dataProduct);

            setStatus('fetched');
            console.log('logineffect')
        };
    
        fetchData();
    }, [buttonActive])

    const handleChoose = (e) => {
        let choose = e.target.id
        setButtonActive(choose)
    }


    if (status === 'fetched') {

    }

    const OrderWrapper = ({item, i}) => {

        const [openWrapper, setOpenWrapper] = useState(false)

        const onOpenWrapper = () => {
            setOpenWrapper(!openWrapper)
        }

        const onDeleteOrder = (id) => {
            setDataOrders([...dataOrders.slice(0, id), ...dataOrders.slice(id + 1)])
        }

        let options = {
            era: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }

        return (

            <div className="console_product">
                <div className="console_product-wrapper" key={i}>
                    <div onClick={onOpenWrapper}>Заказ № {i} от {item.date}</div>
                    <div className={`console_product-shell ${openWrapper ? 'activeshell' : ' '}`}>
                        <div><b>Имя:</b> {item.buyerData.name}</div>
                        <div>Телефон: {item.buyerData.number}</div>
                        <div>e-mail: {item.buyerData.email}</div>
                        <div>Адрес доставки: {item.buyerData.address}</div>
                        <div> <b>Корзина: </b>
                            {item.orderData.map(item => {
                                return (
                                    <div>{item.cartTitle}, размер {item.cartSize}, {item.cartCounter} шт.</div>
                                )
                            })}
                        </div>
                        <div><b>Сумма:</b> {item.totalCost} руб.</div>
                    </div>
                </div>
                <button onClick={() => {onDeleteOrder(i)}} className={`console_product-delete ${openWrapper ? 'activeshell' : ' '}`}>
                    <div className="line"></div>
                    <div className="line"></div>
                </button>
            </div>

        )  

    }

    const ProductsWrapper = ({item, i}) => {

        return (
            <div className="console_product-wrapper" key={i}>
                <div>Наименование: {item.title}</div>
                <div>Цена: {item.price} р.</div>
                <div>Описание: {item.descr}</div>
                <div>Размеры: {item.size.map(size => {
                        return (
                            <div>{size}</div>
                        )
                    })}
                </div>
                <div>Категория: {item.category}</div>
            </div>
        )

    } 


    let data 

    if (buttonActive === 'orders') {
        data = dataOrders.map((item, i) => {
            return (
                <OrderWrapper item={item} i={i}/>
            )
        }) 
    } else if (buttonActive === 'products') {
        data = dataProducts.map((item, i) => {
            return (
                <ProductsWrapper item={item} i={i}/>
            )
        })
    }

    return (
        <div className="console_wrapper">
            <div onClick={handleChoose} className="console_buttons">
                <button id='orders' className="console_button">Заказы</button>
                <button id='products' className="console_button">Продукция</button>
            </div>
            <div className="console_items">
                {data}
            </div>
        </div>
    )


}

export default AdminConsole