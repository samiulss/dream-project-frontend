import Filter from '../commons/filter/Filter';
import './searchBox.scss';

function SearchBox() {
  return (
    <div className="searchBox mt-2">
      <form className="d-flex rounded-3 m-auto custom-border-color" role="search">
        <Filter />
        <input className="form-control shadow-none border-0 rounded-0 border-end custom-border-color" type="search" defaultValue="Ramadan vector" placeholder="Search..." aria-label="Search" />
        <button className="btn pb-0" type="button">
          <span className="svg-icon search" />
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
