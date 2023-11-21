import styled from "styled-components";
import {IProduct, IProductBasket} from "../../Types/Catalog";
import {addToBasket} from "../../Store/Slice/Basket";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";

const Button = styled.button`
  width: 100%;
  padding: 11px 0 11px 0;
  border-radius: 12px;
  background: #F2F2F3;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  transition: .15s linear;
  &:hover {
    background: #FFAB08;
    color: #ffffff;
  }
  &:disabled {
    background: #F2F2F3;
    color: #ACACAC;
  }
  @media ${props => props.theme.media.tablet} {
    font-size: 12px;
  }
`

interface AddToBasketBtnProps {
    product: IProduct
    newCount?: number,
    disabled?: any
}

export const AddToBasketBtn = ({product, newCount, disabled}: AddToBasketBtnProps) => {
    const [error, setError] = useState(false)
    const {basket} = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const addToBasketFunction = (product:IProduct, newCount?:number) => {
        const data:IProductBasket = {
            ...product,
            count: newCount || 1
        }
        if (basket.products.length === 0) {
            dispatch(addToBasket(data))
        } else {
            setError(false)
            basket.products.map(i => {
                if (i.id === product.id) {
                    return setError(true)
                }
            })
            if (error === false) {
                dispatch(addToBasket(data))
                setError(false)
            }
        }
    }

    return (
        <Button disabled={disabled} onClick={() => addToBasketFunction(product, newCount)}>Добавить</Button>
    )
}