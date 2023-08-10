/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentState } from '../../context/StateContext';
import './contentList.scss';

function ContentList({ content, tooltip }) {
  const { thumbnail, _id } = content;

  const { setGetContent } = ContentState();

  const [inView, setInView] = useState(false);

  const imgRef = useRef();

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback);

    if (imgRef?.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const fetchSingleContent = async () => {
    try {
      const { data } = await axios.get(`https://dream-project-backend.onrender.com/api/singleContent?id=${_id}`);
      setGetContent(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="content">

      {/* --------------ALL IMAGE LIST-------------- */}
      <Link to={`/download/${_id}`}>
        <img onClick={fetchSingleContent} className="img-fluid content-img" id={_id} src={`https://dream-project-backend.onrender.com/uploads/${thumbnail}`} alt="" />
      </Link>

      {/* --------------TOOLTIP-------------- */}
      {tooltip !== 'none'
        && (
        <div className="tool-tip-container">
          <div className="mb-2">
            <div className="tool-tip">
              <span className="text">Collection</span>
              <span className="svg-icon collection-icon" />
            </div>
          </div>

          <div>
            <div className="tool-tip">
              <span className="love-text text">Favourite</span>
              <span className="svg-icon love-icon" />
            </div>
          </div>
        </div>
        )}
    </div>
  );
}

export default ContentList;
