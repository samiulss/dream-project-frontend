import './reportCauseList.scss';

function ReportCauseList({ setReportCause, handleReport }) {
  const getcCause = (e) => {
    setReportCause(e.target.value);
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
