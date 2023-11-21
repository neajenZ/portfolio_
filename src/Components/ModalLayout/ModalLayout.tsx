import styled from "styled-components";
import closeIco from './close.svg'
import {ReactElement, ReactNode} from "react";

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
  padding: 36px 24px;
  border-radius: 24px;
  background: #fff;
  position: relative;
`

const CloseModalBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
`

interface ModalLayoutProps {
    children: React.ReactNode,
    changeModalState: () => void
}

export const ModalLayout = ({children, changeModalState}:ModalLayoutProps) => {

    return (
        <Background>
            <ModalBody>
                <CloseModalBtn onClick={changeModalState}><img src={closeIco} alt=""/></CloseModalBtn>
                {children}
            </ModalBody>
        </Background>
    )
}