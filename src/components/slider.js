import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import SliderContent from './sliderContent';
import Slide from './slide';
import LeftArrow from './leftArrow';
import RightArrow from './rightArrow';
import Dots from './dots';
import styled from 'styled-components';



const Text = styled.p`
    visibility: ${props => props.isActive ? 'visible' : 'hidden'};
    opacity: ${props => props.isActive ? '1' :'0'};
    transition: ${props => props.transition ? 'visibility 0s, opacity 1.2s ease-in-out 1.2s' : '0'};
    text-align: center;
    position: absolute;
    bottom: 18%;
    width: 100%;
`;


const MainHeader = styled.h2`
    visibility: ${props => props.isActive ? 'visible' : 'hidden'};
    opacity: ${props => props.isActive ? '1' :'0'};
    transition: ${props => props.transition ? 'visibility 0s, opacity 1.2s ease-in-out 1.2s' : '0'};
    text-align: center;
    color: #4B286D;
    position: absolute;
    bottom: 22%;
    width: 100%;
`;

const SliderComponent = styled.div`
    position: relative;
    height: 115vh;
    width: 100vw;
    margin: 0 auto;
    overflow: hidden;
    margin: 60px 0px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    background-color: #2B8000;
    color: white;
    border: none;
    padding: 5px;
`;

const Slider = ({ slides, autoplay }) => {

    const getWidth = () => window.innerWidth;

    const firstSlide = slides[0]
    const secondSlide = slides[1]
    const secondLastSlide = slides[slides.length - 2]
    const lastSlide = slides[slides.length - 1]

    const [state, setState] = useState({
        activeIndex: 2,
        translate: getWidth()*0.75,
        transition: 1.7,
        _slides: [secondLastSlide, lastSlide, ...slides , firstSlide, secondSlide],
        jump: false
      })
  
      const { activeIndex, translate, transition, _slides, jump } = state;
  
      const autoPlayRef = useRef();
      const resizeRef = useRef();

    useEffect(() => {
        autoPlayRef.current = nextSlide;
        resizeRef.current = handleResize;
        // transitionRef.current = smoothTransition;
    });

    useEffect(() => {
        const play = () => {
            autoPlayRef.current()
        }

        const resize = () => {
            resizeRef.current()
        }

        let interval = null;
        const onResize = window.addEventListener('resize', resize)
        
        if (autoplay !== null) {
            interval = setInterval(play, autoplay)
          }

        return () => {
            window.removeEventListener('resize', onResize);
            if (autoplay !== null) {
                clearInterval(interval)
            }
        }
    },[autoplay])


    const handleResize = () => {
        setState({
            ...state,
            translate: 0,
            transition: 0
        })
    }


    useEffect(() => {
        if (jump && activeIndex === _slides.length - 2) {
            setState({
                ...state,
                translate: getWidth()*0.75,
                activeIndex: 2,
                transition: 0
              })
            
            // nextSlide();
            console.log("active Index in use effect: ", activeIndex)
        } else {
            return;
        }
    }, [jump, activeIndex])

    // useEffect(() => {
    //     if (activeIndex === 6) {
    //         setState({
    //             ...state,
    //             cloneIndex: 2
    //         })
    //     } else {
    //         setState({
    //             ...state,
    //             cloneIndex: -1
    //         })
    //     }
    //     console.log("clone index: ", state.cloneIndex)
    // },[activeIndex])

    useEffect(() => {
        if (jump && activeIndex === _slides.length - 3 ) {
            prevSlide();
        } else {
            return;
        }
    }, [jump, activeIndex])


    const nextSlide = () => {
        console.log("Active index in next slide: ", activeIndex)
        if (activeIndex === _slides.length - 3) {
            setState({
                ...state,
                translate: translate + (getWidth()*0.5),
                activeIndex: activeIndex + 1,
                transition: 1.7,
                jump: true
              })
        }
        else {
            setState({
                ...state,
                translate: translate + (getWidth()*0.5),
                activeIndex: activeIndex + 1,
                transition: 1.7,
                jump: false
              })
            }
        // if (activeIndex === _slides.length - 2) {
        //     setState({
        //         ...state,
        //         translate: getWidth()*0.75,
        //         activeIndex: 2,
        //         transition: 0,
        //         jump: true
        //       })
        // }
        // else {
        //     setState({
        //         ...state,
        //         translate: translate + (getWidth()*0.5),
        //         activeIndex: activeIndex + 1,
        //         transition: 1.7,
        //         jump: false
        //       })
        // }
    };

  
    const prevSlide = () => {
        if (activeIndex === 1) {
            setState({
                ...state,
                translate: ((getWidth()*0.5 * (_slides.length-3)) - (getWidth()*0.25)),
                activeIndex:  _slides.length - 3,
                transition: 0,
                jump: true
            })
        }
        else {
            setState({
                ...state,
                translate: translate - (getWidth()*0.5),
                activeIndex: activeIndex - 1,
                transition: 1.7,
                jump: false
            })
        }
    };
  
    return (
      <SliderComponent>
        <SliderContent
          className="slider-content"
          translate={translate}
          transition={ transition }
          width={getWidth() * _slides.length}
        >
          {
              _slides.map((slide,i) => (
                  <Slide 
                    key={slide + i}
                    content={slide.img}
                    mainHeading={slide.mainHeading}
                    isActive={i===activeIndex}
                    width={getWidth()*0.5}
                    onClick={i === activeIndex - 1 ? prevSlide : nextSlide}
                    transition={transition}
                  />
              ))
          }
        </SliderContent>
        <LeftArrow handleClick={prevSlide} />
        <RightArrow handleClick={nextSlide} />
        {
              _slides.map((slide,i) => (
                  <>
                    <MainHeader key={slide + i} isActive={i===activeIndex} transition={transition}>{slide.mainHeading}</MainHeader>
                    <Text key={slide + i} isActive={i===activeIndex} transition={transition}>{slide.subHeading}</Text>
                  </>

              ))
          }
        <ButtonContainer>
            <Button>Learn about this theme pack</Button>
        </ButtonContainer>
        <Dots slides={slides} activeIndex={activeIndex} _slides={_slides}  />
      </SliderComponent>
    )
  }
  


export default Slider;
