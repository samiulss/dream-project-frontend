/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentState } from '../../context/StateContext';
import './contentList.scss';

function ContentList({ content, tooltip }) {
  const { url, id } = content;

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

  return (
    <div className="content">

      {/* --------------ALL IMAGE LIST-------------- */}
      <Link to={`/download/${id}`}>
        <img onClick={() => setGetContent(url)} className="img-fluid content-img" id={id} src={url} alt="" />
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
