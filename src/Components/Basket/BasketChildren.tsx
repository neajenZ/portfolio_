import styled from "styled-components";
import productPhoto from './1.png'
import {ProductCount} from "../ProductCount/ProductCount";
import {IProductBasket} from "../../Types/Catalog";
import {useAppDispatch} from "../../Hooks/reduxHooks";

const Body = styled.div`
  width: 100%;
  padding-bottom: 14px;
  border-bottom: 1px solid #f2f2f3;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CardPhoto = styled.img`
  border-radius: 8px;
  margin-right: 6px;
  max-width: 64px;
  width: 100%;
  height: 54px;
`

const ProductDesc = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

const ProductName = styled.h3`
  font-size: 12px;
  font-weight: 400;
  color: #000000;
`

const ProductWeight = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #B1B1B1;
  margin-top: 1px;
`

const ProductPrice = styled.h4`
  font-size: 12px;
  font-weight: 400;
  color: #000;
  margin-top: 6px;
`

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

interface BasketProductProps {
    product: IProductBasket
    incrementCount: () => void,
    decrementCount: () => void
}

export const BasketProduct = ({product, incrementCount, decrementCount}: BasketProductProps) => {

    return (
        <Body>
            <Wrapper>
                <CardInfo>
                    <CardPhoto src={`data:image;base64,${product.image}`} alt=""/>
                    <ProductDesc>
                        <ProductName>{product.name}</ProductName>
                        <ProductWeight>{product.weight}</ProductWeight>
                        <ProductPrice>{product.price}₽</ProductPrice>
                    </ProductDesc>
                </CardInfo>
                <ProductCount incrementCount={incrementCount} decrementCount={decrementCount} count={product.count} />
            </Wrapper>
        </Body>
    )
}