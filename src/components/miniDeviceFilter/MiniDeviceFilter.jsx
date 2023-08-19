import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ContentState } from '../../context/StateContext';
import './miniDeviceFilter.scss';

function MiniDeviceFilter({
  show,
  setShow,
  setsortByTime,
  setsortByLicence,
  setFilterOn,
  sortByTime,
  sortLicence,
}) {
  const { catagory, setCatagory } = ContentState();

  const handleClose = () => setShow(false);

  const [timeSort, setTimeSort] = useState(null);
  const [licence, setLicence] = useState(null);

  // FILTER BY DATE AND TIME
  const handleSortBy = (e) => {
    const byTime = e.target.value;
    setsortByTime(byTime);
    setTimeSort(e.target.value);
  };

  // FILTER BY CATAGORY
  const filterCatagory = (e) => {
    const getCatagory = e.target.value;
    setCatagory(getCatagory);
    setCatagory(getCatagory);
    setFilterOn(true);
  };

  // FILTER BY LICENCE
  const sortByLicence = (e) => {
    const byLicence = e.target.value;
    setsortByLicence(byLicence);
    setFilterOn(true);
    setLicence(e.target.value);
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="start" className="w-75">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="filter-mini-device custom-border-color">
          {/* -------------HEADER------------- */}
          <div className="header custom-border-color d-flex justify-content-around align-items-center">
            <div className="filter-icon d-flex justify-content-around align-items-center">
              <span className="svg-icon filter-svg" />
            </div>
            <div className="filter-text">
              <span className="fw-semibold">Filter</span>
            </div>
          </div>
          <div className="container p-0">
            {(catagory || sortByTime || sortLicence) && (
              <small
                onClick={() => window.location.reload()}
                className="m-0 d-block text-end me-2"
                role="button"
              >
                Clear
              </small>
            )}
            <div className="row flex-column me-0">
              {/* -------------SORT BY------------- */}
              <div className="col-4 custom-border-color">
                <h6 className="sort-title">Sort by</h6>
                <div className="set-times">
                  <input
                    type="radio"
                    onChange={handleSortBy}
                    onClick={handleClose}
                    id="newest-mt"
                    name="sort"
                    value="Newest"
                    checked={timeSort === 'Newest'}
                  />
                  <label htmlFor="newest-mt">Newest</label>
                </div>
                {/* <div>
              <input type="radio" onChange={handleSortBy} id="oldest" name="sort" value="Oldest" />
              <label htmlFor="oldest">Oldest</label>
            </div> */}
                <div className="set-times">
                  <input
                    type="radio"
                    onChange={handleSortBy}
                    onClick={handleClose}
                    id="best-match-mt"
                    name="sort"
                    value="Best Match"
                    checked={timeSort === 'Best Match'}
                  />
                  <label htmlFor="best-match-mt">Best Match</label>
                </div>
              </div>

              {/* -------------CONTENT------------- */}
              <div className="col-4 custom-border-color">
                <h6 className="sort-title">Catagory</h6>
                <div className="set-catagory">
                  <input
                    type="radio"
                    onChange={filterCatagory}
                    onClick={handleClose}
                    id="font-mt"
                    name="catagory"
                    value="Font"
                    checked={catagory === 'Font'}
                  />
                  <label htmlFor="font-mt">Font</label>
                </div>
                <div className="set-catagory">
                  <input
                    type="radio"
                    onChange={filterCatagory}
                    onClick={handleClose}
                    id="vector-mt"
                    name="catagory"
                    value="Vector"
                    checked={catagory === 'Vector'}
                  />
                  <label htmlFor="vector-mt">Vector</label>
                </div>
                <div className="set-catagory">
                  <input
                    type="radio"
                    onChange={filterCatagory}
                    onClick={handleClose}
                    id="web-design-mt"
                    name="catagory"
                    value="Web Design"
                    checked={catagory === 'Web Design'}
                  />
                  <label onClick={() => setFilterOn(true)} htmlFor="web-design-mt">
                    Web Design
                  </label>
                </div>
                <div className="set-catagory">
                  <input
                    type="radio"
                    onChange={filterCatagory}
                    onClick={handleClose}
                    id="image-mt"
                    name="catagory"
                    value="Image"
                    checked={catagory === 'Image'}
                  />
                  <label htmlFor="image-mt">Image</label>
                </div>
              </div>

              {/* -------------Licence------------- */}
              <div className="col-4 border-0">
                <h6 className="sort-title">Licence Type</h6>
                <div className="set-licence">
                  <input
                    type="radio"
                    onChange={sortByLicence}
                    onClick={handleClose}
                    name="licence"
                    id="free-mt"
                    value="Free"
                    checked={licence === 'Free'}
                  />
                  <label htmlFor="free-mt">Free</label>
                </div>
                <div className="set-licence">
                  <input
                    type="radio"
                    onChange={sortByLicence}
                    onClick={handleClose}
                    name="licence"
                    id="premium-mt"
                    value="Premium"
                    checked={licence === 'Premium'}
                  />
                  <label htmlFor="premium-mt">Premium</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default MiniDeviceFilter;
