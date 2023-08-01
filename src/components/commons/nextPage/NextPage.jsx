import './nextPage.scss';

function NextPage() {
  return (
    <div className="next-page d-flex align-items-center justify-content-center">
      <div className="prev-next-btn">
        <div type="button" className="btn-bg border">
          <span className="svg-icon prev-btn" />
        </div>
        <div className="border page">
          <span className="">01</span>
        </div>
        <div className="border page">
          <span className="">02</span>
        </div>
        <div className="border page">
          <span className="">03</span>
        </div>
        <div type="button" className="btn-bg border me-0">
          <span className="svg-icon next-btn" />
        </div>
      </div>
    </div>
  );
}

export default NextPage;
