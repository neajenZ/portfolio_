import styled from "styled-components";
import {ProductCard} from "./ProductCard";
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxHooks";
import {useEffect, useRef, useState} from "react";
import {fetchBurgers} from "../../Store/Slice/Catalog";
import {CategoryNames, IProduct, IProductBasket} from "../../Types/Catalog";
import {addToBasket} from "../../Store/Slice/Basket";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const SectionName = styled.h4`
  font-size: 40px;
  font-weight: 600;
  color: #000;
  @media ${props => props.theme.media.tablet} {
    font-size: 28px;
  }
`

const ProductsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  grid-gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 24px;
  @media ${props => props.theme.media.tablet} {
    grid-gap: 20px;
    margin-top: 10px;
  }
`

enum links {
    BURGERS = 'burgers',
    ZAKUSKI = 'zakuski',
    HOT_DOGS = 'hot_dogs',
    COMBO = 'combo',
    SHAURMA = 'shaurma',
    PIZZA = 'pizza',
    WOK = 'wok',
    DESERTS = 'deserts',
    SOUCES = 'souces'
}


export const Catalog = () => {
    const [error, setError] = useState(false)
    const [categoryTitle, setCategoryTitle] = useState<CategoryNames>(CategoryNames.BURGERS)
    const [errorLength, setErrorLength] = useState(false)
    const {catalog, basket} = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const {pathname} = useLocation()
    const {id} = useParams()
    const redirectFunc = useNavigate()
    const requestFunction = () => {
        dispatch(fetchBurgers())
            if (pathname === '/') {
                setCategoryTitle(CategoryNames.BURGERS)
            }
    }
    const checkProducts = () => {
        const checkedProducts = basket.products.filter(item => item.typeProduct === categoryTitle)
        if (checkedProducts.length === 0) {
            return setErrorLength(true)
        } else {
            return setErrorLength(false)
        }
    }
    useEffect(() => {
        requestFunction()
    }, []);

    useEffect(() => {
        checkProducts()
        if (pathname === '/') {
            setCategoryTitle(CategoryNames.BURGERS)
        }
        switch (id) {
            case links.BURGERS:
                setCategoryTitle(CategoryNames.BURGERS)
                break;
            case links.ZAKUSKI:
                setCategoryTitle(CategoryNames.ZAKUSKI)
                break;
            case links.HOT_DOGS:
                setCategoryTitle(CategoryNames.HOT_DOGS)
                break;
            case links.COMBO:
                setCategoryTitle(CategoryNames.COMBO)
                break;
            case links.SHAURMA:
                setCategoryTitle(CategoryNames.SHAURMA)
                break;
            case links.PIZZA:
                setCategoryTitle(CategoryNames.PIZZA)
                break;
            case links.WOK:
                setCategoryTitle(CategoryNames.WOK)
                break;
            case links.DESERTS:
                setCategoryTitle(CategoryNames.DESERTS)
                break;
            case links.SOUCES:
                setCategoryTitle(CategoryNames.SOUCES)
                break;
            default:
                redirectFunc('/');
        }
    }, [id]);



    const addToBasketFunction = (product:IProduct) => {
        const data:IProductBasket = {
            ...product,
            count: 1
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

    if (catalog.isLoading === true) {
        return <div>Идёт загрузка...</div>
    }

    if (id === links.BURGERS) {
        return (
            <Body>
                <SectionName>{categoryTitle}</SectionName>
                <ProductsWrapper>
                    {
                        catalog.products.burgers.length === 0 ? 'К сожалению список пуст' :
                            catalog.products.burgers.map((product:IProduct) => (
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                    onclick={() => addToBasketFunction(product)}
                                />
                            ))
                    }
                </ProductsWrapper>
            </Body>
        )
    }

    if (id === links.ZAKUSKI) {
        return (
            <Body>
                <SectionName>{categoryTitle}</SectionName>
                <ProductsWrapper>
                    {
                        catalog.products.zakuski.length === 0 ? 'К сожалению список пуст' :
                        catalog.products.zakuski.map((product:IProduct) => (
                            <ProductCard
                                product={product}
                                key={product.id}
                                onclick={() => addToBasketFunction(product)}
                            />
                        ))
                    }
                </ProductsWrapper>
            </Body>
        )
    }

    if (id === links.HOT_DOGS) {
        return (
            <Body>
                <SectionName>{categoryTitle}</SectionName>
                <ProductsWrapper>
                    {
                        catalog.products.hotDogs.length === 0 ? 'К сожалению список пуст' :
                            catalog.products.hotDogs.map((product:IProduct) => (
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                    onclick={() => addToBasketFunction(product)}
                                />
                            ))
                    }
                </ProductsWrapper>
            </Body>
        )
    }

    if (id === links.COMBO) {
        return (
            <Body>
                <SectionName>{categoryTitle}</SectionName>
                <ProductsWrapper>
                    {
                        catalog.products.combo.length === 0 ? 'К сожалению список пуст' :
                            catalog.products.combo.map((product:IProduct) => (
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                    onclick={() => addToBasketFunction(product)}
                                />
                            ))
                    }
                </ProductsWrapper>
            </Body>
        )
    }

    if (id === links.PIZZA) {
        return (
            <Body>
                <SectionName>{categoryTitle}</SectionName>
                <ProductsWrapper>
                    {
                        catalog.products.pizza.length === 0 ? 'К сожалению список пуст' :
                            catalog.products.pizza.map((product:IProduct) => (
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                    onclick={() => addToBasketFunction(product)}
                                />
                            ))
                    }
                </ProductsWrapper>
            </Body>
        )
    }

    if (id === links.WOK) {
        return (
            <Body>
                <SectionName>{categoryTitle}</SectionName>
                <ProductsWrapper>
                    {
                        catalog.products.wok.length === 0 ? 'К сожалению список пуст' :
                            catalog.products.wok.map((product:IProduct) => (
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                    onclick={() => addToBasketFunction(product)}
                                />
                            ))
                    }
                </ProductsWrapper>
            </Body>
        )
    }

    if (id === links.SHAURMA) {
        return (
            <Body>
                <SectionName>{categoryTitle}</SectionName>
                <ProductsWrapper>
                    {
                        catalog.products.shawerma.length === 0 ? 'К сожалению список пуст' :
                            catalog.products.shawerma.map((product:IProduct) => (
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                    onclick={() => addToBasketFunction(product)}
                                />
                            ))
                    }
                </ProductsWrapper>
            </Body>
        )
    }

    if (id === links.SOUCES) {
        return (
            <Body>
                <SectionName>{categoryTitle}</SectionName>
                <ProductsWrapper>
                    {
                        catalog.products.souces.length === 0 ? 'К сожалению список пуст' :
                            catalog.products.souces.map((product:IProduct) => (
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                    onclick={() => addToBasketFunction(product)}
                                />
                            ))
                    }
                </ProductsWrapper>
            </Body>
        )
    }

    if (id === links.DESERTS) {
        return (
            <Body>
                <SectionName>{categoryTitle}</SectionName>
                <ProductsWrapper>
                    {
                        catalog.products.deserts.length === 0 ? 'К сожалению список пуст' :
                            catalog.products.deserts.map((product:IProduct) => (
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                    onclick={() => addToBasketFunction(product)}
                                />
                            ))
                    }
                </ProductsWrapper>
            </Body>
        )
    }

    return (
        <Body>
            <SectionName>{categoryTitle}</SectionName>
            <ProductsWrapper>
                {

                    catalog.products.burgers.map((product:IProduct) => (
                        <ProductCard
                            product={product}
                            key={product.id}
                            onclick={() => addToBasketFunction(product)}
                        />
                    ))
                }
            </ProductsWrapper>
        </Body>
    )
}