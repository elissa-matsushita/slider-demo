import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const RightArrowComponent = styled.div`
display: flex;
position: absolute;
top: 70%;
right: 15%;
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
  transform: translateX(2px);
  &:focus {
    outline: 0;
  }
}
`;

const RightArrow = ({ handleClick, lastSlide }) => (
  <RightArrowComponent onClick={handleClick} lastSlide={lastSlide}>
    <FontAwesomeIcon icon={faChevronRight} />
  </RightArrowComponent>
)

export default RightArrow;