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
import Loadng from '../commons/loading/Loadng';
import ContentList from '../contentList/ContentList';

function ContentContainer() {
  const { auth, loggedInUser, fetchAgain } = ContentState();

  const [contents, setContents] = useState([]);
  const [filterContents, setFilterContents] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catagory, setCatagory] = useState(null);
  const [sortByTime, setsortByTime] = useState(null);
  const [sortByLicence, setsortByLicence] = useState(null);

  // FETCH ALL CONTENTS
  const fetchContents = async () => {
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/approvedContent`,
        headers
      );
      setLoading(false);
      setContents(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // FETCH FAVOURITE CONTENT
  const favouriteContents = async () => {
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

  useEffect(() => {
    fetchContents();
    if (loggedInUser) {
      favouriteContents();
    }
  }, [fetchAgain]);

  // FILTER BY CATAGORY
  useEffect(() => {
    // condition for date and time
    if (sortByTime === 'Newest') {
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
    if (catagory) {
      const sortCatagory = contents.filter(
        (content) => content.catagory === catagory
      );
      setFilterContents(sortCatagory);

      if (sortByLicence) {
        const sort = filterContents.filter(
          (content) => content.licence === sortByLicence
        );
        setFilterContents(sort);
      }
    }

    // condition for licence
    if (sortByLicence) {
      const sortLicence = contents.filter(
        (content) => content.licence === sortByLicence
      );
      setFilterContents(sortLicence);

      if (catagory) {
        const sort = contents.filter(
          (content) => content.catagory === catagory
        );
        setFilterContents(sort);
      }
    }
  }, [catagory, sortByTime, sortByLicence]);

  return (
    <main className="ContentContainer">
      {/* ------------SEARCH SECTION------------ */}
      <SearchBox />

      <div className="container-fluid mt-3">
        <div className="row">
          {/* ------------FILTER SEARCH SECTION------------ */}
          <div className="col-2 filter-section p-0">
            <SearchFilter
              setCatagory={setCatagory}
              setsortByTime={setsortByTime}
              setsortByLicence={setsortByLicence}
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
                  <li>Ramadan Vector</li>
                  <li>Eid Vector</li>
                  <li>Salat Vector</li>
                  <li>Calender Vector</li>
                  <li>Siam Vector</li>
                  <li>Salat Vector</li>
                  <li>Eid Vector</li>
                  <li>Salat Vector</li>
                  <li>Eid Vector</li>
                  <li>Ramadan Vector</li>
                  <li>Eid Vector</li>
                  <li>Salat Vector</li>
                  <li>Calender Vector</li>
                  <li>Siam Vector</li>
                  <li>Salat Vector</li>
                  <li>Eid Vector</li>
                  <li>Salat Vector</li>
                  <li>Eid Vector</li>
                  <li>Ramadan Vector</li>
                  <li>Eid Vector</li>
                  <li>Salat Vector</li>
                  <li>Calender Vector</li>
                  <li>Siam Vector</li>
                  <li>Salat Vector</li>
                  <li>Eid Vector</li>
                  <li>Salat Vector</li>
                </ScrollingCarousel>
              </ul>
            </div>

            {/* ------------SEARCH RESULT FOR SECTION------------ */}
            <div className="result-quary">
              <p className="fs-5 text-center fw-semibold">
                Result for : Ramadan Vector
              </p>
            </div>

            {/* ------------ALL CONTENT------------ */}
            {contents.length ? (
              <div className="content-list-container">
                <div className="content-wraper">
                  {filterContents.length || sortByLicence || catagory
                    ? filterContents.map((content) => (
                      <ContentList
                        key={content._id}
                        content={content}
                        favourites={favourites}
                      />
                    ))
                    : contents.map((content) => (
                      <ContentList
                        key={content._id}
                        content={content}
                        favourites={favourites}
                      />
                    ))}
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-50">
                {loading ? <Loadng /> : <h5>No contents found</h5>}
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
