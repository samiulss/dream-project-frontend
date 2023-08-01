import { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import Filter from '../../commons/filter/Filter';
import './contentUpload.scss';

function ContentUpload() {
  const [selected, setSelected] = useState([]);
  const [fileTitle, setFileTitle] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getFilesName = (e) => {
    const filesName = [];
    for (let i = 0; i < e.target.files.length; i += 1) {
      const file = e.target.files[i];
      filesName.push(file.name);
    }
    setFileTitle([filesName]);
  };

  return (
    <>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered content-upload-modal">
          <div className="modal-content">

            {/* ----------MODAL CLOSE BUTTON---------- */}
            <div className="modal-header border-0">
              <button type="button" title="Close" className="btn-close shadow-none base-bg-color-1 rounded-5 text-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body upload-modal-body position-relative">
                <div className="row align-items-center">

                  {/* ----------LEFT SIDE---------- */}
                  <div className="col-md-5 left-side">
                    <div className="thumbnail">
                      <label htmlFor="add-thumbnail" className="rounded-4 custom-border-color custom-bg-color d-flex flex-column justify-content-center align-items-center mb-4 fs-5">
                        Thumbnail
                        <span className="limit-file-size">Maximum 100 KB</span>
                      </label>
                      <input type="file" className="d-none rounded-4" name="" id="add-thumbnail" accept="image/*" />
                    </div>
                    <div className="title">
                      <input type="text" className="w-100 custom-bg-color custom-border-color rounded-2" placeholder="Add a Title" required />
                    </div>
                  </div>

                  <div className="vertical-line position-absolute custom-border-color" />

                  {/* ----------RIGHT SIDE---------- */}
                  <div className="col-md-7 right-side d-flex flex-column">

                    {/* ----------CATAGORY LIST---------- */}
                    <div className="catagory-list">
                      <h6 className="fw-semibold">Catagory</h6>
                      <Filter />
                    </div>

                    {/* ----------UPLOAD MAIN FILE---------- */}
                    <div className="upload-main-file d-flex flex-column">
                      <h6 className="fw-semibold mb-0">Upload your file</h6>
                      <div className="upload-container d-flex align-items-center">
                        <label htmlFor="main-file" className="rounded-3 d-flex align-items-center justify-content-center">
                          <span className="svg-icon upload-logo" />
                        </label>
                        <input type="file" className="d-none" onChange={getFilesName} name="" id="main-file" multiple />
                        <span className="limit-file-size">Maximum : 85MB</span>
                      </div>

                      {/* ----------FILES NAME---------- */}
                      <div>
                        <input type="text" className="form-control files-name shadow-none" value={fileTitle.map((e) => e)} id="exampleFormControlInput1" disabled />
                      </div>
                    </div>

                    {/* ----------KEYWORD LIST---------- */}
                    <div className="keywords-list">
                      <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="keywords"
                        placeHolder="Add Keywords"
                        separators=", ;"
                        isEditOnRemove
                        beforeAddValidate={selected.length > 14}
                      />
                      <p className="text-end mb-0">
                        *Maximum
                        {' '}
                        {selected.length}
                        / 15 keyword
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="submit" className="btn base-bg-color-1 text-white rounded-5 border-0">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentUpload;
