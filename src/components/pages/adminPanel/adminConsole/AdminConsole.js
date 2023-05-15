import { useState, useEffect } from "react"

import './adminConsole.scss'

import edit from '../../../../img/icons/edit.png'

import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
import * as Yup from 'yup'


const AdminConsole = ({entry}) => {

    const [dataOrders, setDataOrders] = useState([])
    const [dataProducts, setDataProducts] = useState([])
    const [status, setStatus] = useState('idle')
    const [buttonActive, setButtonActive] = useState()
    const [buttonAddActive, setButtonAddActive] = useState(false)

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
        console.log(dataOrders)
        console.log(dataProducts)
    }

    const onOpenAdd = () => {
        setButtonAddActive(!buttonAddActive)
        console.log(buttonAddActive)
    }

    const OrderWrapper = ({item, i}) => {

        const [openWrapper, setOpenWrapper] = useState(false)

        const onOpenWrapper = () => {
            setOpenWrapper(!openWrapper)
        }

        const onDeleteOrder = (id) => {
            setDataOrders([...dataOrders.slice(0, id), ...dataOrders.slice(id + 1)])
            fetch(`http://localhost:3002/orders/${id+1}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }

        return (
            <div className="console_product">
                <div className="console_product-wrapper" key={i}>
                    <div onClick={onOpenWrapper}><b>Заказ №{i}</b> от {item.date}</div>
                    <div className={`console_product-shell ${openWrapper ? 'activeshell' : ' '}`}>
                        <div><b>Имя:</b> {item.buyerData.name}</div>
                        <div>Телефон: {item.buyerData.number}</div>
                        <div>e-mail: {item.buyerData.email}</div>
                        <div>Адрес доставки: {item.buyerData.address}</div>
                        <div><b>Корзина: </b>
                            {item.orderData.map(item => {
                                return (
                                    <div>{item.cartTitle}, размер {item.cartSize}, {item.cartCounter} шт.</div>
                                )
                            })}
                        </div>
                        <div><b>Сумма:</b> {item.totalCost} руб.</div>
                    </div>
                </div>
                <button onClick={() => {onDeleteOrder(i)}} className={`console_product-button ${openWrapper ? 'activeshell' : ' '}`}>
                    <div className="line"></div>
                    <div className="line"></div>
                </button>
            </div>
        )  
    }

    const ProductsWrapper = ({item, i}) => {

        const [openWrapper, setOpenWrapper] = useState(false)
        const [openEdit, setOpenEdit] = useState(false)

        const onOpenWrapper = () => {
            setOpenWrapper(!openWrapper)
        }

        const onDeleteProduct = (id) => {
            setDataProducts([...dataProducts.slice(0, id), ...dataProducts.slice(id + 1)])
            fetch(`https://6447fe3f7bb84f5a3e4f662e.mockapi.io/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }
        
        const onOpenEdit = () => {
            setOpenEdit(true)
            setOpenWrapper(!openWrapper)
        }

        const Product = () => {
            return (
                <div className="console_product-wrapper" key={i}>
                    <div onClick={onOpenWrapper}><b>Наименование:</b> {item.title}, <b>id:</b> {item.id}</div>
                    <div className={`console_product-shell ${openWrapper ? 'activeshell' : ' '}`}>
                        <div><b>Цена:</b> {item.price} р.</div>
                        <div><b>Описание:</b> {item.descr}</div>
                        <div className="console_product-sizes"><b>Размеры:</b> {item.size.map(size => {
                                return (
                                    <div className="console_product-size">{size}</div>
                                )
                            })}
                        </div>
                        <div><b>Категория:</b> {item.category}</div>
                        <div className="console_product-imgwrapper">
                            <img className="console_product-img" src={`img/products/${item.id}/1.jpg`} alt="itemImg"></img>
                            <img className="console_product-img" src={`img/products/${item.id}/2.jpg`} alt="itemImg"></img>
                            <img className="console_product-img" src={`img/products/${item.id}/3.jpg`} alt="itemImg"></img>
                            <img className="console_product-img" src={`img/products/${item.id}/4.jpg`} alt="itemImg"></img>
                        </div>
                    </div>
                </div>
            )
        }

        const ProductEdit = () => {

            const onCloseEdit = () => {
                setOpenEdit(false)
            }
            
            return (
                <div className="console_product-wrapper" key={i}>
                    <Formik
                        initialValues = {{
                            id: item.id,
                            title: item.title,
                            descr: item.descr,
                            price: item.price,
                            size: item.size,
                            category: item.category
                        }}
                        onSubmit={values => {
                            const edited = ([...dataProducts.slice(0, item.id), values, ...dataProducts.slice(item.id + 1)])
                            setDataProducts(edited)
                            fetch(`https://6447fe3f7bb84f5a3e4f662e.mockapi.io/products/${item.id}`, {
                                method: 'PUT',
                                body: JSON.stringify(values),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8'
                                }
                            }).then(() => {
                                console.log('puted')
                            })
                        }}
                    >
                        <Form className="console_form">
                            <label htmlFor="title"><b>id:</b></label>
                            <Field
                                label="id:"
                                id="id" 
                                type="text" 
                                name="id" 
                                placeholder={item.id}
                            />
                            <label htmlFor="title"><b>Наименование:</b></label>
                            <Field
                                label="Наименование:"
                                id="title" 
                                type="text" 
                                name="title" 
                                placeholder={item.title}
                            />
                            <label htmlFor="title"><b>Описание:</b></label>
                            <Field
                                label="Описание:"
                                id="descr" 
                                type="text" 
                                name="descr" 
                                placeholder={item.descr}
                            />
                            <label htmlFor="title"><b>Цена:</b></label>
                            <Field
                                label="Цена:"
                                id="price" 
                                type="text" 
                                name="price" 
                                placeholder={item.price}
                            />
                            <label htmlFor="title"><b>Размеры:</b></label>
                            <div className="console_form-sizes" role="group" aria-labelledby="checkbox-group">
                                <label>
                                <Field type="checkbox" name="size" value="S" />
                                S
                                </label>
                                <label>
                                <Field type="checkbox" name="size" value="M" />
                                M
                                </label>
                                <label>
                                <Field type="checkbox" name="size" value="L" />
                                L
                                </label>
                                <label>
                                <Field type="checkbox" name="size" value="XL" />
                                XL
                                </label>
                            </div>
                            <label htmlFor="title"><b>Категория:</b></label>
                            <div className="console_form-category" role="group" aria-labelledby="my-radio-group">
                                <label>
                                <Field type="radio" name="category" value="new" />
                                Новинки
                                </label>
                                <label>
                                <Field type="radio" name="category" value="t-shirt" />
                                Футболки
                                </label>
                                <label>
                                <Field type="radio" name="category" value="hoodie" />
                                Худи
                                </label>
                            </div>
                            <div className="console_form-buttons">
                                <button style={{'background' : '#1B1F23'}} onClick={onCloseEdit} className="console_form-submit">Отменить</button>
                                <button className="console_form-submit" type="submit">Сохранить изменения</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            )
        }

        let content 
        if (openEdit) {
            content = <ProductEdit/>
        } else {
            content = <Product/>
        }

        return (
            <div className="console_product">
                {content}
                <button onClick={() => {onDeleteProduct(item.id)}} className={`console_product-button ${openWrapper ? 'activeshell' : ' '}`}>
                    <div className="line"></div>
                    <div className="line"></div>
                </button>
                <button onClick={onOpenEdit} className={`console_product-button ${openWrapper ? 'activeshell' : ' '}`}>
                            <img className="console_product-edit" src={edit} alt="edit"></img>
                </button>
            </div>
        )

    } 

    const ProductAdd = () => {
        return (
            <div className="console_product-wrapper">
                <Formik
                    initialValues = {{
                        id: '',
                        title: '',
                        descr: '',
                        price: '',
                        size: [],
                        category: ''
                    }}
                    onSubmit={values => {
                        setDataProducts([...dataProducts, values])
                        setButtonAddActive(!buttonAddActive)
                        fetch(`https://6447fe3f7bb84f5a3e4f662e.mockapi.io/products`, {
                            method: 'POST',
                            body: JSON.stringify(values),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        }).then(() => {
                            console.log('posted')
                        })
                    }}
                >
                    <Form className="console_form">
                        <label htmlFor="title"><b>id:</b></label>
                        <Field
                            label="id:"
                            id="id" 
                            type="text" 
                            name="id" 
                        />
                        <label htmlFor="title"><b>Наименование:</b></label>
                        <Field
                            label="Наименование:"
                            id="title" 
                            type="text" 
                            name="title" 
                        />
                        <label htmlFor="title"><b>Описание:</b></label>
                        <Field
                            label="Описание:"
                            id="descr" 
                            type="text" 
                            name="descr" 
                        />
                        <label htmlFor="title"><b>Цена:</b></label>
                        <Field
                            label="Цена:"
                            id="price" 
                            type="text" 
                            name="price" 
                        />
                        <label htmlFor="title"><b>Размеры:</b></label>
                        <div className="console_form-sizes" role="group" aria-labelledby="checkbox-group">
                            <label>
                            <Field type="checkbox" name="size" value="S" />
                            S
                            </label>
                            <label>
                            <Field type="checkbox" name="size" value="M" />
                            M
                            </label>
                            <label>
                            <Field type="checkbox" name="size" value="L" />
                            L
                            </label>
                            <label>
                            <Field type="checkbox" name="size" value="XL" />
                            XL
                            </label>
                        </div>
                        <label htmlFor="title"><b>Категория:</b></label>
                        <div className="console_form-category" role="group" aria-labelledby="my-radio-group">
                            <label>
                            <Field type="radio" name="category" value="new" />
                            Новинки
                            </label>
                            <label>
                            <Field type="radio" name="category" value="t-shirt" />
                            Футболки
                            </label>
                            <label>
                            <Field type="radio" name="category" value="hoodie" />
                            Худи
                            </label>
                        </div>
                        <div className="console_form-buttons">
                            <button onClick={onOpenAdd} style={{'background' : '#1B1F23'}} className="console_form-submit">Отменить</button>
                            <button className="console_form-submit" type="submit">Сохранить изменения</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        )
    }

    let data
    let addProduct

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

    if (buttonActive === 'products') {
        if (buttonAddActive) {
            addProduct = <ProductAdd/>
        } else {
            addProduct = <button onClick={onOpenAdd} style={{'width' : '650px', 'height' : '50px', 'borderRadius' : '20px'}} className="console_button">Добавить продукт</button>
        }
    }

    return (
        <div className="console_wrapper">
            <div onClick={handleChoose} className="console_buttons">
                <button id='orders' className="console_button">Заказы</button>
                <button id='products' className="console_button">Продукция</button>
            </div>
            <div className="console_items">
                {data}
                {addProduct}
            </div>
        </div>
    )
}

export default AdminConsole