import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../redux/slices/cartSlice'

export default function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {

    const dispatch = useDispatch()

    const pizzaItem = useSelector(el => el.cartSlice.item)

    // console.log(pizzaItem);




    // const amountItems = pizzaItem.find(obj => obj.id === id)
    // let num = 0;
    // const amountPizzas = amountItems.ToArray.map(el => {
    // num += amountItems.count
    // })

    const typeNames = ['тонкое', 'традиционное']
    const [activeType, setActiveType] = useState(types[0])
    const [activeSize, setActiveSize] = useState(0)


    const amountItems = useSelector(el => el.cartSlice.item.find(obj => obj.id === id))

    // const [amountPizzas, setAmountPizzas] = React.useState(0)

    let amountPizzas = 0

    pizzaItem.map(el => {
        // setAmountPizzas(amountPizzas += el.count)
        if (el.id === id) {
            amountPizzas = amountPizzas + el.count
        }
    })

    function onCLickAdd() {
        const item = {
            id,
            title,
            price,
            imageUrl,
            sizes: sizes[activeSize],
            types: typeNames[activeType]
        }


        // console.log(item)
        dispatch(addItem(item))
    }

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {types.map(el => (<li key={el} onClick={() => setActiveType(el)} className={activeType === el ? 'active' : ' '} >{typeNames[el]}</li>))}
                </ul>
                <ul>
                    {sizes.map((el, i) => <li key={el} onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ' '} >{el} sm.</li>)}

                </ul>
            </div>
            <div className="pizza-block__bottom" onClick={onCLickAdd} >
                <div className="pizza-block__price">от {price} ₽</div>
                <button className="button button--outline button--add" >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {amountItems &&
                        <i>
                            {amountPizzas}
                        </i>
                    }
                </button>
            </div>
        </div>
    )
}
