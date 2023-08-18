import moment from 'moment';
import { ContentState } from '../../context/StateContext';
import Canvas from '../commons/offCanvas/Offcanvas';
import './notification.scss';

function Notification() {
  const { setShowCanvas } = ContentState();
  return (
    <>
      <tbody onClick={() => setShowCanvas(true)}>
        <tr>
          <td>{moment().subtract(10, 'days').calendar()}</td>
          <td>{moment().format('LT')}</td>
          <td>
            Title
          </td>
          <td>
            <span className="svg-icon message-icon position-relative">
              <span className="d-inline-block rounded-5 message-notification position-absolute" />
            </span>
          </td>
        </tr>
      </tbody>
      <Canvas notification />
    </>
  );
}

export default Notification;
