import { useEffect, useRef, useState } from 'react';

function RejectCause({ setSelectCause, handleReject }) {
  const [custom, setCustom] = useState(false);

  const customRef = useRef();

  useEffect(() => {
    if (custom) {
      customRef.current.focus();
    }
  }, [custom]);

  const getcCause = (e) => {
    setSelectCause(e.target.value);
    if (e.target.value === 'custom') {
      setCustom(true);
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
            value="Need more qualityful"
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
          onClick={handleReject}
          className="btn base-bg-color-2 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default RejectCause;
