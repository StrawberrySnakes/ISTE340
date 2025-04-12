import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import getData from '../util/GetData.js';
import './Minors.css';
// Page has same theme as Minors Page

const Degrees = () => {
  const [degrees, setDegrees] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData('degrees/')
      .then((json) => {
        setDegrees(json);
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  // Separate grad degrees and certificates
  const gradDegrees = degrees.graduate.filter(deg => deg.title);
  const gradCerts = degrees.graduate.find(deg => deg.degreeName === 'graduate advanced certificates');

  return (
    <div className="degrees-section">

      <h1 className="mb-3">Undergraduate Degrees</h1>
      <Accordion id='accordion2'>
        {degrees.undergraduate.map((deg, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={idx}>
            <Accordion.Header>{deg.title}</Accordion.Header>
            <Accordion.Body>
              <p>{deg.description}</p>
              <strong>Concentrations:</strong>
              <ul>
                {deg.concentrations.map((conc, i) => <li key={i}>{conc}</li>)}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <h1 className="mt-5 mb-3">Graduate Degrees</h1>
      <Accordion id='accordion3'>
        {gradDegrees.map((deg, idx) => (
          <Accordion.Item eventKey={`g-${idx}`} key={idx}>
            <Accordion.Header>{deg.title}</Accordion.Header>
            <Accordion.Body>
              <p>{deg.description.trim()}</p>
              <strong>Concentrations:</strong>
              <ul>
                {deg.concentrations.map((conc, i) => <li key={i}>{conc}</li>)}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {gradCerts && (
        <>
          <h1 className="mt-5 mb-3">Graduate Advanced Certificates</h1>
          <ul>
            {gradCerts.availableCertificates.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Degrees;
