import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { rootUrl } from '../../../config/backendUrl';
import { ContentState } from '../../context/StateContext';
import Filter from '../commons/filter/Filter';
import './searchBox.scss';

function SearchBox({
  setLoading,
  searchkeywords,
  setSearchkeywords,
  setFilterContents,
  setFilterOn,
  setShow
}) {
  const {
    catagory, setContents, setCatagory, setResultFor
  } = ContentState();

  const { pathname } = useLocation();
  const [searchBox, setSearchBox] = useState(false);
  const [searchItem, setSearchItem] = useState(0);
  const [resultId, setResultId] = useState('');
  const [showResult, setShowResult] = useState([]);

  // handle search
  const handleSearch = async (e) => {
    setSearchkeywords(e.target.value);
    if (e.target.value === '') {
      setShowResult([]);
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
        setSearchBox(true);
        data = data.filter((d) => d.catagory === catagory);
        const key = 'title';
        const unique = [
          ...new Map(data.map((item) => [item[key], item])).values(),
        ];
        setShowResult(unique);
      } else {
        setSearchBox(true);
        const key = 'title';
        const unique = [
          ...new Map(data.map((item) => [item[key], item])).values(),
        ];
        setShowResult(unique);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle search list with arrow key
  const handleArrowKey = (e) => {
    if (e.keyCode === 38 && searchItem > -1) {
      setSearchItem((prev) => prev - 1);
      setSearchkeywords(showResult[searchItem]?.title);
      setResultId(showResult[searchItem]?._id);
    }
    if (e.keyCode === 40 && searchItem !== showResult.length) {
      setSearchItem((prev) => prev + 1);
      setSearchkeywords(showResult[searchItem]?.title);
      setResultId(showResult[searchItem]?._id);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value === '') {
      toast.error('Plese type something');
      return;
    }
    setLoading(true);
    setFilterContents([]);
    setContents([]);
    setFilterOn(false);
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    const selectCatagory = {
      catagoryName: catagory,
    };
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/searchContents?keyword=${e.target[0].value}`,
        selectCatagory,
        headers
      );
      setSearchBox(false);
      setContents(data);
      setResultFor(searchkeywords);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setCatagory(catagory);
  }, [pathname, catagory]);

  return (
    <div className="searchBox mt-2 pb-3">
      <form onSubmit={handleSubmit} role="search" className="form-search">
        <div className="d-flex search-from rounded-3 custom-border-color">
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
          <button type="sumbit" className="btn pb-0">
            <span className="svg-icon search" />
          </button>
        </div>
        <i onClick={() => setShow(true)} className="fa-solid fa-sliders text-dark fs-4 rounded-2" role="button" />
        {searchBox && showResult.length > 0 && (
          <div className="search-list-container position-absolute pt-2">
            <ul>
              {showResult.map((result) => (
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
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBox;
