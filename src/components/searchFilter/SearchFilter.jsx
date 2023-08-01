import './searchFilter.scss';

function SearchFilter() {
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
        <div className="row flex-column me-0">

          {/* -------------SORT BY------------- */}
          <div className="col-4 custom-border-color">
            <h6>Sort by</h6>
            <div>
              <input type="radio" id="newest" name="fav_language" value="Newest" />
              <label htmlFor="newest">Newest</label>
            </div>
            <div>
              <input type="radio" id="oldest" name="fav_language" value="Oldest" />
              <label htmlFor="oldest">Oldest</label>
            </div>
            <div>
              <input type="radio" id="best-match" name="fav_language" value="Best Match" />
              <label htmlFor="best-match">Best Match</label>
            </div>
          </div>

          {/* -------------CONTENT------------- */}
          <div className="col-4 custom-border-color">
            <h6>Content</h6>
            <div>
              <input type="radio" id="font" name="content" value="Font" />
              <label htmlFor="font">Font</label>
            </div>
            <div>
              <input type="radio" id="vectors" name="content" value="Vector" />
              <label htmlFor="vectors">Vector</label>
            </div>
            <div>
              <input type="radio" id="web-design" name="content" value="Web Design" />
              <label htmlFor="web-design">Web Design</label>
            </div>
          </div>

          {/* -------------Licence------------- */}
          <div className="col-4 border-0">
            <h6>Licence Type</h6>
            <div>
              <input type="radio" name="licence" id="free" />
              <label htmlFor="free">Free</label>
            </div>
            <div>
              <input type="radio" name="licence" id="premium" />
              <label htmlFor="premium">Premium</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
