import Offcanvas from 'react-bootstrap/Offcanvas';
import { ContentState } from '../../../context/StateContext';
import NotificationView from '../../notificationView/NotificationView';

function Canvas({ rejectCause, fileStatus, notification }) {
  const { showCanvas, setShowCanvas } = ContentState();

  const handleClose = () => setShowCanvas(false);

  return (
    <>
      <Offcanvas show={showCanvas} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {fileStatus && 'Rejected'}
            {notification && 'Notification'}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {fileStatus && rejectCause}
          {notification && <NotificationView />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Canvas;
