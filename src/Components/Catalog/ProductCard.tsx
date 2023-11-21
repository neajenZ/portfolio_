import styled from "styled-components";
import {MouseEventHandler, useState} from "react";
import {ProductModal} from "../ProductInfoModal/ProductModal";
import {ICompaundProduct, IProduct, IProductBasket} from "../../Types/Catalog";
import {useAppDispatch} from "../../Hooks/reduxHooks";
import {setProduct} from "../../Store/Slice/Basket";
import { AddToBasketBtn } from "../AddToBasketBtn/AddToBasketBtn";

const Card = styled.div`
  max-width: 300px;
  width: 100%;
  padding: 12px;
  border-radius: 18px;
  font-size: 0;
  background: #ffffff;
  @media ${props => props.theme.media.tablet} {  
    max-width: 145px;
    padding: 4px;
  }
`

const CardPhoto = styled.img`
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
`

const ProductDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 16px;
  @media ${props => props.theme.media.tablet} {
    margin-top: 10px;
  }
`

const ProductPrice = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  @media ${props => props.theme.media.tablet} {
    font-size: 16px;
  }
`

const ProductName = styled.h3`
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  margin-top: 8px;
  @media ${props => props.theme.media.tablet} {
    font-size: 12px;
    margin-top: 4px;
  }
`

const ProductWeight = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #B1B1B1;
  margin: 29px 0 8px 0;
  @media ${props => props.theme.media.tablet} {
    font-size: 12px;
  }
`

interface ProductCardProps {
    onclick: () => void,
    product: IProduct
}

export const ProductCard = ({product, onclick}:ProductCardProps) => {
    const dispatch = useAppDispatch()
    const [modal, setModal] = useState(false)

    const changeModalState = () => setModal(false)

    return (
        <>
            <Card>
                <CardPhoto onClick={() => {
                    setModal(true)
                    dispatch(setProduct(product))
                }} src={`data:image;base64,${product.image}`} alt=""/>
                <ProductDesc>
                    <ProductPrice>{product.price}₽</ProductPrice>
                    <ProductName>{product.name}</ProductName>
                    <ProductWeight onClick={() => console.log(product)}>{product.weight}</ProductWeight>
                </ProductDesc>
                    <AddToBasketBtn product={product} />
                {/*<AddToBasketBtn onClick={onclick}>Добавить</AddToBasketBtn>*/}
            </Card>
            {
                modal === true ?
                    <ProductModal changeModalState={changeModalState}
                    /> : null
            }
        </>
    )
}