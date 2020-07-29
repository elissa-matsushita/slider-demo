import React from 'react';
import styled from 'styled-components';

const SliderContent = styled.div`
    transform: translateX(-${props => props.translate}px);
    transition: transform ease-out ${props => props.transition}s;
    height: 100%;
    width: ${props => props.width}px;
    display: flex;
    margin: 0 ${props => props.margin}px;
`;

export default SliderContent;