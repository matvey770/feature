import {React, useState} from 'react';

import './singleItemLayout.scss'

import merch from '../../img/merch/merch_item_1.png'

const SingleItemLayout = () => {

    const TabsContent = () => {

        const [tabsClass, setTabsClass] = useState([true, false, false, false])

        const tabContent = ['Описание', 'Доставка', 'Оплата', 'Возврат']

        const Button = ({id, tabClass, tabContent}) => {
            return (
                <button id={id} className={`singleitem_tabs-button ${tabClass ? "is-active " : ""}`}>{tabContent}</button>
            )
        }

        let itemContent = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus semper enim. Vivamus interdum egestas metus vel ultricies. Nam venenatis diam id ultrices tincidunt. Nam dolor ex, porttitor ac mi ut, feugiat mollis tellus. Nam porttitor aliquam leo ultricies egestas. Cras interdum enim augue, ut pharetra neque feugiat sit amet. In ut dui nec metus ullamcorper bibendum non quis urna. Nam in cursus libero. Cras malesuada erat sit amet gravida sollicitudin. Nunc id lacus ut ligula molestie aliquet. Cras imperdiet tellus velit, et tincidunt orci viverra a. Aenean auctor id orci convallis sodales. Nullam dignissim elit vel tellus ullamcorper, eget ullamcorper velit sagittis. Quisque pretium elit sed aliquet sollicitudin.', 'Donec auctor mattis est non rhoncus. Praesent sit amet lectus nunc. Integer ultrices ex mauris, nec imperdiet neque malesuada eget. Curabitur vel pellentesque augue. Phasellus vitae placerat ipsum, vel bibendum arcu. Curabitur ultrices, ligula et convallis tristique, nisi tortor placerat sem, sit amet sagittis nisl lorem quis arcu. Proin scelerisque risus quam. Pellentesque eu risus suscipit ante varius efficitur sit amet quis justo. Morbi eu urna risus. Donec quis libero nec nisl lacinia blandit sed fringilla arcu. Curabitur at lacinia justo.', 'Nulla facilisi. Curabitur sit amet mattis quam. Nulla facilisi. Aenean leo tortor, feugiat nec metus a, tincidunt ullamcorper risus. Morbi in lectus nibh. Aenean ultrices lorem turpis. Cras aliquet ut erat iaculis hendrerit. Pellentesque tincidunt porttitor interdum.', 'Donec feugiat nisl id quam sagittis tincidunt. Nullam facilisis blandit enim non ultrices. Integer nec mauris rutrum tellus molestie mollis ut et lectus. Vestibulum sagittis luctus lorem sed volutpat. Duis finibus pretium sem id posuere. Aenean ut aliquet tellus. Aliquam vel leo quis sem elementum auctor sed ac tellus. Morbi maximus, odio a hendrerit gravida, ligula lectus convallis felis, quis tristique nisl orci lobortis dolor. Vestibulum volutpat et ex et commodo. In accumsan placerat ante, vel congue ligula tincidunt quis.']

        const TabContent = ({tabClass, itemContent}) => {
            return (
                <div className={`singleitem_content-item ${tabClass ? "is-activecontent" : ""}`}>
                    {itemContent}
                </div>
            )
        }

        const idClick = (event) => {
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
    
    return (
        <div className="singleitem">
            <div className="singleitem__wrapper">
                <div className="singleitem_container">
                    <img className="singleitem_container-img" src={merch} alt='img 1'></img>
                    <img className="singleitem_container-img" src={merch} alt='img 2'></img>
                    <img className="singleitem_container-img" src={merch} alt='img 3'></img>
                    <img className="singleitem_container-img" src={merch} alt='img 4'></img>
                </div>
                <div className="singleitem__descr">
                    <div className="singleitem_label">
                        <div className="singleitem_label-feature">FEATURE</div>
                        <div className="singleitem_label-wrapper">
                            <div className="singleitem_label-name">Футболка BEST VIBE</div>
                            <div className="singleitem_label-price">6 890 р</div>
                        </div>
                    </div>
                    <div className="singleitem_sizes">
                        <button className="singleitem_sizes-sizebutton">S</button>
                        <button className="singleitem_sizes-sizebutton">M</button>
                        <button className="singleitem_sizes-sizebutton">L</button>
                        <button className="singleitem_sizes-sizebutton">XL</button>
                    </div>
                    <button className="singleitem-add">Добавить в корзину</button>
                    <TabsContent/>
                </div>
            </div>
        </div>
    )
}

export default SingleItemLayout