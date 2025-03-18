//import Hooks


//import in our components
import Welcome from './components/funcComp.jsx'
import Box from './components/box.jsx'

//bring in out CSS
import './App.css'
import { useState } from 'react';


//build this - a internal functional component!
function WelcomeInternal ({name}) {
  return <h1 className="myStyle">Hello - there {name}</h1>
}

function App() {

  //build in my state!
  //const [getter, setter] = useState(init)

  //cant use data if you don't have it yet
  //loaded is a var that flips the switch when I get data!
  const[loaded, setLoaded] = useState(false);

  //myObj is a var that holds my returned data!
  const[myObj, setMyObj] = useState();

  //define all my internal functions!
  const getData = () => {
    console.log("in the middle of a function")
    setMyObj(
      {
        title:"React is so much fun", 
        description:"lots and lots of words, something meaningful, yada, yada, yada...",
        age: 56,
        address: "123 Street"
      }
    );
    setLoaded(true);
  }

  //can I do console.log
  console.log('in the middle of app');

if(!loaded) return (
    //must have one parent empty tag
    <>
    {console.log('test inside of return')}
      <h1 className="read-the-docs">
        Click on the Vite and React logos to learn more
      </h1>
      {/* can do this multiple times */}
      {/* <WelcomeInternal name="DJ"/>
      <Welcome name='jimmy' job='talking' someStyle="otherStyle"/>
      <Welcome name='Sally' job='Science' someStyle="myStyle"/>
      <Box address="123 Main Street" age="5"/> */}
    <button onClick={getData()}>Get the Data!</button>
      <p>some text</p>
    </>
  )


  return (
    <>
    <h1> We Have Data! </h1>
    <h3> {myObj.title} </h3>
    <h4> {myObj.description} </h4>
    <Box age = {myObj.age} address={myObj.address}/>
    </>
  )
}

// default is app
export default App
