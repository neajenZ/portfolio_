import styled from "styled-components";
import {ProductCount} from "../ProductCount/ProductCount";
import {AddToBasketBtn} from "../AddToBasketBtn/AddToBasketBtn";
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";
import {useEffect, useState} from "react";
import {productCountDecrement, productCountIncrement} from "../../Store/Slice/Basket";
import {ModalLayout} from "../ModalLayout/ModalLayout";
import {IProductBasket} from "../../Types/Catalog";

const ProductName = styled.h3`
  font-size: 40px;
  font-weight: 600;
  color: #000000;
`

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 24px;
  grid-gap: 16px;
`

const ProductDescription = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

const ProductPhoto = styled.img`
  border-radius: 16px;
`

const ProductText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`

const ProductCompaund = styled(ProductDescription)`
  color: #000000;
  font-size: 12px;
  margin: 10px 0 4px 0;
  h4 {
    font-weight: 600;
  }
`

const CompaundItem = styled.h4`
  font-weight: 400;
`

const LeftWrapper = styled.div`
  max-width: 276px;
  width: 100%;
`

const ProductWeight = styled.span`
  font-size: 12px;
  margin-top: 4px;
  font-weight: 400;
  color: #B1B1B1;
`

const ProductFooter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
`

const ButtonWrapper = styled(ProductWrapper)`
  justify-content: flex-start;
  grid-gap: 16px;
  margin-top: 0;
`

const Price = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
`

interface ProductModalProps {
    changeModalState: () => void,
}

export const ProductModal = ({changeModalState}:ProductModalProps) => {
    const dispatch = useAppDispatch()
    const {basket} = useAppSelector(state => state)
    const [countProduct, setProductCount] = useState(0)
    const [newProductCount, setNewProductCount] = useState<number>(0)
    const [productPrice, setProductPrice] = useState(basket.isProduct.price)

    const decrementNewCount = () => {
        if (newProductCount === 0) {
            return null
        }
        setNewProductCount(newProductCount - 1)
    }

    let comp:any[] = []
    for (let key in basket.isProduct.compaund) {
        if (!key) {
        } else {
            switch (key) {
                case 'productId':

                    break;
                case 'id':

                    break;
                default:
                    const value = basket.isProduct.compaund[key]
                    comp.push(value)
            }
        }
    }

    useEffect(() => {
        if (basket.products.length === 0) {
            setProductCount(0)
            setNewProductCount(0)
        }
        console.log(basket.isProduct)
        if (basket.isProduct.count === 0) {
            setProductCount(0)
        }
        basket.products.map(i => {
            if (i.id === basket.isProduct.id) {
                setProductCount(i.count)
                console.log(countProduct)
            }
        })
    }, [basket.products]);

    if (countProduct === 0) {
        return (
            <ModalLayout changeModalState={changeModalState}>
                <ProductName>{basket.isProduct.name}</ProductName>
                <ProductWrapper>
                    <LeftWrapper>
                        <ProductPhoto src={`data:image;base64,${basket.isProduct.image}`} alt=""/>
                    </LeftWrapper>
                    <ProductDescription>
                        <ProductText>{basket.isProduct.descProduct}</ProductText>
                        <ProductCompaund>
                            <h4>Состав:</h4>
                            <ProductDescription>
                                {
                                    comp.map(i => (
                                        <CompaundItem>{i}</CompaundItem>
                                    ))
                                }
                            </ProductDescription>
                        </ProductCompaund>
                        <ProductWeight>{basket.isProduct.weight}, ккал {basket.isProduct.kcal}</ProductWeight>
                    </ProductDescription>
                </ProductWrapper>
                <ProductFooter>
                    <ButtonWrapper>
                        <AddToBasketBtn disabled={countProduct > 0} newCount={newProductCount} product={basket.isProduct} />
                        <ProductCount
                            incrementCount={() => setNewProductCount(newProductCount + 1)}
                            decrementCount={() => decrementNewCount()}
                            count={newProductCount} />
                    </ButtonWrapper>
                    <Price>{newProductCount === 0 ? productPrice : productPrice * newProductCount}₽</Price>
                </ProductFooter>
            </ModalLayout>
        )
    }

    return (
        <ModalLayout changeModalState={changeModalState}>
            <ProductName>{basket.isProduct.name}</ProductName>
            <ProductWrapper>
                <LeftWrapper>
                    <ProductPhoto src={`data:image;base64,${basket.isProduct.image}`} alt=""/>
                </LeftWrapper>
                <ProductDescription>
                    <ProductText>{basket.isProduct.descProduct}</ProductText>
                    <ProductCompaund>
                        <h4>Состав:</h4>
                        <ProductDescription>
                            {
                                comp.length === 0 ? 'Секрет нашей компании' :
                                comp.map(i => (
                                    <CompaundItem>{i}</CompaundItem>
                                ))
                            }
                        </ProductDescription>
                    </ProductCompaund>
                    <ProductWeight>{basket.isProduct.weight}, ккал {basket.isProduct.kcal}</ProductWeight>
                </ProductDescription>
            </ProductWrapper>
            <ProductFooter>
                <ButtonWrapper>
                    <AddToBasketBtn disabled={countProduct > 0} product={basket.isProduct} />
                    <ProductCount
                        incrementCount={() => dispatch(productCountIncrement(basket.isProduct))}
                        decrementCount={() => dispatch(productCountDecrement({...basket.isProduct, count: countProduct}))}
                        count={countProduct} />
                </ButtonWrapper>
                <Price>{countProduct === 0 ? productPrice : productPrice * countProduct}₽</Price>
            </ProductFooter>
        </ModalLayout>
    )
}