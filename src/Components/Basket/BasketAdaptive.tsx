import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";
import {useEffect, useState} from "react";
import {changeStateRequest, productCountDecrement, productCountIncrement} from "../../Store/Slice/Basket";
import {BasketProduct} from "./BasketChildren";
import deliveryIco from "./delivery.png";
import {AnimatePresence} from "framer-motion";
import {MOrderModal} from "../OrderModal/OrderModal";
import styled from "styled-components";

const Body = styled.div`
  padding: 16px 10px;
  max-width: 145px;
  width: 100%;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  align-items: center;
  position: relative;
`

const Title = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  display: inline-block;
  margin-right: 27px;
  user-select: none;
`

const ProductCount = styled.span`
  font-size: 10px;
  font-weight: 400;
  color: #000000;
  padding: 1px 13px;
  border-radius: 6px;
  background: #F2F2F3;
  user-select: none;
`

const ProductWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  grid-gap: 16px;
  margin-top: 16px;
`

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
  span {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
  }
`

const PriceAll = styled.h4`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`

const CheckoutAllBtn = styled.button`
  width: 100%;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  padding: 11px 32px;
  border-radius: 12px;
  background: #FF7020;
  margin: 24px 0 10px 0;
  transition: .15s linear;
  &:hover {
    background: #FFAB08;
  }
  &:disabled {
    background: #F9F9F9;
    color: #ACACAC;
  }
`

const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  grid-gap: 8px;
  p {
    font-size: 12px;
    font-weight: 400;
    color: #000000;
  }
`

const SuccessModal = styled.div`
  max-width: 300px;
  width: 100%;
  padding: 12px;
  border-radius: 24px;
  background: #fff;
  position: fixed;
  top: 10%;
  left: 50%;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #23a42d;
  transform: translate(-50%, 0);
`

const HiddenContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 2;
`

export const BasketAdaptive = () => {
    const {basket} = useAppSelector(state => state)
    const [isHidden, setHidden] = useState(false)
    const dispatch = useAppDispatch()
    const [orderModal, setOrderModal] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        if (basket.isRequest === true) {
            setOrderModal(false)
            setTimeout(() => {
                dispatch(changeStateRequest())
                console.log('TIMEOUT')
            }, 5000)
        }
        console.log(width)
    }, [basket.isRequest]);

    return (
        <Body onClick={() => setHidden(!isHidden)}>
            <Title>Корзина</Title>
            <ProductCount>{basket.products.length}</ProductCount>
            {!isHidden ? null :
                <HiddenContainer>
                    <ProductWrapper>
                        {
                            basket.products.map((product) => (
                                <BasketProduct
                                    product={product}
                                    key={product.id}
                                    incrementCount={() => dispatch(productCountIncrement(product))}
                                    decrementCount={() => dispatch(productCountDecrement(product))}
                                />
                            ))
                        }
                    </ProductWrapper>
                    <PriceWrapper>
                        <span>Итого</span>
                        <PriceAll>{basket.allPrice}₽</PriceAll>
                    </PriceWrapper>
                    <CheckoutAllBtn disabled={basket.products.length === 0} onClick={() => setOrderModal(true)}>Оформить заказ</CheckoutAllBtn>
                    <DeliveryInfo ><img src={deliveryIco} alt=""/><p>Оформить заказ</p></DeliveryInfo>
                    { basket.isRequest === true ? <SuccessModal>Ваш заказ успешно оформлен!</SuccessModal> : null }
                    <AnimatePresence>
                        {
                            orderModal === true ?
                                <MOrderModal transition={{duration: 0.1}} animate={{scale: 1}} initial={{scale: 0}} exit={{scale: 0}} changeStateModal={() => setOrderModal(false)} />
                                : null
                        }
                    </AnimatePresence>
                </HiddenContainer>
            }
        </Body>
    )

}