//put names and people info into components 
//separating these levels as you go down, click and get additional information

//import css any react state
//import React from 'react';
//smaller things than just react, takes longer to run everything
//React.useState()
import {useState, useEffect} from 'react';

//import components 
// import People from './components/PeopleDead.jsx'
import BootAcc from './components/BootAcc.jsx'
import PeopleTabs from './components/PeopleTabs.jsx'

//get the css 
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//import utils
import getData from './util/GetData.js'

const App=() => {
  //set up my state vars
  //const [var, setVar] = useState(init)
  const [loadAbout, setLoadAbout] = useState(false);
  const [aboutObj, setAboutObj] = useState();

  useEffect(()=>{
    getData('about/')
    .then((json) => {
      console.log('worked', json);
      //load the data into the obj
      setAboutObj(json);
      //flip the bit on loaded
      setLoadAbout(true);
    })
  }, []);

  if(!loadAbout) return (
      <div>
        <div className='stick'>
          <h1>Welcome to the ischool website</h1>
          <div>..Menu Component...</div>
        </div>

        <div className='App'> </div>
      </div>
  ) 
  
  return (
    <div>
      <div className='stick'>
        <h1>Welcome to the ischool website</h1>
        <div>..Menu Component...</div>
      </div>

      <div className='App'>
        <div className='About'>
          <h3>{aboutObj.title}</h3>
          <h6>{aboutObj.description}</h6>
          <div className='quote'>{aboutObj.quote}</div>
        </div>

        <hr/>
        {/* FIrst Lets build something to grab people */}
        <BootAcc/>
        <PeopleTabs/>

        {/* <People/> */}

      </div>
    </div>
  ) 
}

export default App;
