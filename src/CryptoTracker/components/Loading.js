import "./loading.scss";

const Loading = () => {
  return (
    <div className="container">
      <div className="loadcontainer">
        <span className="dot dot--1" />
        <span className="dot dot--2" />
        <span className="dot dot--3" />
        <span className="dot dot--4" />
        <span className="dot dot--5" />
      </div>
      <label className="loadtext">Loading...</label>
    </div>
  );
};

export default Loading;
