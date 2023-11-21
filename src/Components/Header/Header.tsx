import logo from './logo.png'
import circle from './top-circle.png'
import styled from "styled-components";


const Background = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  z-index: -1;
  transform: translate(-50%, 0);
`

const HeaderBody = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
  img {
    user-select: none;
  }
`


export const Header = () => {
    return (
        <HeaderBody>
            <img src={logo} alt=""/>
            {/*<Background src={circle} alt=""/>*/}
        </HeaderBody>
    )
}