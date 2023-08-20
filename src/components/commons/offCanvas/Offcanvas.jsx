import Offcanvas from 'react-bootstrap/Offcanvas';
import { ContentState } from '../../../context/StateContext';

function Canvas() {
  const { showCanvas, setShowCanvas } = ContentState();

  const handleClose = () => setShowCanvas(false);

  return (
    <Offcanvas show={showCanvas} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton />
      <Offcanvas.Body>
        <h1>hello</h1>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Canvas;
