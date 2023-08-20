import axios from 'axios';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import { ContentState } from '../../context/StateContext';
import DataTable from '../../shareComponent/dataTable/DataTable';
import './notification.scss';

function Notification({ ...pros }) {
  const { auth } = ContentState();

  // handle seen notification
  const handleSeen = async (id) => {
    try {
      await axios.post(`${rootUrl}/api/seenNotification`, { notificationId: id }, config(auth));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <DataTable data={pros} handleSeen={handleSeen} />
  );
}

export default Notification;
