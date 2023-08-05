/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ContentState } from '../../../../context/StateContext';
import './confirmModal.scss';

function ConfirmModal({ content, fileState }) {
  const { fetchAgain, setFetchAgain } = ContentState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [contentId, setContentId] = useState('');

  const viewContent = () => {
    setContentId(content._id);
    handleShow();
  };

  // HANDLE APPROVE CONTENT
  const handleApprove = async () => {
    if (!contentId) {
      return;
    }
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.post('http://localhost:5000/api/approve', { contentId }, config);
      toast.success(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // HANDLE REJECT CONTENT
  const handleReject = async () => {
    if (!contentId) {
      return;
    }
    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.post('http://localhost:5000/api/reject', { contentId }, config);
      toast.success(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <button onClick={() => viewContent()} className="btn btn-primary border-0 rounded-4 me-4">View</button>

      <Modal show={show} onHide={handleClose} centered size="lg">

        {/* ----------MODAL CLOSE BUTTON---------- */}
        <div className="modal-header border-0 pb-0">
          <button onClick={handleClose} className="btn-close shadow-none base-bg-color-1 rounded-5 text-white mb-1" />
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
                      content.keywords.map((keyword, i) => <span key={i} className="text-dark">{keyword}</span>)
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
                <div className="d-flex added-files flex-column">
                  {
                  content.file.map((fileName, i) => (
                    <div key={i}>
                      <li>
                        {fileName}
                        {' '}
                      </li>
                      <Link to={`http://localhost:5000/api/downloadFile?id=${contentId}`} className="btn btn-primary rounded-5">Download</Link>
                    </div>
                  ))
                }
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        {!fileState ? (
          <Modal.Footer className="border-0">
            <Button className="border-0 rounded-4" variant="danger" onClick={() => { handleReject(); handleClose(); }}>
              Reject
            </Button>
            <Button className="border-0 rounded-4 w-25" variant="primary" onClick={() => { handleApprove(); handleClose(); }}>
              Confirm
            </Button>
          </Modal.Footer>
        ) : ''}
      </Modal>
    </>
  );
}

export default ConfirmModal;
