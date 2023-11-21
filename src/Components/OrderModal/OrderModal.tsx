import styled from "styled-components";
import closeIco from './close.svg'
import donutPicture from './donutPicture.png'
import {forwardRef, useState} from "react";
import styles from './OrderModal.module.css'
import {useInput} from "../../Hooks/useInput";
import {IRequestProduct, OrderRequestForm, PeopleForm} from "../../Types/OrderForm";
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";
import {SendFormOrder} from "../../Store/Slice/Basket";
import {IProductBasket} from "../../Types/Catalog";
import {motion} from "framer-motion";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.80) center no-repeat;
  display: flex;
  z-index: 1000;
  align-items: center;
  justify-content: center;
`

const ModalBody = styled.div`
  max-width: 684px;
  width: 100%;
  border-radius: 24px;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: row;
`

const CloseModalBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
`

const BackgroundPicture = styled.div`
  flex-basis: 50%;
  border-radius: 24px;
  background: #FFAB08;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: url('${donutPicture}') center no-repeat;
  }
`

const Sidebar = styled.div`
  padding: 44px 24px 24px;
  box-sizing: border-box;
  flex-basis: 50%;
`

const SidebarTitle = styled.h4`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
`

const OrderFormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

const InputWrapper = styled(OrderFormContainer)`
  margin-top: 16px;
  grid-gap: 8px;
  width: 100%;
`

const InputInner = styled(InputWrapper)`
  margin-top: 0;
  flex-direction: row;
  input {
    width: 50%;
  }
`

const SendFormBtn = styled.button`
  width: 100%;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  padding: 11px 32px;
  border-radius: 12px;
  background: #FF7020;
  margin-top: 32px;
  transition: .15s linear;
  &:hover {
    background: #FFAB08;
  }
  &:disabled {
    background: #F9F9F9;
    color: #ACACAC;
  }
`

const OrderInput = styled.input`
  box-sizing: border-box;
  max-width: 100%;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  padding: 12px;
  outline: none;
  border: 1px solid #B1B1B1;
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
  font-weight: 400;
  &:hover {
    border: 1px solid #FFAB08;
  }
  &:active {
    border: 1px solid #FFAB08;
  }
  &:focus {
    border: 1px solid #FFAB08;
  }
  &::placeholder {
    color: #B1B1B1;
  }
`

const NumberPhoneInput = styled(OrderInput)`
  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
  }
`

const RadioBtnWrapper = styled(OrderFormContainer)`
  margin-top: 16px;
  grid-gap: 12px;
`

const ErrorMessage = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #ec1f1f;
`

interface OrderModalState {
    changeStateModal: () => void,
}


const OrderModal = forwardRef(({changeStateModal}:OrderModalState, ref: any) => {
    const dispatch = useAppDispatch()
    const {basket} = useAppSelector(state => state)
    const [typeDelivery, setTypeDelivery] = useState('Самовывоз')
    const nameInput = useInput('', {isEmpty: true, minLength: 2, maxLength: 15})
    const numberInput = useInput('', {isEmpty: true, minLength: 11, maxLength: 11})
    const streetInput = useInput('', {isEmpty: true, minLength: 3, maxLength: 35})
    const floorInput = useInput('', {isEmpty: true, minLength: 1, maxLength: 2})
    const intercomInput = useInput('', {isEmpty: true, minLength: 1, maxLength: 4})

    const requestOrder = () => {
        const productList:IRequestProduct[] = structuredClone(basket.products)
        productList.map(i => {
            delete i.image
            delete i.compaund
            delete i.kcal
            delete i.weight
            delete i.name
            delete i.descProduct
            delete i.price
        })
        const formPeople:PeopleForm = {
            floor: floorInput.value,
            intercom: intercomInput.value,
            typeDelivery: typeDelivery,
            name: nameInput.value,
            number: Number(numberInput.value),
            street: streetInput.value
        }
        const requestForm:OrderRequestForm = {
            infoPeople: formPeople,
            productList: productList,
            allPrice: basket.allPrice
        }
        dispatch(SendFormOrder(requestForm))
    }

    return (
        <Background>
            <ModalBody ref={ref}>
                <CloseModalBtn onClick={changeStateModal}><img src={closeIco} alt=""/></CloseModalBtn>
                <BackgroundPicture></BackgroundPicture>
                <Sidebar>
                    <SidebarTitle>Доставка</SidebarTitle>
                    <OrderFormContainer>
                        <InputWrapper>
                            { (nameInput.isDirty && nameInput.minLengthError) && <ErrorMessage>Минимальная длина: 2 символа</ErrorMessage> }
                            { (nameInput.isDirty && nameInput.maxLengthError) && <ErrorMessage>Максимальная длина: 15 символов</ErrorMessage> }
                            <OrderInput value={nameInput.value} onChange={(e) => nameInput.onChange(e)} onBlur={() => nameInput.onBlur()} placeholder={'Ваше имя'} type="text"/>
                            { (numberInput.isDirty && numberInput.minLengthError) && <ErrorMessage>Минимальная длина: 4 символа</ErrorMessage> }
                            { (numberInput.isDirty && numberInput.maxLengthError) && <ErrorMessage>Максимальная длина: 12 символов</ErrorMessage> }
                            <NumberPhoneInput maxLength={11} value={numberInput.value} onChange={(e) => numberInput.onChange(e)} onBlur={() => numberInput.onBlur()} placeholder={'Телефон'}/>
                        </InputWrapper>
                        <RadioBtnWrapper>
                            <div>
                                <input className={styles.customRadio} checked={typeDelivery === 'Самовывоз' ? true : false} type="radio" value={'Самовывоз'}/>
                                <label onClick={() => setTypeDelivery('Самовывоз')}>Самовывоз</label>
                            </div>
                            <div>
                                <input className={styles.customRadio} checked={typeDelivery === 'Доставка' ? true : false} type="radio" value={'Доставка'}/>
                                <label onClick={() => setTypeDelivery('Доставка')}>Доставка</label>
                            </div>
                        </RadioBtnWrapper>
                        <InputWrapper onClick={() => console.log(typeDelivery)}>
                            { (streetInput.isDirty && streetInput.minLengthError) && <ErrorMessage>Минимальная длина: 3 символа</ErrorMessage> }
                            { (streetInput.isDirty && streetInput.maxLengthError) && <ErrorMessage>Максимальная длина: 35 символов</ErrorMessage> }
                            <OrderInput value={streetInput.value} onChange={(e) => streetInput.onChangeWithoutSpace(e)} onBlur={() => streetInput.onBlur()} placeholder={'Улица, дом, квартира'} type="text"/>
                            { (intercomInput.isDirty && intercomInput.isEmpty) && <ErrorMessage>Поле не может быть пустым</ErrorMessage> }
                            { (intercomInput.isDirty && intercomInput.maxLengthError) && <ErrorMessage>Максимальная длина: 35 символов</ErrorMessage> }
                            { (floorInput.isDirty && floorInput.isEmpty) && <ErrorMessage>Поле не может быть пустым</ErrorMessage> }
                            { (floorInput.isDirty && floorInput.maxLengthError) && <ErrorMessage>Максимальная длина: 2 символа</ErrorMessage> }
                            <InputInner onClick={() => console.log(typeDelivery)}>
                                <OrderInput value={floorInput.value} onChange={(e) => floorInput.onChange(e)} onBlur={() => floorInput.onBlur()} placeholder={'Этаж'} type="text"/>

                                <OrderInput value={intercomInput.value} onChange={(e) => intercomInput.onChange(e)} onBlur={() => intercomInput.onBlur()} placeholder={'Домофон'} type="text"/>
                            </InputInner>
                        </InputWrapper>
                        <SendFormBtn onClick={requestOrder} disabled={basket.isLoading || !nameInput.validInput || !numberInput.validInput || !floorInput.validInput || !streetInput.validInput || !intercomInput.validInput}>Оформить</SendFormBtn>
                    </OrderFormContainer>
                </Sidebar>
            </ModalBody>
        </Background>
    )
})

export const MOrderModal = motion(OrderModal)