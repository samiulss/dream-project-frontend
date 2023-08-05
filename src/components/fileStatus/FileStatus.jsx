import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import Canvas from '../commons/offCanvas/Offcanvas';
import './fileStatus.scss';

function FileStatus({ content, index }) {
  const { title, status, createdAt } = content;

  return (
    <>
      {/* ----------TABLE DATA---------- */}
      <tbody>
        <tr>
          <td>{index + 1}</td>
          <td>{title}</td>
          <td>
            <span className="me-2">{moment(createdAt).format('L')}</span>
            {moment(createdAt).format('LT')}
            <span />
          </td>
          <td className={(status === 'Pending' && 'text-warning') || (status === 'Approved' && 'text-success') || (status === 'Rejected' && 'text-danger')}>{status}</td>
          {status === 'Pending' && <td><i onClick={() => toast.success('Canceled')} title="Cancel" className="fa-solid fa-xmark text-danger" role="button" /></td>}
          {status === 'Rejected' && (
          <td>
            <Canvas />
          </td>
          )}
        </tr>
      </tbody>
      <Toaster />
    </>
  );
}

export default FileStatus;
