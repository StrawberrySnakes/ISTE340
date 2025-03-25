import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function PeopleTabs() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="fac" title="Faculty">
        Tab content for Faculty
      </Tab>
      <Tab eventKey="staff" title="Staff">
        Tab content for Staff
      </Tab>
    </Tabs>
  );
}

export default PeopleTabs;