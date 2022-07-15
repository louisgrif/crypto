import Pricecard from "./components/Pricecard.js";
import { useSelector, useDispatch } from "react-redux";
import Divider from "./components/Divider";
import Loading from "./components/Loading";
import { fetchPrice } from "./store/formSlice";
import "./resultssection.scss";

const ResultsSection = () => {
  const fetchedPrices = useSelector((state) => state.form.results);
  const formValues = useSelector((state) => state.form.formData);
  const isLoading = useSelector((state) => state.form.loading);
  const time = useSelector((state) => state.form.time)
  const dispatch = useDispatch();
  
  return (
    <div className="results">
      <Divider
        onRefresh={() => dispatch(fetchPrice(formValues))}
        hidden={!(formValues.coin && !!fetchedPrices.prices && fetchedPrices.prices.length > 0)}
        time={time}
      />
      <ul className="results__cardsection">
        {!!fetchedPrices.prices && fetchedPrices.prices.length > 0 ? (
          fetchedPrices.prices.map((data) => (
            <Pricecard data={data} coin={fetchedPrices.network} />
          ))
        ) : !!isLoading ? (
          <Loading />
        ) : (
          <div className="results__noresults">
            <label className="results__noresults__top">No Results</label>
            <label className="results__noresults__bottom">
              Try searching using the form above
            </label>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ResultsSection;
