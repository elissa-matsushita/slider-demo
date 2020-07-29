import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const LeftArrowComponent = styled.div`
display: flex;
position: absolute;
top: 70%;
left: 15%;
height: 50px;
width: 50px;
justify-content: center;
background: white;
border-radius: 50%;
border: 1px solid black;
cursor: pointer;
align-items: center;
transition: transform ease-in 0.1s;
&:hover {
  transform: scale(1.1);
}
i {
  transform: translateX(-2px);
  &:focus {
    outline: 0;
  }
}
`;

const LeftArrow = ({ handleClick, firstSlide }) => (
  <LeftArrowComponent onClick={handleClick} firstSlide={firstSlide}>
     <FontAwesomeIcon icon={faChevronLeft} />
  </LeftArrowComponent>
)

export default LeftArrow;