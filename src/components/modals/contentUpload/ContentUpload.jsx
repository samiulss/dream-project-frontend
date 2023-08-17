import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { TagsInput } from 'react-tag-input-component';
import { rootUrl } from '../../../../config/backendUrl';
import { configData } from '../../../../config/tokenVerify';
import { ContentState } from '../../../context/StateContext';
import Filter from '../../commons/filter/Filter';
import Loading from '../../commons/loading/Loading';
import ProgressBar from '../../commons/progressBar/ProgressBar';
import './contentUpload.scss';

function ContentUpload() {
  const { loggedInUser } = ContentState();
  const [keywords, setkeywords] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [uploadedFiles, setuploadedFIles] = useState([]);
  const [catagory, setCatagory] = useState(null);
  const [showThumbnail, setShowThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [showProgress, setShowProgress] = useState(false);

  // HANDLE MODAL CONTROL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem('token');

  // SHOW THUMBNAIL
  const handleThumbnail = (e) => {
    if (e.target.files[0].size > 100000000) {
      toast.error('Thumbnail file size must be 100 KB');
    } else {
      const getUrl = URL.createObjectURL(e.target.files[0]);
      setShowThumbnail(getUrl);
    }
  };

  // REMOVE UPLOADED FILE
  const removeFile = (getFile) => {
    const afterRemove = uploadedFiles.filter((select) => select !== getFile);
    setuploadedFIles(afterRemove);
  };

  // HANDLE CONTENT UPLOAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!showThumbnail
      || !catagory
      || uploadedFiles.length === 0
      || keywords.length === 0) {
      toast.error('Please select all required fildes');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('email', loggedInUser.email);
    formData.append('thumbnail', e.target[0].files[0]);
    formData.append('title', e.target[1].value);
    formData.append('catagory', catagory);
    formData.append('keywords', keywords);

    // main files
    const mainFiles = uploadedFiles;
    for (let i = 0; i < mainFiles.length; i++) {
      const file = mainFiles[i];
      formData.append('mainFile', file);
    }

    try {
      const { data } = await axios.post(`${rootUrl}/api/contentUpload`, formData, configData(token));
      const { message, success } = data;
      if (success) {
        setLoading(false);
        toast.success(message);
        handleClose();
        setShowThumbnail(null);
        e.target[1].value = '';
        setCatagory(null);
        setkeywords([]);
        setuploadedFIles([]);
        setProgress(0);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const sizeCalculate = (size) => {
    const kb = Math.floor(size / 1024);
    if (kb > 1024) {
      const mb = Math.floor(kb / 1024);
      return `${mb} MB`;
    }
    return `${kb} KB`;
  };

  // DRAG AND DROP FUNCTIONALITY
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = async (files) => {
    setShowProgress(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append('mainFile', file);
      setSelectedFile((prev) => [...prev, { name: file.name, loading: 0, size: file.size }]);
    }

    try {
      await axios.post('/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (event) => {
          setProgress(Math.floor((event.loaded / event.total) * 100));

          setSelectedFile((prev) => {
            const newFiles = [...prev];
            newFiles[newFiles.length - 1].loading = Math.floor((event.loaded / event.total) * 100);
            return newFiles;
          });

          if (event.loaded === event.total) {
            setTimeout(() => {
              for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setuploadedFIles(
                  (prev) => [...prev, file]
                );
              }
              setProgress(0);
              setShowProgress(false);
              setSelectedFile([]);
            }, 1000);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE DRANG AND DROP UPLOAD
  const handleDragAndDrop = async (files) => {
    handleFiles(files);
  };

  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleDragAndDrop(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <>
      {/* ----------OPEN MODAL---------- */}
      <div onClick={handleShow} className="upload-content-btn rounded-5">
        <span className="svg-icon upload-logo" />
        <span className="fw-semibold click-to-upload-text">Click to Upload</span>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        {/* ----------MODAL CLOSE BUTTON---------- */}
        <div className="modal-header border-0 pb-0">
          <button onClick={handleClose} className="btn-close shadow-none base-bg-color-1 rounded-5 text-white mb-1" />
        </div>

        <Modal.Body className="content-upload-modal">
          <form onDragEnter={handleDrag} onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="upload-modal-body mb-4">
              <div className="row">

                {/* ----------LEFT SIDE---------- */}
                <div className="col-lg-6 left-side d-flex flex-column">
                  <div className="thumbnail">
                    {!showThumbnail
                      ? (
                        <label htmlFor="add-thumbnail" type="button" className="thumbnail-label rounded-3 border custom-border-color custom-bg-color d-flex flex-column justify-content-center align-items-center fs-5">
                          Thumbnail
                          <span className="limit-file-size">Maximum 100 KB</span>
                        </label>
                      )
                      : (
                        <img onClick={() => setShowThumbnail(null)} className="thumbnail-img img-fluid" type="button" src={showThumbnail} alt="" />
                      )}
                    <input type="file" onChange={handleThumbnail} className="d-none rounded-4" name="thumbnail" id="add-thumbnail" accept="image/*" />
                  </div>
                  <div className="title">
                    <input type="text" className="w-100 custom-bg-color custom-border-color rounded-2" placeholder="Add a Title" required />
                  </div>

                  {/* ----------CATAGORY LIST---------- */}
                  <div className="catagory-list">
                    <Filter catagory={catagory} setCatagory={setCatagory} />
                  </div>

                  {/* ----------KEYWORD LIST---------- */}
                  <div className="keywords-list">
                    <TagsInput
                      value={keywords}
                      onChange={setkeywords}
                      name="keywords"
                      placeHolder="Add Keywords and press Enter"
                      isEditOnRemove
                      beforeAddValidate={keywords.length > 14}
                    />
                    <p className="text-end mb-0">
                      *Maximum
                      {' '}
                      {keywords.length}
                      / 15 keyword
                    </p>
                  </div>
                </div>

                {/* <div className="vertical-line position-absolute custom-border-color" /> */}

                {/* ----------RIGHT SIDE---------- */}
                <div className="col-lg-6 right-side d-flex flex-column">

                  {/* ----------UPLOAD MAIN FILE---------- */}
                  <div className="upload-main-file d-flex flex-column">
                    <div className="upload-container rounded-2 mb-3">
                      <label htmlFor="main-file" className={dragActive ? 'rounded-3 text-center w-100 bg-white' : 'rounded-3 text-center w-100'} id="label-file-upload">
                        <span className="svg-icon upload-logo" />
                        <p className="text-center mb-2">Drag and drop files here or click</p>
                      </label>
                      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} /> }
                      <input type="file" className="d-none" onChange={handleChange} name="mainFile" id="main-file" multiple />
                    </div>
                    <p>
                      Total files :
                      {' '}
                      {uploadedFiles.length}
                    </p>

                    <div className="uploaded-file-list d-flex flex-column-reverse">
                      <div>

                        {/* ----------UPLOADED FILE LIST---------- */}
                        {
                          uploadedFiles.map((uploadFile, index) => (
                            <ul key={index} className="d-flex align-items-center justify-content-between border-bottom">
                              <li className="mb-0 text-dark upload-file-name" title={uploadFile.name}>
                                {uploadFile.name}
                                <br />
                                <small>
                                  File size:
                                  {' '}
                                  {sizeCalculate(uploadFile.size)}
                                </small>
                              </li>
                              <i type="button" onClick={() => removeFile(uploadFile)} className="fa-solid fa-xmark text-danger fs-5 me-3" />
                            </ul>
                          ))
                          }

                        {/* ----------UPLOADING FILE LIST---------- */}
                        {showProgress
                        && selectedFile.map((select, index) => (
                          <ProgressBar
                            key={index}
                            progress={progress}
                            showProgress={showProgress}
                            file={select}
                            sizeCalculate={sizeCalculate}
                            removeFile={removeFile}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ----------SUBMIT BUTTON---------- */}
            <div className="border-0 text-center">
              <button style={{ height: '45px' }} type="submit" className="btn w-50 base-bg-color-1 text-white rounded-5 border-0 p-0">
                {
                  loading ? <Loading /> : 'Submit'
                }
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Toaster />
    </>
  );
}

export default ContentUpload;
