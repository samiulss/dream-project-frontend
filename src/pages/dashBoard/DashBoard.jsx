import axios from 'axios';
import {
  lazy, Suspense, useEffect, useState
} from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import Filter from '../../components/commons/filter/Filter';
import NextPage from '../../components/commons/nextPage/NextPage';
import Spinner from '../../components/commons/spinner/Spinner';
import Help from '../../components/help/Help';
import MainNavbar from '../../components/mainNavbar/MainNavbar';
import PopUpModal from '../../components/modals/popUpModal/PopUpModal';
import { ContentState } from '../../context/StateContext';
import OnScreenMessage from '../../shareComponent/onScreentMessage/OnScreenMessage';
import './dashBoard.scss';

const Profile = lazy(() => import('../../components/profile/Profile'));
const FavouriteList = lazy(() => import('../../components/favouriteList/FavouriteList'));
const FollowingList = lazy(() => import('../../components/followingList/FollowingList'));
const DownloadHistory = lazy(() => import('../../components/downloadHistory/DownloadHistory'));
const ContentUpload = lazy(() => import('../../components/modals/contentUpload/ContentUpload'));
const Notification = lazy(() => import('../../components/message/Notification'));
const FileStatus = lazy(() => import('../../components/fileStatus/FileStatus'));
const Balance = lazy(() => import('../../components/balance/Balance'));
const DownloadList = lazy(() => import('../../components/downloadList/DownloadList'));
const ContentList = lazy(() => import('../../components/contentList/ContentList'));

function DashBoard() {
  const {
    auth,
    loggedInUser,
    notifications,
    followList,
    favourites,
    downloadHistory,
    loading,
    setLoading,
    setPopUpModal,
    catagory,
    setCatagory,
    fetchAgain
  } = ContentState();

  const { pathname } = useLocation();

  const [contents, setcontents] = useState([]);
  const [approvedContent, setApprovedContent] = useState([]);
  const [filterContent, setFilterContent] = useState([]);
  const [filterBox, setFilterBox] = useState(false);
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    document.body.addEventListener('click', () => {
      setFilterBox(false);
    });
  }, [filterBox]);

  // FETCH FILE STATUS

  const fetchContentStatus = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/fileStatus`,
        config(auth)
      );
      setLoading(false);
      setcontents(data);
      setFilterContent(data);
      const findApproved = data.filter((item) => item.status === 'Approved');
      setApprovedContent(findApproved);
      const downloadedFiles = data.filter((item) => item.downloadCount > 0);
      setDownloads(downloadedFiles);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchContentStatus();
  }, [fetchAgain]);

  // FILTER BY CATAGORY
  useEffect(() => {
    if (catagory) {
      const filterCatagory = approvedContent.filter(
        (favourite) => favourite.catagory === catagory
      );
      setFilterContent(filterCatagory);
    }
  }, [catagory]);

  // FILTER BY STATUS
  const filterWise = (staus) => {
    const doFilter = filterContent.filter(
      (content) => content.status === staus
    );
    setcontents(doFilter);
  };

  const mobileDevice = window.matchMedia('(max-width: 768px)');

  return (
    <>
      <MainNavbar />
      <div className="dashboard">
        {/* ------------NAVBAR------------ */}

        <main className="container-fluid">
          <div className="row">
            {/* ------------LEFT SIDEBAR------------ */}
            <div className="col-2 left-sidebar pc-mode text-white">
              <div className="position-sticky">
                <div className="header">
                  <h5 className="ms-3">Dashboard</h5>
                </div>

                <div className="menu d-flex flex-column ms-3">
                  <ul>
                    <Link to="/profile">
                      <li
                        className={`${
                          pathname === '/profile' && 'base-color-1'
                        }`}
                      >
                        Profile
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

                    <Link to="/following">
                      <li
                        className={`${
                          pathname === '/following' && 'base-color-1'
                        }`}
                      >
                        Following
                      </li>
                    </Link>
                    <Link to="/download-history">
                      <li
                        className={`${
                          pathname === '/download-history' && 'base-color-1'
                        }`}
                      >
                        Download history
                      </li>
                    </Link>

                    {loggedInUser?.role === 'seller' && (
                      <>
                        <Link to="/upload">
                          <li
                            className={`${
                              pathname === '/upload' && 'base-color-1'
                            }`}
                          >
                            Upload
                          </li>
                        </Link>

                        <Link to="/notification">
                          <li
                            className={`${
                              pathname === '/notification' && 'base-color-1'
                            }`}
                          >
                            Notification
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
                            className={`${
                              pathname === '/balance' && 'base-color-1'
                            }`}
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
                      </>
                    )}
                  </ul>
                  {loggedInUser.role === 'user' && (
                    <div className="be-seller-btn">
                      <button
                        onClick={() => setPopUpModal(true)}
                        className="btn base-bg-color-1 text-white"
                      >
                        Be a Seller
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* <MobileSidebar fetchContentStatus={fetchContentStatus} /> */}
            </div>

            {/* ------------MAIN CONTENTR------------ */}
            <div
              className={
                pathname === '/upload'
                  ? 'col-7 main-content d-flex align-items-center justify-content-center m-auto'
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
                      <Profile fullDetails />
                    </Suspense>
                  </div>
                )}

                {/* ----------FOLLOWING SELTION---------- */}
                {pathname === '/following' && (
                  <div className="w-100 overflow-x-auto p-3">
                    <Suspense fallback={<Spinner />}>
                      <div className="m-portlet__head-title">
                        <h4 className="text-center base-color-1 fw-semibold mb-4">
                          Following (
                          {followList.length}
                          )
                        </h4>
                      </div>

                      {followList.length > 0 ? (
                        <>
                          {followList.map((follow) => (
                            <FollowingList
                              key={follow._id}
                              followingSeller={follow}
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <div
                              style={{ height: 'calc(100vh - 155px)' }}
                              className="d-flex align-items-center justify-content-center"
                            >
                              <span className="fs-4">Following list empty</span>
                            </div>
                          )}
                        </>
                      )}
                    </Suspense>
                    {/* <NextPage /> */}
                  </div>
                )}

                {/* ----------FAVOURITE SELTION---------- */}
                {pathname === '/favourite' && (
                  <>
                    <div className="d-flex justify-content-end pt-3 pb-1">
                      <Filter setCatagory={setCatagory} catagory={catagory} />
                    </div>
                    <Suspense fallback={<Spinner />}>
                      {favourites.length > 0 ? (
                        <div className="my-content-section w-100 overflow-auto">
                          <FavouriteList />
                        </div>
                      ) : (
                        <>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <div
                              style={{ height: 'calc(100vh - 155px)' }}
                              className="d-flex align-items-center justify-content-center"
                            >
                              <span className="fs-4">Favourite list empty</span>
                            </div>
                          )}
                        </>
                      )}
                    </Suspense>

                    {/* <NextPage /> */}
                  </>
                )}

                {/* ----------DOWNLOAD HISTORY SELTION---------- */}
                {pathname === '/download-history' && (
                  <div className="download-section download-list pt-3 w-100 position-relative">
                    <Suspense fallback={<Spinner />}>
                      <div className="w-100 overflow-x-auto">
                        <h4 className="text-center base-color-1 fw-semibold mb-4">
                          Downloaded (
                          {downloadHistory.length}
                          )
                        </h4>
                        <table>
                          {/* ----------TABLE HEADING---------- */}
                          <thead>
                            <tr>
                              <th className="serial-no">NO.</th>
                              <th className="name">Item Name</th>
                              <th
                                onClick={() => setFilterBox(!filterBox)}
                                role="button"
                                className="position-relative"
                              >
                                Time
                                {/* <i className="fa-solid fa-caret-down text-dark ms-2" /> */}
                              </th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          {downloadHistory.map((item, i) => (
                            <DownloadHistory
                              key={item._id}
                              item={item}
                              index={i}
                              dHistoryData
                            />
                          ))}
                        </table>
                      </div>
                    </Suspense>
                  </div>
                )}

                {/* ----------CONTENT UPLOAD SELTION---------- */}
                {pathname === '/upload' && (
                  <div className="upload-content d-flex align-items-center justify-content-center">
                    <Suspense fallback={<Spinner />}>
                      <ContentUpload />
                    </Suspense>
                  </div>
                )}

                {/* ----------NOTIFICATION SELTION---------- */}
                {pathname === '/notification' && (
                  <div className="message-section overflow-x-auto pt-3">
                    <h4 className="text-center base-color-1 fw-semibold mb-4">
                      Notification
                    </h4>
                    <Suspense fallback={<Spinner />}>
                      {notifications.length > 0 ? (
                        <table className="message-list w-100">
                          <thead>
                            <tr className="border-0">
                              <th className="ps-4">No.</th>
                              <th>Item Name</th>
                              <th>Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <>
                            {notifications.map((item, i) => (
                              <Notification
                                key={item._id}
                                index={i}
                                item={item}
                                notificationData
                              />
                            ))}
                          </>
                        </table>
                      ) : (
                        <>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <div
                              style={{ height: 'calc(100vh - 155px)' }}
                              className="d-flex align-items-center justify-content-center"
                            >
                              <span className="fs-4">No new notification</span>
                            </div>
                          )}
                        </>
                      )}
                    </Suspense>
                  </div>
                )}

                {/* ----------FILE STATUS SELTION---------- */}
                {pathname === '/file-status' && (
                  <div className="file-status pt-3">
                    <h4 className="text-center base-color-1 fw-semibold">
                      All Content
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
                                  onClick={(e) => {
                                    setFilterBox(!filterBox);
                                    e.stopPropagation();
                                  }}
                                  role="button"
                                >
                                  Status
                                  <i className="fa-solid fa-caret-down text-dark ms-2" />
                                </th>
                              </tr>
                            </thead>

                            {contents.length > 0
                              && contents.map((content, index) => (
                                <FileStatus
                                  key={content._id}
                                  item={content}
                                  index={index}
                                  fileStatusData
                                />
                              ))}
                          </table>
                          <>
                            {contents.length === 0 && (
                              <div
                                style={{ height: 'calc(100vh - 165px)' }}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <span className="fs-4">No content</span>
                              </div>
                            )}
                          </>
                        </div>
                      </Suspense>
                      {filterBox && (
                        <div className="filter-menu filter-menu-file-status rounded-3 p-1 position-absolute bg-white">
                          <ul onClick={() => setFilterBox(!filterBox)}>
                            <li
                              onClick={() => filterWise('Approved')}
                              className="text-success"
                            >
                              Approved
                            </li>
                            <li
                              onClick={() => filterWise('Pending')}
                              className="text-warning"
                            >
                              Pending
                            </li>
                            <li
                              onClick={() => filterWise('Rejected')}
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
                  <div className="download-section download-list w-100 pt-3 position-relative">
                    <h4 className="text-center base-color-1 fw-semibold mb-4">
                      Downloaded files (
                      {downloads.length}
                      )
                    </h4>
                    <Suspense fallback={<Spinner />}>
                      {downloads.length > 0 ? (
                        <div className="w-100 overflow-x-auto">
                          <table>
                            {/* ----------TABLE HEADING---------- */}
                            <thead>
                              <tr>
                                <th className="serial-no">NO.</th>
                                <th className="name">Item Name</th>
                                <th
                                  onClick={() => setFilterBox(!filterBox)}
                                  role="button"
                                  className="position-relative"
                                >
                                  Download count
                                  {/* <i className="fa-solid fa-caret-down text-dark ms-2" /> */}
                                </th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            {downloads.map((item, i) => (
                              <DownloadList
                                key={item._id}
                                index={i}
                                item={item}
                                downloadListData
                              />
                            ))}
                          </table>
                        </div>
                      ) : (
                        <>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <div
                              style={{ height: 'calc(100vh - 155px)' }}
                              className="d-flex align-items-center justify-content-center"
                            >
                              <span className="fs-4">No download</span>
                            </div>
                          )}
                        </>
                      )}
                    </Suspense>
                    {/* {filterBox && (
                    <div className="filter-menu filter-menu-download rounded-3
                     p-1 position-absolute bg-white">
                      <ul onClick={() => setFilterBox(!filterBox)}>
                        <li className="text-dark">This Week</li>
                        <li className="text-dark">This Month</li>
                        <li className="text-dark">In April</li>
                        <li className="text-dark">In May</li>
                        <li className="text-dark">In June</li>
                        <li className="text-dark">In July</li>
                      </ul>
                    </div>
                  )} */}
                  </div>
                )}

                {/* ----------MY CONTENT SELTION---------- */}
                {pathname === '/my-content' && (
                  <div>
                    <Suspense fallback={<Spinner />}>
                      <div className="d-flex justify-content-end pt-3 pb-1">
                        <Filter setCatagory={setCatagory} catagory={catagory} />
                      </div>
                      {approvedContent.length > 0
                      || filterContent.length > 0 ? (
                        <div className="my-content-scroll">
                          <div className="my-content-section w-100">
                            {catagory === null
                              ? approvedContent.map((content) => (
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
                        ) : (
                          <>
                            {loading ? (
                              <Spinner />
                            ) : (
                              <div
                                style={{ height: 'calc(100vh - 155px)' }}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <span className="fs-4">No content</span>
                              </div>
                            )}
                          </>
                        )}
                    </Suspense>
                    {contents.length > 10 && <NextPage />}
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
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Eligendi molestiae ut inventore laudantium
                        reprehenderit est?
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
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Eligendi molestiae ut inventore laudantium
                        reprehenderit est?
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
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Eligendi molestiae ut inventore laudantium
                        reprehenderit est?
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
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Eligendi molestiae ut inventore laudantium
                        reprehenderit est?
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
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Eligendi molestiae ut inventore laudantium
                        reprehenderit est?
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
        <OnScreenMessage />
        <PopUpModal beSellear />
      </div>
    </>
  );
}

export default DashBoard;
