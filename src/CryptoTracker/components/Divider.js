import RefreshIcon from "@material-ui/icons/Refresh";
import "./divider.scss";

const Divider = ({ onRefresh, hidden, time }) => {

  return (
    <div className="divider">
      <label className="divider__header">PRICING RESULTS</label>
      <RefreshIcon
        className={
          !hidden
            ? "divider__refresh"
            : "divider__refresh divider__refresh__hidden"
        }
        onClick={onRefresh}
        fontSize="small"
      />
      <label
        className={
          !hidden ? "divider__time" : "divider__time divider__time__hidden"
        }
      >
        Data last updated at {time}
      </label>
      <div className="bar">
        <div className="bar__bar" />
      </div>
    </div>
  );
};

export default Divider;
