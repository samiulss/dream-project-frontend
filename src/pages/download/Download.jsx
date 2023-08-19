import { Carousel } from '@trendyol-js/react-carousel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useParams } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import Arrow from '../../components/commons/arrow/Arrow';
import Spinner from '../../components/commons/spinner/Spinner';
import Footer from '../../components/footer/Footer';
import Help from '../../components/help/Help';
import MainNavbar from '../../components/mainNavbar/MainNavbar';
import PopUpModal from '../../components/modals/popUpModal/PopUpModal';
import { ContentState } from '../../context/StateContext';
import NotFound from '../notFound/NotFound';
import './download.scss';

function Download() {
  const { contentId } = useParams();
  const {
    auth,
    loggedInUser,
    fetchAgain,
    setFetchAgain,
    setPopUpModal,
  } = ContentState();

  const [content, setContent] = useState(null);
  const [totalContent, setTotalContent] = useState('');
  const [relatedContents, setRelatedContents] = useState([]);
  const [noContent, setNoContent] = useState(false);
  const [followingSeller, setFollowingSeller] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [report, setReport] = useState(false);
  const [shareLink, setShareLink] = useState(false);
  const [relatedContentUrl, setRelatedContentUrl] = useState('');

  const { pathname } = useLocation();

  const mobileDevice = window.matchMedia('(max-width: 480px)');

  // HANDLE FOLLOW SELLER
  const handleFollow = async () => {
    if (!loggedInUser) {
      toast.error('Please log in first');
      return;
    }
    const userId = {
      id: content.author._id,
    };
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/followPeople`,
        userId,
        config(auth)
      );
      toast.success(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // HANDLE UNFOLLOW SELLER
  const handleUnfollow = async () => {
    const userId = {
      id: content.author._id,
    };
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/unfollowPeople`,
        userId,
        config(auth)
      );
      toast.success(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // FETCH DOWNLOAD CONTENT
  const fetchDownloadingContent = async () => {
    setRelatedContents([]);
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/singleContent?id=${contentId || relatedContentUrl}`
      );
      setContent(data.content);
      setTotalContent(data.total);
      const relatedData = data.relatedContents[0].filter(
        (item) => item._id !== data.content._id
      );
      setRelatedContents(relatedData);
    } catch (error) {
      setNoContent(true);
    }
  };

  const handleDownloadCount = async () => {
    try {
      await axios.post(
        `${rootUrl}/api/downloadCount?id=${contentId || relatedContentUrl}`
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  // SELLER FOLLOWING OR NOT
  const checkFollower = async () => {
    if (!loggedInUser) {
      toast.error('Please log in first');
      return;
    }
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/followingList`,
        config(auth)
      );
      setFollowingSeller(data[0].following);
    } catch (error) {
      console.log(error.message);
    }
  };

  // FETCH FAVOURITE CONTENT
  const favouriteContents = async () => {
    if (!loggedInUser) {
      return;
    }
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/favouriteList`,
        config(auth)
      );
      setFavourites(data[0].favourite);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // // HANDLE FAVOURITE
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

  // HANDLE REPORT
  const handleReport = () => {
    if (!loggedInUser) {
      toast.error('Please log in first');
      return;
    }
    setReport(true);
    setShareLink(false);
    setPopUpModal(true);
  };

  // HANDLE SHARE LINK
  const handleShareLink = () => {
    setShareLink(true);
    setReport(false);
    setPopUpModal(true);
  };

  // RELATED CONTENT URL
  const rContentUrl = (url) => {
    setContent(null);
    setRelatedContentUrl(url);
  };

  useEffect(() => {
    fetchDownloadingContent();
    favouriteContents();
    if (loggedInUser) {
      checkFollower();
    }
  }, [fetchAgain, relatedContentUrl, pathname]);

  return (
    <>
      {!noContent ? (
        <div className="download-page">
          {/* --------------NAVBER-------------- */}
          <MainNavbar />

          {/* --------------CONTENT DETAILS-------------- */}
          {content ? (
            <>
              <div className="container-fluid mb-4">
                <div className="row align-items-center">
                  {/* -----------IMAGE CONTAINER SECTION----------- */}
                  <div className="col-md-8 border-end custom-border-color p-0">
                    {/* -----------CONTENT IMAGE----------- */}
                    <div className="content-image d-flex align-items-center justify-content-center">
                      <>
                        {content && (
                          <img
                            className="img-fluid"
                            src={`${rootUrl}/${content?.thumbnail}`}
                            alt=""
                          />
                        )}
                      </>
                    </div>

                    {/* -----------CONTENT TITLE----------- */}
                    <div className="content-title text-center mb-3">
                      <h1 className="fs-4">{content?.title}</h1>
                    </div>

                    {/* -----------CONTENT AUTHOR----------- */}
                    <div className="content-author border-top border-bottom custom-border-color">
                      <div className="d-flex align-items-center ms-3">
                        {/* -----------AUTHOR AVATER----------- */}
                        <div className="author-avater">
                          <img
                            className="img-fluid"
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                            alt=""
                          />
                        </div>

                        {/* -----------AUTHOR NAME----------- */}
                        <div className="author-name">
                          <Link to={`/seller/${content.author._id}`}>
                            <h6 className="fw-semibold mb-0" type="button">
                              {content?.author.name}
                            </h6>
                          </Link>
                          <span>
                            {totalContent}
                            {' '}
                            Resources
                          </span>
                        </div>

                        {/* -----------AUTHOR FOLLOW BUTTON----------- */}
                        {loggedInUser?.id !== content.author._id && (
                          <div className="author-follow-btn">
                            {followingSeller.find(
                              (seller) => seller._id === content.author._id
                            ) ? (
                              <button
                                onClick={handleUnfollow}
                                type="button"
                                className="btn base-bg-color-1 text-white"
                              >
                                Unfollow
                              </button>
                              ) : (
                                <button
                                  onClick={handleFollow}
                                  type="button"
                                  className="btn base-bg-color-1 text-white"
                                >
                                  Follow
                                </button>
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* -----------DOWNLOAD SECTION----------- */}
                  <div className="col-md-4 download-content">
                    <div className="advertise border d-flex align-items-center justify-content-center mb-4">
                      Advertise
                    </div>
                    {content.licence === 'Free' ? (
                      <div className="content-download">
                        <Link
                          onClick={handleDownloadCount}
                          className="btn base-bg-color-1 text-white w-100 mb-3"
                          to={`${rootUrl}/api/downloadFile?id=${
                            contentId || relatedContentUrl
                          }`}
                          target="_blank"
                          download={content.title}
                          rel="noreferrer"
                        >
                          Download Free
                        </Link>
                      </div>
                    ) : (
                      <div className="content-download">
                        <Link
                          // onClick={handleDownloadCount}
                          className="btn base-bg-color-1 text-white w-100 mb-3"
                          // to={`${rootUrl}/api/downloadFile?id=${
                          //   contentId || relatedContentUrl
                          // }`}
                          // download={content.title}
                          // rel="noreferrer"
                        >
                          Premium Download
                          {' '}
                          (
                          {content.price}
                          {' '}
                          BDT)
                        </Link>
                      </div>
                    )}
                    <div className="action-buttons d-flex justify-content-between mb-4 flex-wrap">
                      <div className="report-btn">
                        <button
                          type="button"
                          onClick={handleReport}
                          className="btn-light custom-border-color"
                        >
                          <i className="fa-solid fa-flag" />
                          <br />
                          Report
                        </button>
                      </div>
                      <div className="favourite-btn">
                        {favourites.find(
                          (favourite) => favourite._id === content._id
                        ) ? (
                          <button
                            type="button"
                            onClick={() => handleUnfavourite(content._id)}
                            className="btn-light custom-border-color w-100"
                          >
                            <i className="fa-solid fa-heart text-danger" />
                            <br />
                            Unfavourite
                          </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleFavourite(content._id)}
                              className="btn-light custom-border-color"
                            >
                              <i className="fa-solid fa-heart" />
                              <br />
                              Favourite
                            </button>
                          )}
                      </div>
                      <div className="share-btn">
                        <button
                          type="button"
                          onClick={handleShareLink}
                          className="btn-light custom-border-color"
                        >
                          <i className="fa-solid fa-share-nodes" />
                          <br />
                          Share
                        </button>
                      </div>
                    </div>
                    <div className="file-details">
                      <div className="file-type">
                        <span className="me-4 fw-semibold file-title">
                          File Type : EPS, AI
                        </span>
                        <span className="how">How to edit?</span>
                      </div>
                      <div className="file-license">
                        <span className="me-4 fw-semibold file-title">
                          File License :
                          {' '}
                          {content.licence}
                        </span>
                        <span className="how">What is this?</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* -------------------related-content------------------- */}
                {relatedContents.length > 0 && (
                  <div className="related-content mt-4 mb-5">
                    <h5 className="ms-2 mb-3">Related Content</h5>
                    <Carousel
                      show={mobileDevice.matches ? 2 : 4}
                      slide={mobileDevice.matches ? 1.5 : 3.5}
                      swiping
                      leftArrow={<Arrow />}
                      rightArrow={<Arrow right="right" />}
                      infinite={false}
                    >
                      {relatedContents.map((item) => (
                        <Link to={`/download/${item._id}`} key={item._id}>
                          <img
                            onClick={() => rContentUrl(item._id)}
                            key={item.id}
                            src={`${rootUrl}/${item.thumbnail}`}
                            alt={item.title}
                          />
                        </Link>
                      ))}
                    </Carousel>
                  </div>
                )}
              </div>

              {/* -------------------GET HELP------------------- */}
              <Help />

              {/* --------------FOOTER-------------- */}
              <Footer />
            </>
          ) : (
            <div className="no-contentloading d-flex align-items-center justify-content-center">
              <Spinner />
            </div>
          )}
        </div>
      ) : (
        <NotFound />
      )}
      <PopUpModal report={report} shareLink={shareLink} path={pathname} />
    </>
  );
}

export default Download;
