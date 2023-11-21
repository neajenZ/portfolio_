import styled from "styled-components";
import burgerPicture from './burger.png'
import background from './top-circle.png'
import {motion} from "framer-motion";

const Body = styled(motion.div)`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 466px;
    background: url("${background}") top no-repeat;
    background-size: 2000px 466px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: -1;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  grid-gap: 37px;
  @media ${props => props.theme.media.tablet} {
    grid-gap: 10px;
  }
`

const Picture = styled.img`
  
`

const Info = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

const Title = styled(motion.h3)`
  color: #fff;
  font-size: 80px;
  font-weight: 800;
  line-height: 120%;
  margin-top: 46px;
  span {
    color: #FF5C00;
  }
  @media ${props => props.theme.media.tablet} {
    font-size: 36px;
  }
`

const Suptitle = styled(motion.h3)`
  margin-top: 50px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  span {
    font-weight: 600;
  }
  @media ${props => props.theme.media.tablet} {
    font-size: 12px;
    margin-top: 26px;
  }
`

const OrderAnimation = {
    hidden: {
        x: 150,
        opacity: 0
    },
    visible: (custom:number) => ({
        x: 0,
        opacity: 1,
        transition: {delay: custom * 0.1}
    })
}

export const MainDescription = () => {
    return (
        <Body
            initial='hidden'
            whileInView='visible'
            viewport={{once: true}}
        >
            <Wrapper>
                <Picture src={burgerPicture} alt=""/>
                <Info>
                    <Title
                        custom={1}
                        variants={OrderAnimation}
                    >
                        Только самые <br/> <span>сочные бургеры!</span></Title>
                    <Suptitle
                        custom={2}
                        variants={OrderAnimation}
                    >Бесплатная доставка от <span>599₽</span>
                    </Suptitle>
                </Info>
            </Wrapper>
        </Body>
    )
}