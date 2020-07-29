import React, { useState, useRef, useEffect } from 'react';
import SliderContent from './sliderContent';
import Slide from './slide';
import LeftArrow from './leftArrow';
import RightArrow from './rightArrow';
import Dots from './dots';
import styled, {keyframes} from 'styled-components';

const fadeIn = keyframes`
    0% {
        visibility: 'visible';
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;


const Text = styled.p`
    visibility: ${props => props.isActive ? 'visible' : 'hidden'};
    opacity: ${props => props.isActive ? '1' :'0'};
    transition: ${props => props.transitionEnabled ? 'visibility 0s, opacity 1.2s ease-in-out 1.2s' : '0'};
    text-align: center;
    position: absolute;
    bottom: 18%;
    width: 100%;
`;


const MainHeader = styled.h2`
    visibility: ${props => props.isActive ? 'visible' : 'hidden'};
    opacity: ${props => props.isActive ? '1' :'0'};
    transition: ${props => props.transitionEnabled ? 'visibility 0s, opacity 1.2s ease-in-out 1.2s' : '0'};
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

    const getWidth = () => window.innerWidth

    let firstRender = true;

    const firstSlide = slides[0]
    const secondSlide = slides[1]
    const secondLastSlide = slides[slides.length - 2]
    const lastSlide = slides[slides.length - 1]

    let currentIndex = 2;

    const [state, setState] = useState({
        activeIndex: 2,
        translate: getWidth()*0.75,
        transition: 1.7,
        _slides: [secondLastSlide, lastSlide, ...slides , firstSlide, secondSlide]
      })
  
      const { activeIndex, translate, transition, _slides } = state;
  
      const autoPlayRef = useRef();
      const resizeRef = useRef();


  

    // const transitionRef = useRef()

    useEffect(() => {
        autoPlayRef.current = nextSlide;
        resizeRef.current = handleResize;
        // transitionRef.current = smoothTransition;
    });

    useEffect(() => {
        const play = () => {
            autoPlayRef.current()
        }

        // const smooth = e => {
        //     if (e.target.className.includes('slider-content')) {
        //       transitionRef.current()
        //     }
        //   }
      
        const resize = () => {
            resizeRef.current()
        }

        let interval = null;
        // const transitionEnd = window.addEventListener('transitionend', smooth)
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

    // const smoothTransition = () => {
    // //     let _slides = []

    // //     // Case for last slide.
    // //     if (activeIndex === slides.length - 1) {
    // //         _slides = [slides[slides.length - 2], lastSlide, firstSlide]
    // //     } 
    // //    // Case for first slide 
    // //     else if (activeIndex === 0) {
    // //         _slides = [lastSlide, firstSlide, secondSlide]
    // //     } 
    // //     // All other cases - create array of previous last side and the next two slides that follow
    // //     else {
    // //         _slides = slides.slice(activeIndex - 1, activeIndex + 2)
    // //     }
    
    //     setState({
    //       ...state,
    //       _slides,
    //       transition: 0,
    //       translate: getWidth()
    //     })
    // };

    // useEffect(() => {
    //     if (transition === 0) setState({ ...state, transition: 1.7 })
    //   }, [transition])
    
    useEffect(() => { console.log('activeIndex after', activeIndex)});

    useEffect(() => {
        if (!firstRender && activeIndex === 2  ) {
            nextSlide();
        } else {
            return;
        }
    })

    const nextSlide = () => {


        if (activeIndex === _slides.length - 2) {
            firstRender = false;
            setState({
                ...state,
                translate: getWidth()*0.75,
                activeIndex: 2,
                transition: 0
              })
        }
        else {
            setState({
                ...state,
                translate: translate + (getWidth()*0.5),
                activeIndex: activeIndex + 1,
                transition: 1.7
              })
        }
        // setState({
        //     ...state,
        //     translate: activeIndex === _slides.length - 2 ? getWidth()*0.75 : translate + (getWidth()*0.5),
        //     activeIndex: activeIndex === _slides.length - 2 ? 2 :  activeIndex + 1,
        //     transition: activeIndex === _slides.length - 2 ? 0 : 1.7
        //   })
    };

  
    const prevSlide = () => {
        setState({
            ...state,
            translate: activeIndex === 1 ? ((getWidth()*0.5 * (_slides.length-3)) - (getWidth()*0.25)) : translate - (getWidth()*0.5),
            activeIndex: activeIndex === 1 ? _slides.length - 3 : activeIndex - 1
          })
    };
  
    return (
      <SliderComponent>
        <SliderContent
          className="slider-content"
          translate={translate}
          transition={ transition }
          width={getWidth() * _slides.length}
        //   margin={getWidth()* 0.25}
        >
          {
              _slides.map((slide,i) => (
                  <Slide 
                    key={slide + i}
                    content={slide.img}
                    mainHeading={slide.mainHeading}
                    isActive={i===activeIndex}
                    width={getWidth()*0.5}
                    onClick={nextSlide}
                    transitionEnabled={activeIndex === 2 ? false : true}
                  />
              ))
          }
        </SliderContent>
        <LeftArrow handleClick={prevSlide} />
        <RightArrow handleClick={nextSlide} />
        {
              _slides.map((slide,i) => (
                  <>
                    <MainHeader key={slide + i} isActive={i===activeIndex} transitionEnabled={activeIndex === 2 ? false : true}>{slide.mainHeading}</MainHeader>
                    <Text key={slide + i} isActive={i===activeIndex} transitionEnabled={activeIndex === 2 ? false : true}>{slide.subHeading}</Text>
                  </>

              ))
          }
        <ButtonContainer>
            <Button>Learn about this theme pack</Button>
        </ButtonContainer>
        <Dots slides={slides} activeIndex={activeIndex} />
      </SliderComponent>
    )
  }
  


export default Slider;
