import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import axios from 'axios';
import {
  lazy, Suspense, useEffect, useState
} from 'react';
import Arrow from '../commons/arrow/Arrow';
import NextPage from '../commons/nextPage/NextPage';
import Spinner from '../commons/spinner/Spinner';
import SearchBox from '../searchBox/SearchBox';
import SearchFilter from '../searchFilter/SearchFilter';
import './contentContainer.scss';

const ContentList = lazy(() => import('../contentList/ContentList'));

function ContentContainer() {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    const fetchContents = async () => {
      const config = {
        'Content-type': 'application/json; charset=UTF-8',
      };
      try {
        const { data } = await axios.get('http://localhost:5000/api/approvedContent', config);
        setContents(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContents();
  }, []);

  return (
    <main className="ContentContainer">

      {/* ------------SEARCH SECTION------------ */}
      <SearchBox />

      <div className="container-fluid mt-3">
        <div className="row">

          {/* ------------FILTER SEARCH SECTION------------ */}
          <div className="col-2 filter-section p-0">
            <SearchFilter />
          </div>

          <div className="col-10 content-section">

            {/* ------------RELATED SEARCH SECTION------------ */}
            <div className="related-search d-flex mb-3 ms-2">
              <ul className="m-0 w-100">
                <ScrollingCarousel rightIcon={<Arrow right="right" />} leftIcon={<Arrow />}>
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
              <p className="fs-5 text-center fw-semibold">Result for : Ramadan Vector</p>
            </div>

            {/* ------------ALL CONTENT------------ */}
            <div className="content-list-container">
              <Suspense fallback={<Spinner />}>
                <div className="content-wraper">
                  {
                  contents.map((content) => (
                    <ContentList
                      key={content._id}
                      content={content}
                    />
                  ))
                }
                </div>
              </Suspense>

              {/* ------------NEXT PAGE------------ */}
              {contents.length > 10 && <NextPage />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContentContainer;
