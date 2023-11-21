import styled from "styled-components";
import burgerIco from './Icons/burgers.png'
import {Link} from "react-router-dom";

const Body = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: row;
  grid-gap: 24px;
  margin: 112px 0 50px 0;
  @media ${props => props.theme.media.tablet} {
    grid-gap: 12px; 
  }
`

const Button = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  background: #fff;
  border-radius: 50px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  flex-direction: row;
  grid-gap: 8px;
  border: 1px solid transparent;
  transition: .15s linear;
  text-decoration: none;
  &:hover {
    border: 1px solid #F86310;
  }
  &:active {
    background: #FFAB08;
    border: 1px solid transparent;
  }
  &:focus {
    background: #FFAB08;
    border: 1px solid transparent;
  }
  @media ${props => props.theme.media.tablet} {
    font-size: 12px;
    padding: 4px 8px;
  }
`

export const CatalogNav = () => {
    return (
        <Body>
            <Button to={'/category/burgers'}><img src={burgerIco} alt=""/>Бургеры</Button>
            <Button to={'/category/zakuski'}><img src={burgerIco} alt=""/>Закуски</Button>
            <Button to={'/category/hot_dogs'}><img src={burgerIco} alt=""/>Хот-доги</Button>
            <Button to={'/category/combo'}><img src={burgerIco} alt=""/>Комбо</Button>
            <Button to={'/category/shaurma'}><img src={burgerIco} alt=""/>Шаурма</Button>
            <Button to={'/category/pizza'}><img src={burgerIco} alt=""/>Пицца</Button>
            <Button to={'/category/wok'}><img src={burgerIco} alt=""/>Вок</Button>
            <Button to={'/category/deserts'}><img src={burgerIco} alt=""/>Десерты</Button>
            <Button to={'/category/souces'}><img src={burgerIco} alt=""/>Соусы</Button>
        </Body>
    )
}