import './About.css';

const About = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  return (
    <div className="about-container">
      <h2 className="about-heading">About the iSchool</h2>
      <p className="about-title">{data.title}</p>
      <p className="about-description">{data.description}</p>

      {data.quote && (
        <blockquote className="about-blockquote">
          <p className="about-quote">"{data.quote}"</p>
          {data.quoteAuthor && (
            <footer className="about-quote-author">
              {data.quoteAuthor}
            </footer>
          )}
        </blockquote>
      )}

      {data.mission && (
        <>
          <h3 className="about-mission-heading">Our Mission</h3>
          <p className="about-mission">{data.mission}</p>
        </>
      )}
    </div>
  );
};

export default About;
