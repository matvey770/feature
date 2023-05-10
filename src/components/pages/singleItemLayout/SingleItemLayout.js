import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import FeatureFooter from '../../featureFooter/FeatureFooter';
import FeatureHeader from '../../featureHeader/FeatureHeader';

import './singleItemLayout.scss'

import merch from '../../../img/merch/merch_item_1.png'
import Spinner from '../../spinner/Spinner';

const SingleItemLayout = ({onAdd, cart, addedItem}) => {

    const {id} = useParams(); //получение id через router hook для получения отдельного item 
    const [dataSingleItem, setDataSingleItem] = useState([])
    const [status, setStatus] = useState('idle')

    const [showImg, setShowImg] = useState('')

    useEffect(() => {
        const fetchData = async () => { //СДЕЛАТЬ ЧЕРЕЗ HTTP.HOOK
            setStatus('fetching');
            const response = await fetch(`https://6447fe3f7bb84f5a3e4f662e.mockapi.io/products`);
            const dataSingleItem = await response.json();
            setDataSingleItem(dataSingleItem[id-1]);
            setStatus('fetched');
        };
    
        fetchData();
        console.log(id)
        console.log(dataSingleItem)
    }, [])

    const {title, img, descr, price, size} = dataSingleItem

    const TabsContent = () => {

        const [tabsClass, setTabsClass] = useState([true, false, false, false])

        const tabContent = ['Описание', 'Доставка', 'Оплата', 'Возврат']

        const Button = ({id, tabClass, tabContent}) => {
            return (
                <button id={id} className={`singleitem_tabs-button ${tabClass ? "is-active" : ""}`}>{tabContent}</button>
            )
        }

        let itemContent = [`${descr}`, 'Donec auctor mattis est non rhoncus. Praesent sit amet lectus nunc. Integer ultrices ex mauris, nec imperdiet neque malesuada eget. Curabitur vel pellentesque augue. Phasellus vitae placerat ipsum, vel bibendum arcu. Curabitur ultrices, ligula et convallis tristique, nisi tortor placerat sem, sit amet sagittis nisl lorem quis arcu. Proin scelerisque risus quam. Pellentesque eu risus suscipit ante varius efficitur sit amet quis justo. Morbi eu urna risus. Donec quis libero nec nisl lacinia blandit sed fringilla arcu. Curabitur at lacinia justo.', 'Nulla facilisi. Curabitur sit amet mattis quam. Nulla facilisi. Aenean leo tortor, feugiat nec metus a, tincidunt ullamcorper risus. Morbi in lectus nibh. Aenean ultrices lorem turpis. Cras aliquet ut erat iaculis hendrerit. Pellentesque tincidunt porttitor interdum.', 'Donec feugiat nisl id quam sagittis tincidunt. Nullam facilisis blandit enim non ultrices. Integer nec mauris rutrum tellus molestie mollis ut et lectus. Vestibulum sagittis luctus lorem sed volutpat. Duis finibus pretium sem id posuere. Aenean ut aliquet tellus. Aliquam vel leo quis sem elementum auctor sed ac tellus. Morbi maximus, odio a hendrerit gravida, ligula lectus convallis felis, quis tristique nisl orci lobortis dolor. Vestibulum volutpat et ex et commodo. In accumsan placerat ante, vel congue ligula tincidunt quis.']

        const TabContent = ({tabClass, itemContent}) => {
            return (
                <div className={`singleitem_content-item ${tabClass ? "is-activecontent" : ""}`}>
                    {itemContent}
                </div>
            )
        }

        const idClick = (event) => {  // функция и два компонента выше - для кнопок описания, доставки и тд
            const id = event.target.id
            let tab = tabsClass.map(item => {
                item = false
            })
            tab[id] = true
            setTabsClass(tab)
            console.log(tabsClass)
        }

        return (
            <div className="singleitem_tabs">
                <div className="singleitem_tabs_container" onClick={idClick}>
                    {tabContent.map((item, i) => {
                        return (<Button id={i} tabClass={tabsClass[i]} tabContent={item}/>)
                    })}
                </div>
                <div className="singleitem_content">
                    {itemContent.map((item, i) => {
                        return (<TabContent tabClass={tabsClass[i]} itemContent={item}/>)
                    })}
                    {/* <div className="singleitem_content-item">
                        • Внешний материал обладает бархатным эффектом  <p/>
                        • Фирменная ZIP упаковка <p/>
                        • Слегка зауженные манжеты <p/>
                        • Боковые карманы <p/>
                        • Водостойкое DWR-покрытие <p/>
                        • Внутренний карман <p/>
                        • Карман на рукаве <p/>
                        • Покрой оверсайз <p/>
                        • Сделано в России на собственной мануфактуре FEATURE <p/>

                        <b>Материал:</b> Верх - 100% нейлон; Подкладка - 100% нейлон; Наполнитель - 98% полиэстер, 2% овечья шерсть <p/>
                        <b>Уход:</b> Химчистка <p/>
                        <b>Температурный режим:</b> от +0°С до 15°С  
                    </div> */}
                </div>
            </div>
        )
    }

    const SizeRow = () => {

        const sizesClass = []
        const sizes = ["S", "M", "L", "XL"]

        const [activeChoose, setActiveChoose] = useState([false, false, false, false]);
        const [sizeItem, setSizeItem] = useState('')
        const [chooseSize, setChooseSize] = useState(false)

        useEffect(() => { //таймер "сначала выберите размер"
            if (chooseSize) {
              setTimeout(() => {
                setChooseSize(false)
              }, 3000)
            }
          }, [chooseSize])

        const intersect = () => {
            for (let i = 0; i < sizes.length; i++) {
                sizesClass[i] = size.includes(sizes[i])
            }
        }
        
        const idClick = (event) => {
            const id = event.target.id
            let choose = activeChoose.map(item => {
                item = false
            })
            choose[id] = true
            setActiveChoose(choose)
        }

        const onClickSizeButton = (event) => {
                setSizeItem(event.currentTarget.textContent)
        }

        const addedItemFunc = () => {
                if (!sizeItem) {
                    setChooseSize(true)
                } else {
                    onAdd(Number(id), title, img, descr, price, sizeItem)
                }
        }

        if (status === "fetched") {intersect()}

        let buttonContent = 'Добавить в корзину'
        if (chooseSize) {
            buttonContent = 'Сначала выберите размер'
        } else if (addedItem) {
            buttonContent = 'Товар добавлен в корзину'
        }

        return (
            <>
                <div className="singleitem_sizes" onClick={idClick}>
                    {sizes.map((item, i) => {
                        return (
                            <button 
                                disabled={!sizesClass[i]} 
                                id={i} 
                                key={item} 
                                onClick={onClickSizeButton} 
                                className={`singleitem_sizes-sizebutton ${sizesClass[i] ? 'is-activesize' : ''} 
                                ${activeChoose[i] ? 'is-choosedsize' : ''}`}>
                                    {item}
                            </button>
                        )
                    })}
                </div>
                <button 
                    onClick={() => {addedItemFunc()}} 
                    className={`singleitem-add ${chooseSize ? 'choose' : ''} ${addedItem ? 'added' : ''}`}>
                        {buttonContent}
                </button>
            </>
        )
    }

    const ImgContainer = () => {

        const onShowImg = (event) => {
            const id = event.target.id
            setShowImg(id)
            console.log(showImg)
        }


        return (
            <div onClick={onShowImg} className="singleitem_container">
                {img.map((item, i) => {
                    return (
                        <img id={i} className="singleitem_container-img" src={item} alt='img 1'></img>
                    )
                })}
            </div>
        )
    }

    const BigImg = () => {
        const onExitImg = () => {
            setShowImg('')
        }
        return (
            <div onClick={onExitImg} className='big_wrapper'>
                {/* <button onClick={onExitImg} className='big_exit'>X</button> */}
                <img className="big_img" src={img[showImg]} alt='img'></img>
            </div>
        )
    }
    
    if (status === 'fetched') {
        return (
            <>
            <FeatureHeader cart={cart}/>
            <div className="singleitem">
                {showImg ? <BigImg/> : null}
                <div className="singleitem__wrapper">
                    <ImgContainer/>
                    <div className="singleitem__descr">
                        <div className="singleitem_label">
                            <div className="singleitem_label-feature">FEATURE</div>
                            <div className="singleitem_label-wrapper">
                                <div className="singleitem_label-name">{title}</div>
                                <div className="singleitem_label-price">{price} p</div>
                            </div>
                        </div>
                        <SizeRow/>
                        <TabsContent/>
                    </div>
                </div>
            </div>
            <FeatureFooter/>
            </>
        )
    } else {
        return (
            <Spinner/>
        )
    }
}

export default SingleItemLayout