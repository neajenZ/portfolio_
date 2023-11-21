import styled from "styled-components";

const ChangeCountBtn = styled.button`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`

const Count = styled.span`
  margin: 0 15px 0 18px;
  color: #000000;
  font-size: 16px;
  font-weight: 400;
`

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 9px 12px;
  border-radius: 12px;
  background: #F2F2F3;
`

interface ProductCountProps {
    count?: number,
    incrementCount?: () => void,
    decrementCount?: () => void
}

export const ProductCount = ({count, decrementCount, incrementCount}:ProductCountProps) => {
    return (
        <Body>
            <ChangeCountBtn onClick={decrementCount}>-</ChangeCountBtn>
            <Count>{count}</Count>
            <ChangeCountBtn onClick={incrementCount}>+</ChangeCountBtn>
        </Body>
    )
}