import { useState, useEffect } from 'react';
// Second BootStrap Element
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PeopleGroup from '../components/PeopleGroup.jsx';

import getData from '../util/GetData.js';

import './People.css';

function PeopleTabs() {
  //state
  const [loaded, setLoaded] = useState(false);
  const [people, setPeople] = useState();

  useEffect(() => {
    getData('people/')
      .then((json) => {
        setPeople(json);
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 id='people-h1'>{people.title}</h1>
      <h3 id='people-h3'>{people.subTitle}</h3>
      <Tabs defaultActiveKey="fac" id="people-tabs" className="mb-3">
        <Tab 
          eventKey="fac" 
          // Inline style to override stuff from bootstrap
          title={<span style={{ color: '#f76902', fontWeight: '600', fontSize: '1.2rem' }}>Faculty</span>}
        >
        <PeopleGroup title='Faculty' pepGroup={people.faculty} />
        </Tab>
      <Tab 
        eventKey="staff" 
        title={<span style={{ color: '#f76902', fontWeight: '600', fontSize: '1.2rem' }}>Staff</span>}
      >
        <PeopleGroup title='Staff' pepGroup={people.staff} />
      </Tab>
    </Tabs>

    </>
  );
}

export default PeopleTabs;
