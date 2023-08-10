import { Carousel } from '@trendyol-js/react-carousel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Arrow from '../../components/commons/arrow/Arrow';
import Loadng from '../../components/commons/loading/Loadng';
import Footer from '../../components/footer/Footer';
import Help from '../../components/help/Help';
import MainNavbar from '../../components/mainNavbar/MainNavbar';
// import SearchBox from '../../components/searchBox/SearchBox';
import { ContentState } from '../../context/StateContext';
import NotFound from '../notFound/NotFound';
import './download.scss';

function Download() {
  const { contentId } = useParams();
  const { loggedInUser, setShowLoginModal } = ContentState();

  const [content, setContent] = useState(null);
  const [file, setFile] = useState();
  const [noContent, setNoContent] = useState(false);

  const mobileDevice = window.matchMedia('(max-width: 480px)');

  const checkLogin = () => {
    if (!loggedInUser) {
      setShowLoginModal(true);
    }
  };

  const fetchSingleContent = async () => {
    try {
      const { data } = await axios.get(`https://dream-project-backend.onrender.com/api/singleContent?id=${contentId}`);
      setContent(data);
    } catch (error) {
      setNoContent(true);
    }
  };

  useEffect(() => {
    fetchSingleContent();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!noContent
        ? (
          <div className="download-page">

            {/* --------------NAVBER-------------- */}
            <MainNavbar />

            {/* --------------SEARCHBOX-------------- */}
            {/* <SearchBox /> */}

            {/* --------------JSDHJA-------------- */}
            {
                content
                  ? (
                    <>
                      <div className="container-fluid">
                        <div className="row align-items-center">

                          {/* -----------IMAGE CONTAINER SECTION----------- */}
                          <div className="col-md-8 border-end custom-border-color p-0">

                            {/* -----------CONTENT IMAGE----------- */}
                            <div className="content-image">
                              <img className="img-fluid" src={`https://dream-project-backend.onrender.com/uploads/${content?.thumbnail}`} alt="" />
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
                                  <img className="img-fluid" src="https://cdn-icons-png.flaticon.com/512/6386/6386976.png" alt="" />
                                </div>

                                {/* -----------AUTHOR NAME----------- */}
                                <div className="author-name">
                                  <h6 className="fw-semibold mb-0">{content?.author.name}</h6>
                                  <span>301 Resources</span>
                                </div>

                                {/* -----------AUTHOR FOLLOW BUTTON----------- */}
                                <div className="author-follow-btn">
                                  <button onClick={checkLogin} type="button" className="btn base-bg-color-1 text-white">Follow</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* -----------DOWNLOAD SECTION----------- */}
                          <div className="col-md-4 download-content">
                            <div className="advertise border d-flex align-items-center justify-content-center mb-4">
                              Advertise
                            </div>
                            <div className="content-download">
                              <Link
                                className="btn base-bg-color-1 text-white w-100 mb-3"
                                to={`https://dream-project-backend.onrender.com/api/downloadFile?id=${contentId}`}
                                download="Vector-file"
                                rel="noreferrer"
                              >
                                Download Free
                              </Link>
                            </div>
                            <div className="action-buttons d-flex justify-content-between mb-4 flex-wrap">
                              <div className="report-btn">
                                <button type="button" className="btn-light custom-border-color">
                                  <i className="fa-solid fa-flag" />
                                  <br />
                                  Report
                                </button>
                              </div>
                              <div className="favourite-btn">
                                <button type="button" className="btn-light custom-border-color">
                                  <i className="fa-solid fa-heart" />
                                  <br />
                                  Favourite
                                </button>
                              </div>
                              <div className="share-btn">
                                <button type="button" className="btn-light custom-border-color">
                                  <i className="fa-solid fa-share-nodes" />
                                  <br />
                                  Share
                                </button>
                              </div>
                            </div>
                            <div className="file-details">
                              <div className="file-type">
                                <span className="me-4 fw-semibold file-title">File Type : EPS, AI</span>
                                <span className="how">How to edit?</span>
                              </div>
                              <div className="file-license">
                                <span className="me-4 fw-semibold file-title">File License : Free</span>
                                <span className="how">What is this?</span>
                              </div>
                            </div>
                          </div>
                        </div>

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
                            {/* {
              fakeData.map((contents) => <Link to={`/download/${contents.id}`} key={contents.id}><img onClick={() => setGetContent(contents.url)} key={contents.id} src={contents.url} alt="" /></Link>)
          } */}
                          </Carousel>
                        </div>
                      </div>

                      {/* -------------------GET HELP------------------- */}
                      <Help />

                      {/* --------------FOOTER-------------- */}
                      <Footer />
                    </>
                  )

                  : (
                    <div className="no-contentloading d-flex align-items-center justify-content-center vh-100">
                      <Loadng />
                    </div>
                  )
              }
          </div>
        )
        : <NotFound />}
    </>
  );
}

export default Download;
