import styled from "styled-components";
import {BasketProduct} from "./BasketChildren";
import deliveryIco from './delivery.png'
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";
import {changeStateRequest, productCountDecrement, productCountIncrement} from "../../Store/Slice/Basket";
import {useEffect, useState} from "react";
import {MOrderModal} from "../OrderModal/OrderModal";
import {AnimatePresence, motion} from "framer-motion";

const Body = styled.div`
  padding: 24px 16px;
  max-width: 300px;
  width: 100%;
  border-radius: 18px;
  background: #ffffff;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #F2F2F3;
`

const Title = styled.h4`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
`

const ProductCount = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #000000;
  padding: 2px 16px;
  border-radius: 6px;
  background: #F2F2F3;
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

export const Basket = () => {
    const {basket} = useAppSelector(state => state)
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

    if (width <= 768) {
        return (
            <Body>
                <Header>
                    <Title>Корзина</Title>
                    <ProductCount>{basket.products.length}</ProductCount>
                </Header>
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
            </Body>
        )
    }

    return (
        <Body>
            <Header>
                <Title>Корзина</Title>
                <ProductCount>{basket.products.length}</ProductCount>
            </Header>
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
        </Body>
    )
}