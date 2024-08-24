
// revenueSummary component
function RevenueSummary({ dailyRevenue, monthlyRevenue, yearlyRevenue }) {
  return (
    <div className="stats shadow w-full bg-white">
      <div className="stat">
        <div className="stat-title">Daily Revenue</div>
        {dailyRevenue ? (
          <div className="stat-value">{dailyRevenue?.toFixed(2)}</div>
        ) : (
          <div className="text-lg">Please Select date for revenue and sale</div>
        )}
        <div className="stat-desc">Revenue for today</div>
      </div>

      <div className="stat">
        <div className="stat-title">Monthly Revenue</div>
        <div className="stat-value">{monthlyRevenue?.toFixed(2)}</div>
        <div className="stat-desc">Revenue for this month</div>
      </div>

      <div className="stat">
        <div className="stat-title">Yearly Revenue</div>
        <div className="stat-value">{yearlyRevenue?.toFixed(2)}</div>
        <div className="stat-desc">Revenue for this year</div>
      </div>
    </div>
  );
}

export default RevenueSummary;
