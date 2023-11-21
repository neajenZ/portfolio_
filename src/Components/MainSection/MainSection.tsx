import styled from "styled-components";
import {Basket} from "../Basket/Basket";
import {Catalog} from "../Catalog/Catalog";
import {useState} from "react";
import {BasketAdaptive} from "../Basket/BasketAdaptive";


const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  grid-gap: 30px;
  @media ${props => props.theme.media.tablet} {
    flex-direction: column;
  }
`

export const MainSection = () => {
    const [width, setWidth] = useState(window.innerWidth)
        return (
        <Wrapper>
            {
                width <= 768 ?
                    <BasketAdaptive /> :
                    <Basket />
            }

            <Catalog />
        </Wrapper>
    )
}