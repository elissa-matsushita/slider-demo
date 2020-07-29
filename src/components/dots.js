import React from 'react';
import styled from 'styled-components';

const Dot = styled.span`
    margin-right: 10px;
    cursor: pointer;
    height: 3px;
    width: 45px;
    background: ${props => props.active ? '#4B286D' : '#D8D8D8'};
`;

const DotComponent = styled.div`
    position: absolute;
    bottom: 5%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dots = ({ slides, activeIndex }) => (
  <DotComponent>
    {slides.map((slide, i) => (
      <Dot key={slide} active={activeIndex === i} />
    ))}
  </DotComponent>
)

export default Dots;