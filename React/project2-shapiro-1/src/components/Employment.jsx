import React, { useEffect, useState } from 'react';
import getData from '../util/GetData.js';
import './Employment.css';


const Employment = () => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [coopSearch, setCoopSearch] = useState('');
  const [employmentSearch, setEmploymentSearch] = useState('');

  useEffect(() => {
    getData('employment/')
      .then((json) => {
        setData(json);
        setLoaded(true);
      })
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="employment-page">
      {/* Introduction Section */}
      <section className="introduction">
        <h2>{data.introduction.title}</h2>
        {data.introduction.content.map((content, index) => (
          <div key={index} className="content-section">
            <h3>{content.title}</h3>
            <p>{content.description}</p>
          </div>
        ))}
      </section>

      {/* Degree Statistics Section */}
      <section className="degree-statistics">
        <h2>{data.degreeStatistics.title}</h2>
        <div className="statistics">
          {data.degreeStatistics.statistics.map((stat, index) => (
            <div key={index} className="statistic-item">
              <strong>{stat.value}</strong>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Employers Careers Section */}
      <section id='employers-careers'>
        <section className="employers">
          <h2>{data.employers.title}</h2>
          <ul className="no-bullets">
            {data.employers.employerNames.map((employer, index) => (
              <li key={index}>{employer}</li>
            ))}
          </ul>
        </section>

        <section className="careers">
          <h2>{data.careers.title}</h2>
          <ul className="no-bullets">
            {data.careers.careerNames.map((career, index) => (
              <li key={index}>{career}</li>
            ))}
          </ul>
      </section>
        
      </section>
      

      {/* Co-op Table Section */}
      <section className="coop-table">
        <h2>{data.coopTable.title}</h2>

        {/* So you can custom search */}
        <input
          type="text"
          placeholder="Search by employer..."
          value={coopSearch}
          onChange={(e) => setCoopSearch(e.target.value)}
          className="table-search-input"
        />

        {/* Scrollable so it doesn't take up space */}
        <div className="scroll-table">
          <table>
            <thead>
              <tr>
                <th>Employer</th>
                <th>Degree</th>
                <th>City</th>
                <th>Term</th>
              </tr>
            </thead>
            <tbody>
              {data.coopTable.coopInformation
                .filter((coop) =>
                  coop.employer.toLowerCase().includes(coopSearch.toLowerCase())
                )
                .sort((a, b) => a.employer.localeCompare(b.employer))
                .map((coop, index) => (
                  <tr key={index}>
                    <td>{coop.employer}</td>
                    <td>{coop.degree}</td>
                    <td>{coop.city}</td>
                    <td>{coop.term}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Professional Employment Table Section */}
      <section className="professional-employment-table">
        <h2>{data.employmentTable.title}</h2>

        <input
          type="text"
          placeholder="Search by employer..."
          value={employmentSearch}
          onChange={(e) => setEmploymentSearch(e.target.value)}
          className="table-search-input"
        />

        <div className="scroll-table">
          <table>
            <thead>
              <tr>
                <th>Employer</th>
                <th>Degree</th>
                <th>City</th>
                <th>Title</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {data.employmentTable.professionalEmploymentInformation
                .filter((job) =>
                  job.employer.toLowerCase().includes(employmentSearch.toLowerCase())
                )
                .sort((a, b) => a.employer.localeCompare(b.employer))
                .map((job, index) => (
                  <tr key={index}>
                    <td>{job.employer}</td>
                    <td>{job.degree}</td>
                    <td>{job.city}</td>
                    <td>{job.title}</td>
                    <td>{job.startDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Employment Map Section */}
      {/* Pulls employment map from the API */}
      <section className="employment-map">
        <h2>Employment Locations Map</h2>
        <p>Explore where our students have gone for co-ops and jobs around the world.</p>
        <div className="map-container">
          <iframe
            src="https://ischool.gccis.rit.edu/api/map/"
            title="Employment Map"
            width="100%"
            height="600"
            style={{ border: 'none' }}
            allowFullScreen
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default Employment;
