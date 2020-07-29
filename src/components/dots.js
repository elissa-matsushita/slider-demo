import React from 'react';
import styled from 'styled-components';

const Dot = styled.span`
    // display: ${props => props.hide ? 'none' : 'block'};
    margin-right: 10px;
    cursor: pointer;
    height: 3px;
    width: 45px;
    background: #d8d8d8;
    &:before {
        position: absolute;
        display: block;
        content: " ";
        background: #4B286D;
        height: 3px;
        transition: ${props => props.active ? 'width 2s linear' : 'none'};
        width: ${props => props.active ? '45px' : '0px'};
    }
`;

const DotComponent = styled.div`
    position: absolute;
    bottom: 5%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dots = ({ slides, activeIndex, _slides }) => {
  return (
    <DotComponent>
    {slides.map((slide, i) => (
      <Dot key={slide} active={activeIndex - 2 === i || (activeIndex - 2 === i && slides.length - 1 === i)}  />
    ))}
  </DotComponent>
  )
};

export default Dots;