import { useEffect } from 'react';
import { ContentState } from '../../context/StateContext';
import './searchFilter.scss';

function SearchFilter({
  setCatagory, setsortByTime, setsortByLicence, setFilterOn, sortByTime, sortLicence
}) {
  const {
    menuCatagory, setMenuCatagory
  } = ContentState();

  // FILTER BY CATAGORY
  const filterCatagory = (e) => {
    const catagory = e.target.value;
    setCatagory(catagory);
    setMenuCatagory(catagory);
    setFilterOn(true);
  };

  // FILTER BY DATE AND TIME
  const handleSortBy = (e) => {
    const byTime = e.target.value;
    setsortByTime(byTime);
    setFilterOn(true);
  };

  // FILTER BY LICENCE
  const sortByLicence = (e) => {
    const byLicence = e.target.value;
    setsortByLicence(byLicence);
    setFilterOn(true);
  };

  useEffect(() => {
    if (menuCatagory) {
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
        {(menuCatagory || sortByTime || sortLicence) && (
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
            <h6>Sort by</h6>
            <div>
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
            <div>
              <input
                type="radio"
                onChange={handleSortBy}
                id="best-match"
                name="sort"
                value="bestMatch"
              />
              <label htmlFor="best-match">Best Match</label>
            </div>
          </div>

          {/* -------------CONTENT------------- */}
          <div className="col-4 custom-border-color">
            <h6>Catagory</h6>
            <div>
              <input
                type="radio"
                onChange={filterCatagory}
                id="font"
                name="catagory"
                value="Font"
                checked={menuCatagory === 'Font'}
              />
              <label htmlFor="font">Font</label>
            </div>
            <div>
              <input
                type="radio"
                onChange={filterCatagory}
                id="vector"
                name="catagory"
                value="Vector"
                checked={menuCatagory === 'Vector'}
              />
              <label htmlFor="vector">Vector</label>
            </div>
            <div>
              <input
                type="radio"
                onChange={filterCatagory}
                id="web-design"
                name="catagory"
                value="Web Design"
                checked={menuCatagory === 'Web Design'}
              />
              <label onClick={() => setFilterOn(true)} htmlFor="web-design">Web Design</label>
            </div>
            <div>
              <input
                type="radio"
                onChange={filterCatagory}
                id="image"
                name="catagory"
                value="Image"
                checked={menuCatagory === 'Image'}
              />
              <label htmlFor="image">Image</label>
            </div>
          </div>

          {/* -------------Licence------------- */}
          <div className="col-4 border-0">
            <h6>Licence Type</h6>
            <div>
              <input
                type="radio"
                onChange={sortByLicence}
                name="licence"
                id="free"
                value="free"
              />
              <label htmlFor="free">Free</label>
            </div>
            <div>
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
