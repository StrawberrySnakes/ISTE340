import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import getData from '../util/GetData.js';
import CourseModal from './CourseModal';
import './Minors.css';

const Minors = () => {
  const [minors, setMinors] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseInfo, setCourseInfo] = useState(null);

  useEffect(() => {
    getData('minors/')
      .then((json) => {
        setMinors(json.UgMinors);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setCourseInfo(null);
      getData(`course/courseID=${selectedCourse}`)
        .then((data) => {
          setCourseInfo(data);
        })
        .catch((err) => console.error('Error fetching course info:', err));
    }
  }, [selectedCourse]);

  const handleCourseClick = (courseCode) => {
    setSelectedCourse(courseCode);
    setShowModal(true);
  };

  if (!loaded) return <div>Loading...</div>;

  return (
    <div className="minors-section">
      <h1>Undergraduate Minors</h1>

      <Accordion id='accordion1'>
        {minors.map((minor, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={minor.name}>
            <Accordion.Header>{minor.title}</Accordion.Header>
            <Accordion.Body>
              <p>{minor.description}</p>

              <strong>Courses:</strong>
              <ul>
                {minor.courses.map((course, i) => (
                  <li
                  id='minor-course'
                    key={i}
                    className="clickable-course"
                    style={{ cursor: 'pointer'}}
                    onClick={() => handleCourseClick(course)}
                  >
                    {course}
                  </li>
                ))}
              </ul>

              {minor.note && (
                <p className="text-muted fst-italic small mt-3">
                  <strong>Note:</strong> {minor.note}
                </p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <CourseModal
        show={showModal}
        onClose={() => setShowModal(false)}
        courseInfo={courseInfo}
        courseID={selectedCourse}
      />
    </div>
  );
};

export default Minors;
