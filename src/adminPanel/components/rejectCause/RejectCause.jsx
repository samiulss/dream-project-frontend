import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { rootUrl } from '../../../../config/backendUrl';
import Loading from '../../../components/commons/loading/Loading';
import { ContentState } from '../../../context/StateContext';

function RejectCause({ contentId, handleClose }) {
  const { fetchAgain, setFetchAgain } = ContentState();
  const [custom, setCustom] = useState(false);
  const [cause, setCause] = useState(null);
  const [loading, setLoading] = useState(false);

  const customRef = useRef();

  useEffect(() => {
    if (custom) {
      customRef.current.focus();
    }
  }, [custom]);

  const getcCause = (e) => {
    setCause(e.target.value);
    if (e.target.value === 'custom') {
      setCustom(true);
      setCause(null);
    }
  };

  // HANDLE REJECT CONTENT
  const handleReject = async () => {
    setLoading(true);
    if (!cause) {
      setLoading(false);
      toast.error('Please select a reasone');
      return;
    }

    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/reject`,
        { contentId, cause },
        config
      );
      handleClose();
      toast.success(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="report-cause">
      <ul>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            onClick={() => setCustom(false)}
            name="report"
            id="one"
            value="Copy content"
          />
          <label htmlFor="one">Copy content</label>
        </li>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            onClick={() => setCustom(false)}
            name="report"
            id="two"
            value="Sensetive content"
          />
          <label htmlFor="two">Sensetive content</label>
        </li>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            onClick={() => setCustom(false)}
            name="report"
            id="three"
            value="Violet our rules"
          />
          <label htmlFor="three">Violet our rules</label>
        </li>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            onClick={() => setCustom(false)}
            name="report"
            id="four"
            value="Need more quality"
          />
          <label htmlFor="four">Need more quality</label>
        </li>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            onClick={() => setCustom(false)}
            name="report"
            id="five"
            value="File missing"
          />
          <label htmlFor="five">File missing</label>
        </li>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            name="report"
            id="custom"
            value="custom"
          />
          <label htmlFor="custom">Custom</label>
        </li>
        {custom && (
          <li>
            <input
              onChange={getcCause}
              ref={customRef}
              className="form-control"
              type="text"
            />
          </li>
        )}
      </ul>
      <div className="text-end">
        <button
          style={{ height: '50px' }}
          onClick={handleReject}
          className="btn btn-reject bg-danger text-white rounded-5 w-25"
        >
          {loading ? <Loading /> : 'Reject'}
        </button>
      </div>
    </div>
  );
}

export default RejectCause;
