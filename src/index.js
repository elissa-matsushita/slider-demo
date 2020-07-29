import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './components/slider';
import * as serviceWorker from './serviceWorker';


const images = [
  {
    img: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    mainHeading: 'NBA Heading Test',
    subHeading: 'Subheading Test 1'
  },
  {
    img: 'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
    mainHeading: 'Golf Heading Test',
    subHeading: 'Subheading Test 2'
  },
  {
    img: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
    mainHeading: 'Race Car Heading Test',
    subHeading: 'Subheading Test 3'
  },
  {
    img:  'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
    mainHeading: 'Soccer Heading Test',
    subHeading: 'Subheading Test 4'
  }
]

ReactDOM.render(
  <React.StrictMode>
    <Slider slides={images} autoplay={null}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
