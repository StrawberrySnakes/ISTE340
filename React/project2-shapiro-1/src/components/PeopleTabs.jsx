import {useState, useEffect} from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PeopleGroup from '../components/PeopleGroup.jsx';

import getData from '../util/GetData.js';

import './People.css';

function PeopleTabs() {
  //state
  const [loaded, setLoaded] = useState(false);
  const [people, setPeople] = useState()

  useEffect(() =>{
    getData('people/')
    .then((json) => {
      setPeople(json),
      setLoaded(true);
    })
  }, []);


  if(!loaded) return (<h1>loading people...</h1>)
    
  return (
    <>
    <h1>{people.title}</h1>
    <h3>{people.subTitle}</h3>
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="fac" title="Faculty">
        <PeopleGroup title='Faculty' pepGroup={people.faculty}/>
      </Tab>
      <Tab eventKey="staff" title="Staff">
        <PeopleGroup title='Staff' pepGroup={people.staff}/>
      </Tab>
      
    </Tabs>
    </>
  );
}

export default PeopleTabs;