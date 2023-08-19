function UserSkills({
  item, editProfile, handleValue, getSocialSkillsName
}) {
  return (
    <div className=" mb-4">
      <p className="mb-1" style={{ fontSize: '.77rem' }}>
        {item.name}
      </p>
      {!editProfile && (
        <div className="progress rounded" style={{ height: '5px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${item.value}%` }}
            aria-valuenow={item.value}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      )}
      {editProfile && (
        <input
          type="number"
          onClick={() => getSocialSkillsName(item.name)}
          className="form-control"
          onChange={handleValue}
          name="skills"
          defaultValue={item.value}
        />
      )}
    </div>
  );
}

export default UserSkills;
