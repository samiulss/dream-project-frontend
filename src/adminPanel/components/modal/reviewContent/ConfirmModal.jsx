/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './confirmModal.scss';

function ConfirmModal({
  content, setContentId, handleApprove, handleReject
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = () => {
    setContentId(content._id);
    handleShow();
  };

  console.log(content.keywords);

  return (
    <>
      <button onClick={() => handleConfirm()} className="btn btn-primary border-0 rounded-4 me-4">View</button>

      <Modal show={show} onHide={handleClose} centered size="lg">

        {/* ----------MODAL CLOSE BUTTON---------- */}
        <div className="modal-header border-0 pb-0">
          <button onClick={handleClose} className="btn-close shadow-none base-bg-color-1 rounded-5 text-white" />
        </div>

        <Modal.Body>
          <div className="review-pending-content">
            <div className="row">

              {/* ----------LEFT SIDE---------- */}
              <div className="col-lg-6 left-side d-flex flex-column border-end">

                {/* ----------THUMBNAIL---------- */}
                <div className="thumbnail w-100">
                  <img className="img-fluid w-100" src={`http://localhost:5000/uploads/${content.thumbnail}`} alt="" />
                </div>

                {/* ----------TITLE---------- */}
                <div className="title">
                  <h5 className="fw-semibold">
                    Title:
                    {' '}
                    {content.title}
                  </h5>
                </div>

                {/* ----------CATAGORY LIST---------- */}
                <div className="catagory-list d-flex">
                  <h6 className="fw-semibold me-2">Catagory:</h6>
                  <span>{content.catagory}</span>
                </div>

                {/* ----------KEYWORD LIST---------- */}
                <div className="keywords-list d-flex align-items-center">
                  <h6 className="fw-semibold mb-0 me-2">Keywords: </h6>
                  <ul className="mb-0">
                    {
                      content.keywords.map((keyword, i) => <li key={i} className="text-dark">{keyword}</li>)
                    }
                  </ul>
                </div>
              </div>

              {/* ----------RIGHT SIDE---------- */}
              <div className="col-lg-6 right-side d-flex flex-column">
                <h6>
                  Main Files:
                  {' '}
                  {content.file.length}
                </h6>
                {
                  content.file.map((fileName, i) => <li key={i}>{fileName}</li>)
                }
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button className="border-0 rounded-4" variant="danger" onClick={() => { handleReject(); handleClose(); }}>
            Reject
          </Button>
          <Button className="border-0 rounded-4 w-25" variant="primary" onClick={() => { handleApprove(); handleClose(); }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
