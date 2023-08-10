import Chart from '../charts/LineChart';
import './balance.scss';

function Balance() {
  return (
    <div className="balance-list">
      <div className="balance-card d-flex">

        {/* -----------CURRENT BALANCE----------- */}
        <div className="current-balance">
          <div className="current-balance-card custom-border-color">
            <div className="header base-bg-color-1 text-white">Current Balance</div>
            <div className="count"><span className="fw-bold fs-5">5023 TK</span></div>
          </div>

          {/* -----------WITHDRAW BUTTON----------- */}
          <div className="withdraw-btn mt-3">
            <button type="button" className="btn base-bg-color-1 rounded-5 text-white border-0">Request for withdraw</button>
          </div>
        </div>

        {/* -----------TOTAL EARNING----------- */}
        <div className="total-earning-card custom-border-color">
          <div className="header base-bg-color-1 text-white">Total Earnings</div>
          <div className="count"><span className="fw-bold fs-5">9023 TK</span></div>
        </div>
      </div>

      {/* -----------BALANCE BY CHART----------- */}
      <div className="balance-chart mt-3 w-100 overflow-x-auto">
        <h4 className="text-center">Earning This Month</h4>
        <Chart />
      </div>
    </div>
  );
}

export default Balance;
