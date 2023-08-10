import { useState } from 'react';
import './downloadList.scss';

function DownloadList() {
  const [filterStatus, setFilterStatus] = useState(false);

  return (
    <div className="download-list overflow-x-auto">
      <table className="w-100 overflow-x-auto">

        {/* ----------TABLE HEADING---------- */}
        <thead>
          <tr>
            <th>NO.</th>
            <th>Item Name</th>
            <th onClick={() => setFilterStatus(!filterStatus)} role="button" className="position-relative">
              Download Times
              <i className="fa-solid fa-caret-down text-dark ms-2" />
              { filterStatus && (
              <div className="filter-menu rounded-3 p-1 position-absolute bg-white">
                <ul>
                  <li>This Week</li>
                  <li>This Month</li>
                  <li>In April</li>
                  <li>In May</li>
                  <li>In June</li>
                  <li>In July</li>
                </ul>
              </div>
              )}
            </th>
            <th>Price</th>
          </tr>
        </thead>

        {/* ----------TABLE DATA---------- */}
        <tbody>
          <tr>
            <td>01</td>
            <td>Islamic Wallpaper</td>
            <td>
              21 Times
            </td>
            <td>Free</td>
          </tr>
          <tr>
            <td>02</td>
            <td>Book Cover Mockup</td>
            <td>
              53 Times
            </td>
            <td>Free</td>
          </tr>
          <tr>
            <td>03</td>
            <td>Business Web Template</td>
            <td>
              05 Times
            </td>
            <td>90 TK</td>
          </tr>
          <tr>
            <td>04</td>
            <td>Illustration of Bird</td>
            <td>
              21 Times
            </td>
            <td>110 TK</td>
          </tr>
          <tr>
            <td>05</td>
            <td>Business Web Template</td>
            <td>
              15 Times
            </td>
            <td>90 TK</td>
          </tr>
          <tr>
            <td>06</td>
            <td>LipiType Bangla Font</td>
            <td>
              14 Times
            </td>
            <td>110 TK</td>
          </tr>
          <tr>
            <td>07</td>
            <td>Bee Logo PSD</td>
            <td>
              03 Times
            </td>
            <td>90 TK</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DownloadList;
