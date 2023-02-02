import React from 'react';
import styled, {keyframes} from 'styled-components';

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const S = {
  Rotate: styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
  `,
  Image: styled.div`
    width: 100px;
    height: 100px;
    background: no-repeat center/cover url(${({ image }) => image});
  `,
};

const Rotate = props => (
  <S.Rotate {...props}>
    <S.Image image={props.image} />
  </S.Rotate>
);

export default Rotate;
