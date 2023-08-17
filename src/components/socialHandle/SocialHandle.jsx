import { Link } from 'react-router-dom';

function SocialHandle({
  item, editProfile, handleValue, getSocialSkillsName, index
}) {
  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center p-3"
    >
      <p className="mb-0">{item.name}</p>
      {!editProfile && (
      <Link to={item.link} target="_blank">
        <small className="bg-primary text-white rounded-4 p-1 ps-2 pe-2">
          Visit
        </small>
      </Link>
      )}
      {editProfile && (
      <input
        onClick={() => getSocialSkillsName(item.name)}
        style={{ width: '60%' }}
        type="text"
        className="form-control"
        onChange={handleValue(index)}
        name="socialHandle"
        maxLength="200"
        defaultValue={item.link || 'hello'}
      />
      )}
    </li>
  );
}

export default SocialHandle;
