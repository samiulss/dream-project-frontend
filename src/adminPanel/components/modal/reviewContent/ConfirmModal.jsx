/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { rootUrl } from '../../../../../config/backendUrl';
import PopUpModal from '../../../../components/modals/popUpModal/PopUpModal';
import { ContentState } from '../../../../context/StateContext';
import './confirmModal.scss';

function ConfirmModal({ content, fileState }) {
  const { setPopUpModal } = ContentState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tags, setTags] = useState([]);
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);

  const viewContent = () => {
    handleShow();
  };

  const approveButton = () => {
    setApprove(true);
    setReject(false);
    setPopUpModal(true);
  };
  const rejecteButton = () => {
    setReject(true);
    setApprove(false);
    setPopUpModal(true);
  };

  useEffect(() => {
    const tagList = content.keywords[0].split(',');
    setTags(tagList);
  }, []);

  return (
    <>
      <button
        onClick={() => viewContent()}
        className="btn btn-primary border-0 rounded-4 me-3"
      >
        View
      </button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        {/* ----------MODAL CLOSE BUTTON---------- */}
        <div className="modal-header border-0 pb-0">
          <button
            onClick={handleClose}
            className="btn-close shadow-none base-bg-color-1 rounded-5 text-white mb-1"
          />
        </div>

        <Modal.Body>
          <div className="review-pending-content">
            <div className="row">
              {/* ----------LEFT SIDE---------- */}
              <div className="col-lg-6 left-side d-flex flex-column border-end">
                {/* ----------THUMBNAIL---------- */}
                <div className="thumbnail w-100">
                  <img
                    className="img-fluid w-100"
                    src={`${rootUrl}/${content.thumbnail}`}
                    alt=""
                  />
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
                  <div className="tags-list overflow-y-auto">
                    <ul className="mb-0">
                      {tags.map((keyword, i) => (
                        <li
                          key={i}
                          className="base-bg-color-1 me-1 mb-1 rounded-4 text-center d-inline-block"
                        >
                          {keyword}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ----------RIGHT SIDE---------- */}
              <div className="col-lg-6 right-side d-flex flex-column">
                <h6>
                  Main Files:
                  {' '}
                  {content.files.length}
                </h6>
                <div className="d-flex added-files flex-column">
                  {content.files.map((fileName, i) => (
                    <div key={i}>
                      <li>
                        {fileName}
                        {' '}
                      </li>
                      <Link
                        to={`${rootUrl}/api/downloadUploadedFile?id=${content._id}&fileName=${fileName}`}
                        target="_blank"
                        download={content.title}
                        rel="noreferrer"
                        className="btn btn-primary rounded-5"
                      >
                        Download
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        {!fileState ? (
          <Modal.Footer className="border-0">
            <Button
              className="border-0 rounded-4"
              variant="danger"
              onClick={rejecteButton}
            >
              Reject
            </Button>
            <Button
              className="border-0 rounded-4 w-25"
              variant="primary"
              onClick={approveButton}
            >
              Confirm
            </Button>
          </Modal.Footer>
        ) : (
          ''
        )}
        <PopUpModal
          rejectModal={reject}
          approveModal={approve}
          content={content}
          handleClose={handleClose}
        />
      </Modal>
    </>
  );
}

export default ConfirmModal;
