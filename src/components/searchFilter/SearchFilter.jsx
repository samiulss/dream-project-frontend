import { useEffect } from 'react';
import { ContentState } from '../../context/StateContext';
import './searchFilter.scss';

function SearchFilter({
  setsortByTime, setsortByLicence, setFilterOn, sortByTime, sortLicence
}) {
  const {
    catagory, setCatagory
  } = ContentState();

  // FILTER BY CATAGORY
  const filterCatagory = (e) => {
    const getCatagory = e.target.value;
    setCatagory(getCatagory);
    setCatagory(getCatagory);
    setFilterOn(true);
  };

  // FILTER BY DATE AND TIME
  const handleSortBy = (e) => {
    const byTime = e.target.value;
    setsortByTime(byTime);
  };

  // FILTER BY LICENCE
  const sortByLicence = (e) => {
    const byLicence = e.target.value;
    setsortByLicence(byLicence);
    setFilterOn(true);
  };

  useEffect(() => {
    if (catagory) {
      setFilterOn(true);
    }
  }, []);

  return (
    <div className="filter-content custom-border-color">
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
                id="newest"
                name="sort"
                value="Newest"
              />
              <label htmlFor="newest">Newest</label>
            </div>
            {/* <div>
              <input type="radio" onChange={handleSortBy} id="oldest" name="sort" value="Oldest" />
              <label htmlFor="oldest">Oldest</label>
            </div> */}
            <div className="set-times">
              <input
                type="radio"
                onChange={handleSortBy}
                id="best-match"
                name="sort"
                value="Best Match"
              />
              <label htmlFor="best-match">Best Match</label>
            </div>
          </div>

          {/* -------------CONTENT------------- */}
          <div className="col-4 custom-border-color">
            <h6 className="sort-title">Catagory</h6>
            <div className="set-catagory">
              <input
                type="radio"
                onChange={filterCatagory}
                id="font"
                name="catagory"
                value="Font"
                checked={catagory === 'Font'}
              />
              <label htmlFor="font">Font</label>
            </div>
            <div className="set-catagory">
              <input
                type="radio"
                onChange={filterCatagory}
                id="vector"
                name="catagory"
                value="Vector"
                checked={catagory === 'Vector'}
              />
              <label htmlFor="vector">Vector</label>
            </div>
            <div className="set-catagory">
              <input
                type="radio"
                onChange={filterCatagory}
                id="web-design"
                name="catagory"
                value="Web Design"
                checked={catagory === 'Web Design'}
              />
              <label onClick={() => setFilterOn(true)} htmlFor="web-design">Web Design</label>
            </div>
            <div className="set-catagory">
              <input
                type="radio"
                onChange={filterCatagory}
                id="image"
                name="catagory"
                value="Image"
                checked={catagory === 'Image'}
              />
              <label htmlFor="image">Image</label>
            </div>
          </div>

          {/* -------------Licence------------- */}
          <div className="col-4 border-0">
            <h6 className="sort-title">Licence Type</h6>
            <div className="set-licence">
              <input
                type="radio"
                onChange={sortByLicence}
                name="licence"
                id="free"
                value="Free"
              />
              <label htmlFor="free">Free</label>
            </div>
            <div className="set-licence">
              <input
                type="radio"
                onChange={sortByLicence}
                name="licence"
                id="premium"
                value="Premium"
              />
              <label htmlFor="premium">Premium</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
