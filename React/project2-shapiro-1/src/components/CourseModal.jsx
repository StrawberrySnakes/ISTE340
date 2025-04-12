import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CourseModal = ({ show, onClose, courseInfo, courseID }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{courseInfo?.title || courseID}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {courseInfo ? (
          <>
            <p><strong>Course ID:</strong> {courseInfo.courseID}</p>
            <p><strong>Title:</strong> {courseInfo.title}</p>
            <p><strong>Description:</strong> {courseInfo.description}</p>
          </>
        ) : (
          <p>Loading course info...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseModal;
