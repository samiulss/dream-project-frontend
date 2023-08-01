import './arow.scss';

function Arrow({ right }) {
  return (
    <i className={`${right === 'right' ? 'fa-solid fa-chevron-right text-dark d-flex align-items-center justify-content-center ' : 'fa-solid fa-angle-left text-dark d-flex align-items-center justify-content-center'}`} />
  );
}

export default Arrow;
