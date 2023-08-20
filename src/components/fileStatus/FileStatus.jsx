import axios from 'axios';
import toast from 'react-hot-toast';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import { ContentState } from '../../context/StateContext';
import DataTable from '../../shareComponent/dataTable/DataTable';

function FileStatus({ ...props }) {
  const {
    auth, fetchAgain, setFetchAgain
  } = ContentState();

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
    }
  };

  return (
    <DataTable data={props} cancelPending={cancelPending} />
  );
}

export default FileStatus;
