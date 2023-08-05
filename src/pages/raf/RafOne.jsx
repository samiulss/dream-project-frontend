import { useRef, useState } from 'react';
import './raf.scss';

function RafOne() {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);

  function handleFile(files) {
    console.log(files);
  }

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
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  return (
    <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <div className="upload-container rounded-2">
        <label htmlFor="main-file" className={dragActive ? 'rounded-3 text-center w-100 bg-white' : 'rounded-3 text-center w-100'} id="label-file-upload">
          <span className="svg-icon upload-logo" />
          <p className="text-center mb-2">Drag and drop a file here or click</p>
        </label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} /> }
        <input type="file" className="d-none" onChange={handleChange} ref={inputRef} name="mainFile" id="main-file" multiple required />
      </div>
    </form>
  );
}

export default RafOne;
