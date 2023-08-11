import axios from 'axios';
import {
  lazy, Suspense, useEffect, useState
} from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import Filter from '../../components/commons/filter/Filter';
import NextPage from '../../components/commons/nextPage/NextPage';
import Spinner from '../../components/commons/spinner/Spinner';
import FollowingList from '../../components/followingList/FollowingList';
import Help from '../../components/help/Help';
import MainNavbar from '../../components/mainNavbar/MainNavbar';
import ContentUpload from '../../components/modals/contentUpload/ContentUpload';
import Profile from '../../components/profile/Profile';
import { ContentState } from '../../context/StateContext';
import './dashBoard.scss';

const Message = lazy(() => import('../../components/message/Message'));
const FileStatus = lazy(() => import('../../components/fileStatus/FileStatus'));
const Balance = lazy(() => import('../../components/balance/Balance'));
const DownloadList = lazy(() => import('../../components/downloadList/DownloadList'));
const FavouriteList = lazy(() => import('../../components/favouriteList/FavouriteList'));
const ContentList = lazy(() => import('../../components/contentList/ContentList'));

function DashBoard() {
  const { auth, fetchAgain } = ContentState();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [contents, setcontents] = useState([]);
  const [filterContent, setFilterContent] = useState([]);
  const [filterBox, setFilterBox] = useState(false);
  const [followList, setFollowList] = useState([]);
  const [catagory, setCatagory] = useState(null);

  // FETCH FILE STATUS
  const fetchContentStatus = async () => {
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/fileStatus`,
        config(auth)
      );
      setcontents(data);
      setFilterContent(data);
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };

  // FETCH FOLLOWING SELLER
  const fatchFollowing = async () => {
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/followingList`,
        config(auth)
      );
      setFollowList(data[0].following);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchContentStatus();
    fatchFollowing();
  }, [pathname, fetchAgain]);

  // FILTER BY CATAGORY
  useEffect(() => {
    if (catagory) {
      const filterCatagory = contents.filter(
        (favourite) => favourite.catagory === catagory
      );
      setFilterContent(filterCatagory);
    }
  }, [catagory]);

  const filterWise = (staus) => {
    const doFilter = filterContent.filter(
      (content) => content.status === staus
    );
    setcontents(doFilter);
  };

  const mobileDevice = window.matchMedia('(max-width: 768px)');

  return (
    <div className="dashboard">
      {/* ------------NAVBAR------------ */}
      <MainNavbar />

      <main className="container-fluid">
        <div className="row">

          {/* ------------LEFT SIDEBAR------------ */}
          <div className="col-2 left-sidebar pc-mode text-white">
            <div className="position-sticky">
              <div className="header">
                <h3 className="ms-3">Dashboard</h3>
              </div>

              <div className="menu d-flex flex-column ms-3">
                <ul>
                  <Link to="/profile">
                    <li
                      className={`${pathname === '/profile' && 'base-color-1'}`}
                    >
                      Profile
                    </li>
                  </Link>

                  <Link to="/upload">
                    <li
                      className={`${pathname === '/upload' && 'base-color-1'}`}
                    >
                      Upload
                    </li>
                  </Link>

                  <Link to="/message">
                    <li
                      className={`${pathname === '/message' && 'base-color-1'}`}
                    >
                      Message
                      <span className="ms-5 d-inline-block rounded-5 text-white message-notification">
                        01
                      </span>
                    </li>
                  </Link>

                  <Link to="/file-status">
                    <li
                      onClick={fetchContentStatus}
                      className={`${
                        pathname === '/file-status' && 'base-color-1'
                      }`}
                    >
                      File Status
                    </li>
                  </Link>

                  <Link to="/balance">
                    <li
                      className={`${pathname === '/balance' && 'base-color-1'}`}
                    >
                      Balance
                    </li>
                  </Link>

                  <Link to="/download-list">
                    <li
                      className={`${
                        pathname === '/download-list' && 'base-color-1'
                      }`}
                    >
                      Download
                    </li>
                  </Link>

                  <Link to="/my-content">
                    <li
                      className={`${
                        pathname === '/my-content' && 'base-color-1'
                      }`}
                    >
                      My Content
                    </li>
                  </Link>

                  <Link to="/following">
                    <li
                      className={`${
                        pathname === '/following' && 'base-color-1'
                      }`}
                    >
                      Following
                    </li>
                  </Link>

                  <Link to="/favourite">
                    <li
                      className={`${
                        pathname === '/favourite' && 'base-color-1'
                      }`}
                    >
                      Favourite
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            {/* <MobileSidebar fetchContentStatus={fetchContentStatus} /> */}
          </div>

          {/* ------------MAIN CONTENTR------------ */}
          <div
            className={
              pathname === '/upload'
                ? 'col-7 main-content d-flex align-items-center justify-content-center'
                : `${
                  mobileDevice.matches ? 'col-12' : 'col-10'
                } main-content d-flex align-items-start justify-content-center p-0`
            }
          >
            <div className="w-100">
              {/* ----------PROFILE SELTION---------- */}
              {pathname === '/profile' && (
                <div className="profile-section w-100">
                  <Suspense fallback={<Spinner />}>
                    <Profile />
                  </Suspense>
                </div>
              )}

              {/* ----------CONTENT UPLOAD SELTION---------- */}
              {pathname === '/upload' && (
                <div className="upload-content d-flex align-items-center justify-content-center">
                  <ContentUpload />
                </div>
              )}

              {/* ----------MESSAGE SELTION---------- */}
              {pathname === '/message' && (
                <div className="message-section overflow-x-auto">
                  <h4 className="text-center base-color-1 fw-semibold mb-4 mt-4">
                    Message
                  </h4>
                  <Suspense fallback={<Spinner />}>
                    <Message />
                  </Suspense>
                </div>
              )}

              {/* ----------FILE STATUS SELTION---------- */}
              {pathname === '/file-status' && (
                <div className="file-status pt-3">
                  <h4 className="text-center base-color-1 fw-semibold">
                    File Status
                  </h4>
                  <div className="file-status-list position-relative">
                    <Suspense fallback={<Spinner />}>
                      <div className="w-100 overflow-x-auto">
                        <table>
                          {/* ----------TABLE HEADING---------- */}
                          <thead>
                            <tr>
                              <th className="serial-no">No.</th>
                              <th className="name">Item Name</th>
                              <th className="date">Date</th>
                              <th
                                onClick={() => setFilterBox(!filterBox)}
                                role="button"
                              >
                                Status
                                <i className="fa-solid fa-caret-down text-dark ms-2" />
                              </th>
                            </tr>
                          </thead>
                          {contents.map((content, index) => (
                            <FileStatus
                              key={content._id}
                              content={content}
                              index={index}
                            />
                          ))}
                        </table>
                      </div>
                    </Suspense>
                    {filterBox && (
                      <div className="filter-menu rounded-3 p-1 position-absolute bg-white">
                        <ul>
                          <li
                            onClick={() => {
                              filterWise('Approved');
                              setFilterBox(!filterBox);
                            }}
                            className="text-success"
                          >
                            Approved
                          </li>
                          <li
                            onClick={() => {
                              filterWise('Pending');
                              setFilterBox(!filterBox);
                            }}
                            className="text-warning"
                          >
                            Pending
                          </li>
                          <li
                            onClick={() => {
                              filterWise('Rejected');
                              setFilterBox(!filterBox);
                            }}
                            className="text-danger"
                          >
                            Rejected
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ----------BALANCE SELTION---------- */}
              {pathname === '/balance' && (
                <div className="balance-section w-100 overflow-x-auto p-3">
                  <Suspense fallback={<Spinner />}>
                    <Balance />
                  </Suspense>
                </div>
              )}

              {/* ----------DOWNLOAD SELTION---------- */}
              {pathname === '/download-list' && (
                <div className="download-section w-100">
                  <h4 className="text-center base-color-1 fw-semibold mb-4 mt-4">
                    You have total 46 downloads in this week
                  </h4>
                  <Suspense fallback={<Spinner />}>
                    <DownloadList />
                  </Suspense>
                </div>
              )}

              {/* ----------MY CONTENT SELTION---------- */}
              {pathname === '/my-content' && (
                <div>
                  <Suspense fallback={<Spinner />}>
                    <div className="d-flex justify-content-end pt-3 pb-1">
                      <Filter setCatagory={setCatagory} catagory={catagory} />
                    </div>
                    <div className="my-content-scroll">
                      <div className="my-content-section w-100">
                        {catagory === null
                          ? contents.map((content) => (
                            <ContentList
                              key={content._id}
                              content={content}
                              tooltip="none"
                            />
                          ))
                          : filterContent.map((content) => (
                            <ContentList
                              key={content._id}
                              content={content}
                              tooltip="none"
                            />
                          ))}
                      </div>
                    </div>
                  </Suspense>
                  {contents.length > 10 && <NextPage />}
                </div>
              )}

              {pathname === '/following' && (
                <div className="w-100 overflow-x-auto p-3">
                  <Suspense fallback={<Spinner />}>
                    <div className="m-portlet__head-title">
                      <h4 className="text-center base-color-1 fw-semibold mb-4">
                        Following:
                        {' '}
                        {followList.length}
                      </h4>
                    </div>

                    {followList.map((follow) => (
                      <FollowingList
                        key={follow._id}
                        followingSeller={follow}
                      />
                    ))}
                  </Suspense>
                  {/* <NextPage /> */}
                </div>
              )}

              {pathname === '/favourite' && (
                <div>
                  <div className="d-flex justify-content-end pt-3 pb-1">
                    <Filter setCatagory={setCatagory} catagory={catagory} />
                  </div>
                  <Suspense fallback={<Spinner />}>
                    <div className="my-content-scroll">
                      <div className="my-content-section w-100">
                        <FavouriteList catagory={catagory} />
                      </div>
                    </div>
                  </Suspense>
                  {/* <NextPage /> */}
                </div>
              )}
            </div>
          </div>

          {/* ------------RIGHT SIDEBAR FOR UPLOADING GUIDLINE------------ */}
          {pathname === '/upload' && (
            <div className="col-3 right-sidebar text-white">
              <div className="header">
                <h3>Guidline</h3>
              </div>

              <div className="guidline-rules">
                <ul>
                  <li
                    data-bs-toggle="collapse"
                    href="#rule-01"
                    aria-controls="collapseExample"
                  >
                    Rule 01
                    <i className="fa-solid fa-caret-down p-1" />
                  </li>
                  <div className="collapse show ms-3" id="rule-01">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Eligendi molestiae ut inventore laudantium reprehenderit
                      est?
                    </p>
                  </div>

                  <li
                    data-bs-toggle="collapse"
                    href="#rule-02"
                    aria-controls="collapseExample"
                  >
                    Rule 02
                    <i className="fa-solid fa-caret-down" />
                  </li>
                  <div className="collapse ms-3" id="rule-02">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Eligendi molestiae ut inventore laudantium reprehenderit
                      est?
                    </p>
                  </div>

                  <li
                    data-bs-toggle="collapse"
                    href="#rule-03"
                    aria-controls="collapseExample"
                  >
                    Rule 03
                    <i className="fa-solid fa-caret-down" />
                  </li>
                  <div className="collapse ms-3" id="rule-03">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Eligendi molestiae ut inventore laudantium reprehenderit
                      est?
                    </p>
                  </div>

                  <li
                    data-bs-toggle="collapse"
                    href="#rule-04"
                    aria-controls="collapseExample"
                  >
                    Rule 04
                    <i className="fa-solid fa-caret-down" />
                  </li>
                  <div className="collapse ms-3" id="rule-04">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Eligendi molestiae ut inventore laudantium reprehenderit
                      est?
                    </p>
                  </div>

                  <li
                    data-bs-toggle="collapse"
                    href="#rule-05"
                    aria-controls="collapseExample"
                  >
                    Rule 05
                    <i className="fa-solid fa-caret-down" />
                  </li>
                  <div className="collapse ms-3" id="rule-05">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Eligendi molestiae ut inventore laudantium reprehenderit
                      est?
                    </p>
                  </div>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* -------------------GET HELP------------------- */}
      <Help />
      <Toaster />
    </div>
  );
}

export default DashBoard;
