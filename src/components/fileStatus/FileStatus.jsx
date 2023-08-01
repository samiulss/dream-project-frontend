/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './fileStatus.scss';

function FileStatus() {
  const [seeWhy, setSeeWhy] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);

  return (
    <div className="file-status-list position-relative">
      <table className="w-100">

        {/* ----------TABLE HEADING---------- */}
        <thead>
          <tr>
            <th>NO.</th>
            <th>Item Name</th>
            <th>Date</th>
            <th onClick={() => setFilterStatus(!filterStatus)} role="button" className="position-relative">
              Status
              <i className="fa-solid fa-caret-down text-dark ms-2" />
              { filterStatus && (
              <div className="filter-menu rounded-3 p-1 position-absolute bg-white">
                <ul>
                  <li className="text-success">Approved</li>
                  <li className="text-warning">Pending</li>
                  <li className="text-danger">Rejected</li>
                </ul>
              </div>
              )}
            </th>
          </tr>
        </thead>

        {/* ----------TABLE DATA---------- */}
        <tbody>
          <tr>
            <td>01</td>
            <td>Business Web Template</td>
            <td>
              <span className="me-2">{moment().subtract(10, 'days').calendar()}</span>
              {moment().format('LT')}
              <span />
            </td>
            <td className="text-warning">Pending</td>
            <td><i title="Cancel" className="fa-solid fa-xmark text-danger" role="button" /></td>
          </tr>
          <tr>
            <td>02</td>
            <td>Business Web Template</td>
            <td>
              <span className="me-2">{moment().subtract(10, 'days').calendar()}</span>
              {moment().format('LT')}
              <span />
            </td>
            <td className="text-warning">Pending</td>
            <td><i title="Cancel" className="fa-solid fa-xmark text-danger" role="button" /></td>
          </tr>
          <tr>
            <td>03</td>
            <td>Business Web Template</td>
            <td>
              <span className="me-2">{moment().subtract(10, 'days').calendar()}</span>
              {moment().format('LT')}
              <span />
            </td>
            <td className="text-success">Approved</td>
          </tr>
          <tr>
            <td>04</td>
            <td>Business Web Template</td>
            <td>
              <span className="me-2">{moment().subtract(10, 'days').calendar()}</span>
              {moment().format('LT')}
              <span />
            </td>
            <td className="text-danger">Rejected</td>
            <td><span onClick={() => setSeeWhy(true)} className="bg-danger-subtle see-why-btn text-danger" role="button">See Why</span></td>
          </tr>
          <tr>
            <td>05</td>
            <td>Business Web Template</td>
            <td>
              <span className="me-2">{moment().subtract(10, 'days').calendar()}</span>
              {moment().format('LT')}
              <span />
            </td>
            <td className="text-success">Approved</td>
          </tr>
          <tr>
            <td>06</td>
            <td>Business Web Template</td>
            <td>
              <span className="me-2">{moment().subtract(10, 'days').calendar()}</span>
              {moment().format('LT')}
              <span />
            </td>
            <td className="text-danger">Rejected</td>
            <td>
              <span onClick={() => setSeeWhy(true)} className="bg-danger-subtle see-why-btn text-danger" role="button">See Why</span>
            </td>
          </tr>
          <tr>
            <td>07</td>
            <td>Business Web Template</td>
            <td>
              <span className="me-2">{moment().subtract(10, 'days').calendar()}</span>
              {moment().format('LT')}
              <span />
            </td>
            <td className="text-success">Approved</td>
          </tr>
        </tbody>
      </table>
      {seeWhy
            && (
            <div className="reject-message rounded-3 z-1 bg-white position-absolute">
              <h6 className="text-danger position-relative p-1">
                Your asset has been rejected due to Rule 05
                <span onClick={() => setSeeWhy(false)} title="Close" className="position-absolute rounded-5" role="button"><i className="fa-regular fa-circle-xmark text-dark" /></span>
              </h6>
              <div className="reject-reason">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, laudantium.
                </p>
                <div className="text-end see-rules-btn">
                  <Link to="/dashboard">
                    <span className="bg-danger-subtle text-danger rounded-1 fw-semibold" role="button">See rules</span>
                  </Link>
                </div>
              </div>
            </div>
            )}
    </div>
  );
}

export default FileStatus;
