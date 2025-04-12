// Resources Page

import React, { useEffect, useState } from 'react';
import getData from '../util/GetData.js';
import './Resources.css';

const Resources = () => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData('resources/')
      .then((json) => {
        setData(json);
        setLoaded(true);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="resources-page">
      {/* Page Title */}
      <header className="page-header">
        <h1>{data.title}</h1>
        <p>{data.subTitle}</p>
      </header>

      {/* Study Abroad Section */}
      <section className="study-abroad">
        <h2>{data.studyAbroad.title}</h2>
        <p>{data.studyAbroad.description}</p>
        <div className="abroad-places">
          {data.studyAbroad.places.map((place, index) => (
            <div key={index} className="place-card">
              <h3>{place.nameOfPlace}</h3>
              <p>{place.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Advising Section */}
      <section className="advising">
        <h2>{data.studentServices.title}</h2>

        <div className="advising-section">
          <h3>{data.studentServices.academicAdvisors.title}</h3>
          <p>{data.studentServices.academicAdvisors.description}</p>
          {/* To display the link correctly */}
          <p href={data.studentServices.academicAdvisors.faq.contentHref} target="_blank" rel="noopener noreferrer">
            {data.studentServices.academicAdvisors.faq.title}
          </p>
        </div>

        {/* Professional Advisors */}
        <div className="advising-section">
          <h3>{data.studentServices.professonalAdvisors.title}</h3>
          <ul className="no-bullets">
            {data.studentServices.professonalAdvisors.advisorInformation.map((advisor, index) => (
              <li key={index} className="advisor-card">
                <strong>{advisor.name}</strong><br />
                <span>{advisor.department}</span><br />
                {/* I honestly hate mailto so lets do this instead  */}
                <p id='advisorEmail'> {advisor.email}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Faculty Advisors */}
        <div className="advising-section">
          <h3>{data.studentServices.facultyAdvisors.title}</h3>
          <p>{data.studentServices.facultyAdvisors.description}</p>
        </div>
      </section>
    </div>
  );
};

export default Resources;
