import Modal from 'react-bootstrap/Modal';
import { ContentState } from '../../context/StateContext';
import './onScreentMessage.scss';

function OnScreenMessage() {
  const { onScreen, setOnScreen, onScreenData } = ContentState();

  const handleClose = () => setOnScreen(false);

  return (
    <>
      <Modal show={onScreen} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>{onScreenData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{onScreenData.msg}</Modal.Body>
      </Modal>
    </>
  );
}

export default OnScreenMessage;
