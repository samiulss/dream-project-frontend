import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import ConfirmModal from '../../adminPanel/components/modal/reviewContent/ConfirmModal';
import { ContentState } from '../../context/StateContext';
import Canvas from '../commons/offCanvas/Offcanvas';
import './fileStatus.scss';

function FileStatus({ content, index }) {
  const {
    auth, fetchAgain, setFetchAgain, setShowCanvas
  } = ContentState();
  const { title, status, createdAt } = content;
  const navigate = useNavigate();

  // DELETE PENDING CONTENT
  const cancelPending = async (id) => {
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/deletePending`,
        { contentId: id },
        config(auth)
      );
      toast.success(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error(error.message);
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };

  return (
    <>
      <tbody>
        <tr>
          <td>{index + 1}</td>
          <td>{title}</td>
          <td>
            <span className="me-2">{moment(createdAt).format('L')}</span>
            {moment(createdAt).format('LT')}
            <span />
          </td>
          <td
            className={
            (status === 'Pending' && 'text-warning')
            || (status === 'Approved' && 'text-success')
            || (status === 'Rejected' && 'text-danger')
          }
          >
            {status}
          </td>
          <td className="p-0">
            <ConfirmModal content={content} fileState />
          </td>
          {status === 'Pending' && (
          <td>
            <i
              onClick={() => cancelPending(content._id)}
              title="Cancel"
              className="fa-solid fa-xmark text-danger"
              role="button"
            />
          </td>
          )}
          {status === 'Rejected' && (
          <td>
            <p
              style={{ width: '80px' }}
              onClick={() => setShowCanvas(true)}
              className="bg-danger-subtle see-why-btn text-danger rounded-4 mb-0 text-center"
              type="button"
            >
              See Why
            </p>
          </td>
          )}
        </tr>
      </tbody>
      <Canvas fileStatus rejectCause={content.rejectCause} />
    </>
  );
}

export default FileStatus;
