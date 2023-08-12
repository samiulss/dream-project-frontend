import axios from 'axios';
import { useState } from 'react';
import { rootUrl } from '../../../config/backendUrl';
import Filter from '../commons/filter/Filter';
import './searchBox.scss';

function SearchBox({ setContents, setResultFor }) {
  const [catagory, setCatagory] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [searchBox, setSearchBox] = useState(false);
  const [searchkeywords, setSearchkeywords] = useState('');
  const [searchItem, setSearchItem] = useState(0);
  const [resultId, setResultId] = useState('');

  // handle search
  const handleSearch = async (e) => {
    setSearchkeywords(e.target.value);
    if (e.target.value === '') {
      setSearchResult([]);
      setSearchBox(false);
      setSearchItem(0);
      return;
    }
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      let { data } = await axios.get(
        `${rootUrl}/api/?search=${e.target.value}`,
        headers
      );
      if (catagory) {
        data = data.filter((d) => d.catagory === catagory);
        setSearchBox(true);
        setSearchResult(data);
      } else {
        setSearchBox(true);
        setSearchResult(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle search list with arrow key
  const handleArrowKey = (e) => {
    if (e.keyCode === 38 && searchItem > -1) {
      setSearchItem((prev) => prev - 1);
      setSearchkeywords(searchResult[searchItem]?.title);
      setResultId(searchResult[searchItem]?._id);
    }
    if (e.keyCode === 40 && searchItem !== searchResult.length) {
      setSearchItem((prev) => prev + 1);
      setSearchkeywords(searchResult[searchItem]?.title);
      setResultId(searchResult[searchItem]?._id);
    }
  };

  // select search result
  const selectSearch = (queary) => {
    setSearchBox(false);
    setContents([queary]);
    setSearchkeywords(queary.title);
    setResultFor(queary.title);
  };

  // handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchBox(false);
    setContents(searchResult);
    setResultFor(searchkeywords);
  };

  return (
    <div className="searchBox mt-2 position-relative">
      <form onSubmit={handleSubmit} role="search">
        <div className="d-flex search-from rounded-3 m-auto custom-border-color">
          <Filter catagory={catagory} setCatagory={setCatagory} />
          <input
            onChange={handleSearch}
            className="form-control shadow-none border-0 rounded-0 border-end custom-border-color"
            type="search"
            placeholder="Search..."
            value={searchkeywords}
            aria-label="Search"
            // name="search"
            onKeyDown={handleArrowKey}
          />
          <button className="btn pb-0" type="button">
            <span className="svg-icon search" />
          </button>
        </div>
        {searchBox && (
          <div className="search-list-container position-absolute pt-2">
            {searchResult.length > 0 ? (
              <ul>
                {searchResult.map((result) => (
                  <li
                    key={result._id}
                    onClick={() => selectSearch(result)}
                    className={
                      resultId === result._id
                        ? 'p-2 base-bg-color-2 text-white rounded-2'
                        : 'p-2 text-dark'
                    }
                  >
                    {result.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No contents found</p>
            )}
          </div>
        )}
      </form>
      {/* <Navbar /> */}
    </div>
  );
}

export default SearchBox;
