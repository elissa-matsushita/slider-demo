import React from 'react'
import styled from 'styled-components';

const Image = styled.div`
    height: 70%;
    width: 100%;
    width: ${props => props.isActive ? '100%' : '100%'};
    background-image: url('${props => props.content}');
    opacity: ${props => props.isActive ? '1' : '0.7'};
    transition:${props => props.transition ? 'opacity 1.5s, transform 1.7s, box-shadow 1.2s ease-in-out' : '0'};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transform: scale(${props => props.isActive ? '1.18' : '0.88'});
    z-index: ${props => props.isActive ? '20' : '1'};
    box-shadow: ${props => props.isActive ? '0 20px 12px -8px rgba(0,0,0,0.2)' : 'none'};
    &:hover {
        cursor: ${props => props.isActive ? 'default' : 'pointer'};
    }
`;

const ImageContainer = styled.div`
    height: 70%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SlideComponent = styled.div`
    height: 100%;
    width:${props => props.width}px;
`;

const Slide = ({ content, isActive, width, onClick, transition }) => (
  <SlideComponent width={width}>
    <ImageContainer>
        <Image onClick={!isActive && onClick} content={content} isActive={isActive} transition={transition}/>
    </ImageContainer>
  </SlideComponent>

)

export default Slide;