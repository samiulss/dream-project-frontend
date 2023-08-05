/* eslint-disable react/prop-types */
import Progress from 'react-bootstrap/ProgressBar';

function ProgressBar({
  progress, showProgress, file, sizeCalculate, removeFile
}) {
  return (
    <ul className="border-bottom">
      <li className="mb-0 text-dark upload-file-name">
        {file.name}
        <br />
        <span>
          File size:
          {' '}
          {sizeCalculate(file.size)}
        </span>
      </li>
      {/* <i type="button" onClick={() => removeFile(file)} className="fa-solid fa-xmark text-danger fs-5 ms-2" /> */}
      {(showProgress) && <Progress className="w-100" now={progress} />}
    </ul>
  );
}

export default ProgressBar;
