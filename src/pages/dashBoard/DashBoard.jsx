import { lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Filter from '../../components/commons/filter/Filter';
import NextPage from '../../components/commons/nextPage/NextPage';
import Spinner from '../../components/commons/spinner/Spinner';
import Help from '../../components/help/Help';
import MainNavbar from '../../components/mainNavbar/MainNavbar';
import ContentUpload from '../../components/modals/contentUpload/ContentUpload';
import Profile from '../../components/profile/Profile';
import { fakeData } from '../../fakeData';
import './dashBoard.scss';

const Message = lazy(() => import('../../components/message/Message'));
const FileStatus = lazy(() => import('../../components/fileStatus/FileStatus'));
const Balance = lazy(() => import('../../components/balance/Balance'));
const DownloadList = lazy(() => import('../../components/downloadList/DownloadList'));
const ContentList = lazy(() => import('../../components/contentList/ContentList'));

function DashBoard() {
  const { pathname } = useLocation();

  return (
    <div className="dashboard">
      {/* ------------NAVBAR------------ */}
      <MainNavbar />

      <main className="container-fluid">
        <div className="row">

          {/* ------------LEFT SIDEBAR------------ */}
          <div className="col-2 left-sidebar text-white">
            <div className="position-sticky">
              <div className="header">
                <h3>Dashboard</h3>
              </div>

              <div className="menu d-flex flex-column align-items-center">
                <ul>
                  <Link to="/profile">
                    <li className={`${pathname === '/profile' && 'base-color-1'}`}>
                      Profile
                    </li>
                  </Link>

                  <Link to="/dashboard">
                    <li className={`${pathname === '/dashboard' && 'base-color-1'}`}>
                      Upload
                    </li>
                  </Link>

                  <Link to="/message">
                    <li className={`${pathname === '/message' && 'base-color-1'}`}>
                      Message
                      <span className="ms-5 d-inline-block rounded-5 text-white message-notification">01</span>
                    </li>
                  </Link>

                  <Link to="/file-status">
                    <li className={`${pathname === '/file-status' && 'base-color-1'}`}>File Status</li>
                  </Link>

                  <Link to="/balance">
                    <li className={`${pathname === '/balance' && 'base-color-1'}`}>Balance</li>
                  </Link>

                  <Link to="/download-list">
                    <li className={`${pathname === '/download-list' && 'base-color-1'}`}>
                      Download
                    </li>
                  </Link>

                  <Link to="/my-content">
                    <li className={`${pathname === '/my-content' && 'base-color-1'}`}>My Content</li>
                  </Link>

                  <Link to="/following">
                    <li className={`${pathname === '/following' && 'base-color-1'}`}>
                      Following
                    </li>
                  </Link>

                  <Link to="/favourite">
                    <li className={`${pathname === '/favourite' && 'base-color-1'}`}>
                      Favourite
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>

          {/* ------------MAIN CONTENTR------------ */}
          <div className={`${pathname === '/dashboard' ? 'col-7 main-content d-flex align-items-center justify-content-center' : 'col-10 main-content d-flex align-items-start justify-content-center p-0'}`}>

            {/* ----------PROFILE SELTION---------- */}
            {pathname === '/profile' && (
            <div className="profile-section">
              <Suspense fallback={<Spinner />}>
                <Profile />
              </Suspense>
            </div>
            )}

            {/* ----------CONTENT UPLOAD SELTION---------- */}
            {pathname === '/dashboard' && (
            <>
              <div className="upload-content rounded-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <span className="svg-icon upload-logo" />
                <span className="fw-semibold click-to-upload-text">Click to Upload</span>
              </div>
              <ContentUpload />
            </>
            )}

            {/* ----------MESSAGE SELTION---------- */}
            {pathname === '/message' && (
            <div className="message-section">
              <h4 className="text-center base-color-1 fw-semibold mb-4 mt-4">Message</h4>
              <Suspense fallback={<Spinner />}>
                <Message />
              </Suspense>
            </div>
            )}

            {/* ----------FILE STATUS SELTION---------- */}
            {pathname === '/file-status' && (
            <div className="file-status w-100">
              <h4 className="text-center base-color-1 fw-semibold mb-4 mt-4">File Status</h4>
              <Suspense fallback={<Spinner />}>
                <FileStatus />
              </Suspense>
            </div>
            )}

            {/* ----------BALANCE SELTION---------- */}
            {pathname === '/balance' && (
            <div className="balance-section w-100 pb-4 p-5">
              <Suspense fallback={<Spinner />}>
                <Balance />
              </Suspense>
            </div>
            )}

            {/* ----------DOWNLOAD SELTION---------- */}
            {pathname === '/download-list' && (
            <div className="download-section w-100">
              <h4 className="text-center base-color-1 fw-semibold mb-4 mt-4">You have total 46 downloads in this week</h4>
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
                  <Filter />
                </div>
                <div className="my-content-scroll">
                  <div className="my-content-section w-100">
                    {
                  fakeData.map((content) => (
                    <ContentList
                      key={content.id}
                      content={content}
                      tooltip="none"
                    />
                  ))
                }
                  </div>
                </div>
              </Suspense>
              <NextPage />
            </div>
            )}
          </div>

          {/* ------------RIGHT SIDEBAR FOR UPLOADING GUIDLINE------------ */}
          {pathname === '/dashboard' && (
          <div className="col-3 right-sidebar text-white">
            <div className="header">
              <h3>Guidline</h3>
            </div>

            <div className="guidline-rules">
              <ul>
                <li data-bs-toggle="collapse" href="#rule-01" aria-controls="collapseExample">
                  Rule 01
                  <i className="fa-solid fa-caret-down p-1" />
                </li>
                <div className="collapse show ms-3" id="rule-01">
                  <p>
                    Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Eligendi molestiae ut
                    inventore laudantium reprehenderit est?
                  </p>
                </div>

                <li data-bs-toggle="collapse" href="#rule-02" aria-controls="collapseExample">
                  Rule 02
                  <i className="fa-solid fa-caret-down" />
                </li>
                <div className="collapse ms-3" id="rule-02">
                  <p>
                    Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Eligendi molestiae ut
                    inventore laudantium reprehenderit est?
                  </p>
                </div>

                <li data-bs-toggle="collapse" href="#rule-03" aria-controls="collapseExample">
                  Rule 03
                  <i className="fa-solid fa-caret-down" />
                </li>
                <div className="collapse ms-3" id="rule-03">
                  <p>
                    Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Eligendi molestiae ut
                    inventore laudantium reprehenderit est?
                  </p>
                </div>

                <li data-bs-toggle="collapse" href="#rule-04" aria-controls="collapseExample">
                  Rule 04
                  <i className="fa-solid fa-caret-down" />
                </li>
                <div className="collapse ms-3" id="rule-04">
                  <p>
                    Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Eligendi molestiae ut
                    inventore laudantium reprehenderit est?
                  </p>
                </div>

                <li data-bs-toggle="collapse" href="#rule-05" aria-controls="collapseExample">
                  Rule 05
                  <i className="fa-solid fa-caret-down" />
                </li>
                <div className="collapse ms-3" id="rule-05">
                  <p>
                    Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Eligendi molestiae ut
                    inventore laudantium reprehenderit est?
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
    </div>
  );
}

export default DashBoard;