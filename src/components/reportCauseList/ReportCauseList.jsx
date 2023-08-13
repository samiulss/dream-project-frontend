import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ContentState } from '../../context/StateContext';
import './reportCauseList.scss';

function ReportCauseList() {
  const { setPopUpModal } = ContentState();
  const [selectCause, setSelectCause] = useState('');

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
        <li onClick={(e) => setSelectCause(e.target.innerText)}>
          {selectCause !== 'Cause 1' && <i className="fa-regular fa-circle me-2" />}
          {selectCause === 'Cause 1' && <i className="fa-solid fa-circle me-2" />}
          Cause 1
        </li>
        <li onClick={(e) => setSelectCause(e.target.innerText)}>
          {selectCause !== 'Cause 2' && <i className="fa-regular fa-circle me-2" />}
          {selectCause === 'Cause 2' && <i className="fa-solid fa-circle me-2" />}
          Cause 2
        </li>
        <li onClick={(e) => setSelectCause(e.target.innerText)}>
          {selectCause !== 'Cause 3' && <i className="fa-regular fa-circle me-2" />}
          {selectCause === 'Cause 3' && <i className="fa-solid fa-circle me-2" />}
          Cause 3
        </li>
        <li onClick={(e) => setSelectCause(e.target.innerText)}>
          {selectCause !== 'Cause 4' && <i className="fa-regular fa-circle me-2" />}
          {selectCause === 'Cause 4' && <i className="fa-solid fa-circle me-2" />}
          Cause 4
        </li>
        <li onClick={(e) => setSelectCause(e.target.innerText)}>
          {selectCause !== 'Cause 5' && <i className="fa-regular fa-circle me-2" />}
          {selectCause === 'Cause 5' && <i className="fa-solid fa-circle me-2" />}
          Cause 5
        </li>
      </ul>
      <div className="text-end">
        <button onClick={handleReport} className="btn base-bg-color-2 text-white">Submit</button>
      </div>
    </div>
  );
}

export default ReportCauseList;
