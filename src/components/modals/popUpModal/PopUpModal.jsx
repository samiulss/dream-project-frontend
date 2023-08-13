import Modal from 'react-bootstrap/Modal';
import { ContentState } from '../../../context/StateContext';
import ReportCauseList from '../../reportCauseList/ReportCauseList';
import SellerAgreement from '../../sellerAgreement/SellerAgreement';
import './popUpModal.scss';

function PopUpModal({ beSellear, report }) {
  const { popUpModal, setPopUpModal } = ContentState();

  const handleClose = () => setPopUpModal(false);

  return (
    <Modal
      show={popUpModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <div onClick={handleClose} className="close-btn rounded-5 text-end" />
      <Modal.Body className="p-0 border-0">
        <div className="modal-container">
          {report && <ReportCauseList />}
          {beSellear && <SellerAgreement />}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PopUpModal;
