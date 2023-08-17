import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Arrow from '../commons/arrow/Arrow';
import NextPage from '../commons/nextPage/NextPage';
import SearchBox from '../searchBox/SearchBox';
import SearchFilter from '../searchFilter/SearchFilter';
import './contentContainer.scss';

import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import { ContentState } from '../../context/StateContext';
import Loading from '../commons/loading/Loading';
import ContentList from '../contentList/ContentList';

function ContentContainer() {
  const {
    auth,
    loggedInUser,
    contents,
    setContents,
    catagory,
    fetchAgain,
    homeSearch,
    resultFor,
  } = ContentState();

  const [topSearch, setTopSearch] = useState([]);
  const [filterContents, setFilterContents] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortByTime, setsortByTime] = useState(null);
  const [sortByLicence, setsortByLicence] = useState(null);
  const [filterOn, setFilterOn] = useState(false);
  const [searchkeywords, setSearchkeywords] = useState('');

  // FETCH ALL CONTENTS
  const fetchContents = async () => {
    setLoading(true);
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/contents?catagory=${catagory}`,
        headers
      );
      setContents(data);
      setTopSearch(data);
      setLoading(false);
      setFilterOn(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // FETCH FAVOURITE CONTENT
  const favouriteContents = async () => {
    if (!loggedInUser) {
      return;
    }
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/favouriteList`,
        config(auth)
      );
      setFavourites(data[0].favourite);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // handle top search
  const handleTopSearch = (title) => {
    const selectTop = topSearch.filter((top) => top.title === title);
    setContents(selectTop);
    setSearchkeywords(title);
  };

  useEffect(() => {
    if (!contents.length) {
      fetchContents();
    }
    if (homeSearch) {
      fetchContents();
    }
    if (loggedInUser) {
      favouriteContents();
    }
  }, [fetchAgain]);

  // FILTER BY CATAGORY
  useEffect(() => {
    // condition for date and time
    if (sortByTime === 'Newest' && contents.length > 1) {
      const newest = [...contents].reverse();
      setContents(newest);

      if (catagory) {
        const newSort = [...filterContents].reverse();
        setFilterContents(newSort);
      }
    }
    if (sortByTime === 'bestMatch') {
      fetchContents();
    }

    // condition for catagory
    if (catagory && !sortByLicence) {
      const sortCatagory = contents.filter(
        (content) => content.catagory === catagory
      );
      setFilterContents(sortCatagory);
    }

    // condition for licence
    if (sortByLicence && !catagory) {
      const sortLicence = contents.filter(
        (content) => content.licence === sortByLicence
      );
      setFilterContents(sortLicence);
    }

    // condition for catagory & licence
    if (sortByLicence && catagory) {
      const result = contents.filter(
        (content) => content.licence === sortByLicence && content.catagory === catagory
      );
      setFilterContents(result);
    }
  }, [catagory, sortByTime, sortByLicence]);

  return (
    <main className="ContentContainer">
      {/* ------------SEARCH SECTION------------ */}
      <SearchBox
        setLoading={setLoading}
        searchkeywords={searchkeywords}
        setSearchkeywords={setSearchkeywords}
        setFilterContents={setFilterContents}
        setFilterOn={setFilterOn}
      />

      <div className="container-fluid mt-3">
        <div className="row">
          {/* ------------FILTER SEARCH SECTION------------ */}
          <div className="col-2 filter-section p-0">
            <SearchFilter
              setsortByTime={setsortByTime}
              setsortByLicence={setsortByLicence}
              setFilterOn={setFilterOn}
              sortByTime={sortByTime}
              sortLicence={sortByLicence}
            />
          </div>

          <div className="col-10 content-section">
            {/* ------------RELATED SEARCH SECTION------------ */}
            <div className="related-search d-flex mb-3 ms-2">
              <ul className="m-0 w-100">
                <ScrollingCarousel
                  rightIcon={<Arrow right="right" />}
                  leftIcon={<Arrow />}
                >
                  {topSearch.map((top) => (
                    <li
                      key={top._id}
                      onClick={() => handleTopSearch(top.title)}
                    >
                      {top.title}
                    </li>
                  ))}
                </ScrollingCarousel>
              </ul>
            </div>

            {/* ------------SEARCH RESULT FOR SECTION------------ */}
            {resultFor && (
              <div className="result-quary">
                <p className="fs-5 text-center fw-semibold">
                  Result for :
                  {' '}
                  {resultFor}
                </p>
              </div>
            )}

            {/* ------------ALL CONTENT------------ */}
            {filterOn ? (
              <div className="content-list-container">
                <div className="content-wraper">
                  {filterContents.map((content) => (
                    <ContentList
                      key={content._id}
                      content={content}
                      favourites={favourites}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="content-list-container">
                <div className="content-wraper">
                  {contents.map((content) => (
                    <ContentList
                      key={content._id}
                      content={content}
                      favourites={favourites}
                    />
                  ))}
                </div>
              </div>
            )}

            {contents.length === 0 && filterContents.length === 0 && (
              <div className="d-flex flex-column align-items-center justify-content-center h-50">
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <i className="fa-solid fa-face-frown fs-1 text-warning fa-2xl" />
                    <br />
                    <h5>No contents found</h5>
                  </>
                )}
              </div>
            )}

            {/* ------------NEXT PAGE------------ */}
            {contents.length > 10 && <NextPage />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContentContainer;
