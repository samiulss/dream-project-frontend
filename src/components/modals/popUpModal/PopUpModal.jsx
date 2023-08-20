import Modal from 'react-bootstrap/Modal';
import ApproveContent from '../../../adminPanel/components/approveContent/ApproveContent';
import RejectCause from '../../../adminPanel/components/rejectCause/RejectCause';
import { ContentState } from '../../../context/StateContext';
import ReportCauseList from '../../reportCauseList/ReportCauseList';
import SellerAgreement from '../../sellerAgreement/SellerAgreement';
import ShareContentLink from '../../shareContentLink/ShareContentLink';
import './popUpModal.scss';

function PopUpModal({
  beSellear,
  report,
  setReportCause,
  handleReport,
  shareLink,
  path,
  rejectModal,
  content,
  approveModal,
  setSelectCause,
  handleReject,
}) {
  const { popUpModal, setPopUpModal } = ContentState();

  const handleClose = () => {
    setPopUpModal(false);
  };

  return (
    <Modal
      show={popUpModal}
      onHide={handleClose}
      // backdrop="static"
      keyboard={false}
      centered
    >
      <div onClick={handleClose} className="close-btn rounded-5 text-end" />
      <Modal.Body className="p-0 border-0">
        <div className="modal-container">
          {report && (
            <ReportCauseList
              setReportCause={setReportCause}
              handleReport={handleReport}
            />
          )}
          {beSellear && <SellerAgreement />}
          {shareLink && <ShareContentLink path={path} />}
          {rejectModal && (
            <RejectCause
              setSelectCause={setSelectCause}
              handleReject={handleReject}
              content={content}
              handleClose={handleClose}
            />
          )}
          {approveModal && (
            <ApproveContent content={content} handleClose={handleClose} />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PopUpModal;
