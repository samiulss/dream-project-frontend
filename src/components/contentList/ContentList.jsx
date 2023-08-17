/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import { ContentState } from '../../context/StateContext';
import './contentList.scss';

function ContentList({ content, tooltip, favourites }) {
  const { thumbnail, _id } = content;

  const {
    auth, loggedInUser, fetchAgain, setFetchAgain
  } = ContentState();

  const [inView, setInView] = useState(false);

  const imgRef = useRef();

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  // HANDLE FAVOURITE
  const handleFavourite = async (id) => {
    if (!loggedInUser) {
      toast.error('Please log in first');
      return;
    }
    const selectContent = {
      contentId: id,
    };
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/addFevourite`,
        selectContent,
        config(auth)
      );
      toast.success(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // HANDLE UNFAVOURITE
  const handleUnfavourite = async (id) => {
    const selectContent = {
      contentId: id,
    };
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/removeFevourite`,
        selectContent,
        config(auth)
      );
      toast.success(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error(error.message);
    }
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
      <Link to={`/download/${_id}`}>
        <img
          className="img-fluid content-img"
          loading="lazy"
          width="100%"
          height="400"
          id={_id}
          src={`${rootUrl}/uploads/${thumbnail}`}
          alt={content.title}
        />
      </Link>

      {/* --------------TOOLTIP-------------- */}
      {tooltip !== 'none' && (
        <div className="tool-tip-container">
          <div className="mb-2">
            <div className="tool-tip">
              <span className="text">Collection</span>
              <span className="svg-icon collection-icon" />
            </div>
          </div>

          <div>
            <div className="tool-tip">
              {favourites.find((favourite) => favourite._id === content._id) ? (
                <span
                  onClick={() => handleUnfavourite(content._id)}
                  className="love-text text"
                >
                  Unfavourite
                </span>
              ) : (
                <span
                  onClick={() => handleFavourite(content._id)}
                  className="love-text text"
                >
                  Favourite
                </span>
              )}

              {favourites.find((favourite) => favourite._id === content._id) ? (
                <span
                  onClick={() => handleUnfavourite(content._id)}
                  className="svg-icon fa-solid fa-heart d-flex align-items-center justify-content-center"
                />
              ) : (
                <span
                  onClick={() => handleFavourite(content._id)}
                  className="svg-icon love-icon"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentList;
