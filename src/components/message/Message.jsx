import moment from 'moment';
import './message.scss';

function Message() {
  return (
    <>
      <tbody>
        <tr data-bs-toggle="modal" data-bs-target="#exampleModal">
          <td>{moment().subtract(10, 'days').calendar()}</td>
          <td>{moment().format('LT')}</td>
          <td>
            Account restiction
          </td>
          <td>
            <span className="svg-icon message-icon position-relative">
              <span className="d-inline-block rounded-5 message-notification position-absolute" />
            </span>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default Message;
