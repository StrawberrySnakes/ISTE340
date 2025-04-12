import { useState, useEffect } from 'react';

// Components
import TopNav from './components/TopNav.jsx';
import PeopleTabs from './components/PeopleTabs.jsx';
import About from './components/About.jsx';
import Degrees from './components/Degrees.jsx';
import Minors from './components/Minors.jsx';
import Employment from './components/Employment.jsx';
import Resources from './components/Resources.jsx';
import Footer from './components/Footer.jsx';



// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Utilities
import getData from './util/GetData.js';
import './App.css';

const App = () => {
  const [loadAbout, setLoadAbout] = useState(false);
  const [aboutObj, setAboutObj] = useState();
  const [currentSection, setCurrentSection] = useState('about'); // default homepage

  useEffect(() => {
    getData('about/').then((json) => {
      setAboutObj(json);
      setLoadAbout(true);
    });
  }, []);

  if (!loadAbout) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {/* Sets The TopNav */}
      <TopNav setSection={setCurrentSection} />
      <div className="App">
        {currentSection === 'about' && <About data={aboutObj} />}
        {currentSection === 'degrees' && <Degrees />}
        {currentSection === 'minors' && <Minors />}
        {currentSection === 'employment' && <Employment />}
        {currentSection === 'resources' && <Resources />}
        {currentSection === 'people' && <PeopleTabs />}

      </div>
    {/* Footer at the bottom of content */}
      <Footer />
    </>
  );
};

export default App;
