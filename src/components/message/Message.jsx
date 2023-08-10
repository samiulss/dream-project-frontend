import moment from 'moment';
import MessageModal from '../modals/messageModal/MessageModal';
import './message.scss';

function Message() {
  return (
    <>
      <table className="message-list w-100">
        <tbody>
          <tr data-bs-toggle="modal" data-bs-target="#exampleModal">
            <td>{moment().subtract(10, 'days').calendar()}</td>
            <td>{moment().format('LT')}</td>
            <td>Dear Musab, a report has been made on one of your topics..</td>
            <td>
              <span className="svg-icon message-icon position-relative">

                <span className="d-inline-block rounded-5 message-notification position-absolute" />
              </span>
            </td>
          </tr>
          <tr data-bs-toggle="modal" data-bs-target="#exampleModal">
            <td className="seen">{moment().subtract(10, 'days').calendar()}</td>
            <td className="seen">{moment().format('LT')}</td>
            <td className="seen">Congratulations on opening an account at Nakshakar...</td>
            <td>
              <span className="svg-icon message-icon position-relative">

                <span className="d-none rounded-5 message-notification position-absolute" />
              </span>
            </td>
          </tr>
          <tr data-bs-toggle="modal" data-bs-target="#exampleModal">
            <td>{moment().subtract(10, 'days').calendar()}</td>
            <td>{moment().format('LT')}</td>
            <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit..</td>
            <td>
              <span className="svg-icon message-icon position-relative">

                <span className="d-inline-block rounded-5 message-notification position-absolute" />
              </span>
            </td>
          </tr>
          <tr data-bs-toggle="modal" data-bs-target="#exampleModal">
            <td>{moment().subtract(10, 'days').calendar()}</td>
            <td>{moment().format('LT')}</td>
            <td>Congratulations on opening an account at Nakshakar...</td>
            <td>
              <span className="svg-icon message-icon position-relative">

                <span className="d-inline-block rounded-5 message-notification position-absolute" />
              </span>
            </td>
          </tr>
          <tr data-bs-toggle="modal" data-bs-target="#exampleModal">
            <td className="seen">{moment().subtract(10, 'days').calendar()}</td>
            <td className="seen">{moment().format('LT')}</td>
            <td className="seen">Dear Musab, a report has been made on one of your topics..</td>
            <td>
              <span className="svg-icon message-icon position-relative">

                <span className="d-none rounded-5 message-notification position-absolute" />
              </span>
            </td>
          </tr>
          <tr data-bs-toggle="modal" data-bs-target="#exampleModal">
            <td>{moment().subtract(10, 'days').calendar()}</td>
            <td>{moment().format('LT')}</td>
            <td>Congratulations on opening an account at Nakshakar...</td>
            <td>
              <span className="svg-icon message-icon position-relative">

                <span className="d-inline-block rounded-5 message-notification position-absolute" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <MessageModal />
    </>
  );
}

export default Message;
