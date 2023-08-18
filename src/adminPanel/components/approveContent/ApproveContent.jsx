import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { rootUrl } from '../../../../config/backendUrl';
import Loading from '../../../components/commons/loading/Loading';
import ProgressBar from '../../../components/commons/progressBar/ProgressBar';
import { ContentState } from '../../../context/StateContext';
import './approveContent.scss';

function ApproveContent({ contentId, handleClose }) {
  const { fetchAgain, setFetchAgain } = ContentState();
  const [price, setPrice] = useState(false);
  const [licence, setLicence] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const inputRef = useRef();

  const handleprice = (e) => {
    setLicence(e.target.value);
    if (e.target.value === 'Premium') {
      setPrice(true);
    }
  };

  useEffect(() => {
    if (price) {
      inputRef.current.focus();
    }
  }, [price]);

  // HANDLE FILE
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const sizeCalculate = (size) => {
    const kb = Math.floor(size / 1024);
    if (kb > 1024) {
      const mb = Math.floor(kb / 1024);
      return `${mb} MB`;
    }
    return `${kb} KB`;
  };

  // REMOVE UPLOADED FILE
  const removeFile = () => {
    setFile(null);
  };

  // HANDLE SUBMIT CONTENT
  const handleApproveContent = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file) {
      setLoading(false);
      toast.error('Please select file');
      return;
    }
    if (!licence) {
      setLoading(false);
      toast.error('Please select licence');
      return;
    }
    if (licence === 'Premium' && e.target[3].value <= 0) {
      setLoading(false);
      toast.error('Please select price');
      return;
    }

    const config = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    const formData = new FormData();
    formData.append('contentId', contentId);
    formData.append('zipFile', e.target[0].files[0]);
    formData.append('licence', licence);
    formData.append('price', e.target[3].value);

    try {
      const { data } = await axios.post(
        `${rootUrl}/api/approve`,
        formData,
        config
      );
      handleClose();
      toast.success(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="approve-content-container d-flex flex-column">
      <form onSubmit={handleApproveContent}>
        <div className="add-files mt-1 mb-3 rounded-2">
          <input
            onChange={handleFile}
            className="d-none"
            type="file"
            name="zipFile"
            id="addfile"
          />
          <label
            htmlFor="addfile"
            type="button"
            className="d-flex align-items-center justify-content-center"
          >
            <i className="fa-solid fa-cloud-arrow-up fa-2xl text-primary fs-1" />
          </label>
        </div>

        {file && (
          <div className="uploaded-file d-flex align-items-center justify-content-between">
            <p className="mb-0 text-dark upload-file-name fw-semibold" title={file.name}>
              <i className="fa-solid fa-circle fa-xs text-dark me-1" />
              {file.name}
              <br />
              <small className="fw-normal">
                File size:
                {' '}
                {sizeCalculate(file.size)}
              </small>
            </p>
            <i
              type="button"
              onClick={removeFile}
              className="fa-solid fa-xmark text-danger fs-5 me-3"
            />
          </div>
        )}

        {showProgress && (
          <ProgressBar
            progress="10"
            showProgress={showProgress}
            file={file}
            sizeCalculate={sizeCalculate}
            removeFile={removeFile}
          />
        )}

        <div className="licence">
          <h5 className="fw-semibold">Licence</h5>
          <div className="mb-2">
            <input
              onChange={handleprice}
              onClick={() => setPrice(false)}
              className=""
              type="radio"
              role="button"
              name="licence"
              id="free"
              value="Free"
            />
            <label
              onClick={() => setPrice(false)}
              className="fs-5 text-danger"
              htmlFor="free"
              type="button"
            >
              Free
            </label>
          </div>
          <div>
            <input
              onChange={handleprice}
              className=""
              type="radio"
              role="button"
              name="licence"
              id="premium"
              value="Premium"
            />
            <label
              className="fs-5 text-warning"
              htmlFor="premium"
              type="button"
            >
              Premium
            </label>
          </div>
        </div>
        {price && (
          <div className="price mb-3">
            <h5 className="fw-semibold">Price</h5>
            <input
              ref={inputRef}
              className="form-control"
              type="number"
              name="price"
              id="price"
              step="any"
            />
          </div>
        )}
        <div className="confirm-btn text-end">
          <button
            style={{ height: '50px' }}
            type="submit"
            className="btn base-bg-color-1 rounded-5 text-white w-25"
          >
            {loading ? <Loading /> : 'Confirm'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApproveContent;
