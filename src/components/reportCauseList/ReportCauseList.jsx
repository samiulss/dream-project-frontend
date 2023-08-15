import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ContentState } from '../../context/StateContext';
import './reportCauseList.scss';

function ReportCauseList() {
  const { setPopUpModal } = ContentState();
  const [selectCause, setSelectCause] = useState(null);

  const getcCause = (e) => {
    setSelectCause(e.target.value);
  };

  // handle submit report
  const handleReport = () => {
    if (!selectCause) {
      toast.error('Please select a reasone');
      return;
    }
    setPopUpModal(false);
    toast.success('Report submited');
  };

  return (
    <div className="report-cause">
      <ul>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            name="report"
            id="one"
            value="Copy content"
          />
          <label htmlFor="one">Lorem ipsum dolor sit amet.</label>
        </li>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            name="report"
            id="two"
            value="Copy content"
          />
          <label htmlFor="two">Lorem ipsum dolor sit amet.</label>
        </li>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            name="report"
            id="three"
            value="Copy content"
          />
          <label htmlFor="three">Lorem ipsum dolor sit amet.</label>
        </li>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            name="report"
            id="four"
            value="Copy content"
          />
          <label htmlFor="four">Lorem ipsum dolor sit amet.</label>
        </li>
        <li>
          <input
            type="radio"
            onChange={getcCause}
            name="report"
            id="five"
            value="Copy content"
          />
          <label htmlFor="five">Lorem ipsum dolor sit amet.</label>
        </li>
      </ul>
      <div className="text-end">
        <button
          onClick={handleReport}
          className="btn base-bg-color-2 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ReportCauseList;
