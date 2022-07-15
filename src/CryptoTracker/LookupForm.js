import { useDispatch, useSelector } from "react-redux";
import { setCoin, setCurrency, fetchPrice } from "./store/formSlice";
import Autocomplete from "./components/Autocomplete";
import Button from "./components/Button";
import "./lookupform.scss";

const COIN_OPTIONS = [
  {
    label: "Bitcoin",
    value: "BTC",
  },
  {
    label: "Dogecoin",
    value: "DOGE",
  },
  {
    label: "Litecoin",
    value: "LTC",
  },
  {
    label: "Dash",
    value: "DASH",
  },
  {
    label: "Zcash",
    value: "ZEC",
  },
];

const CURRENCY_OPTIONS = [
  {
    label: "US Dollar",
    value: "USD",
  },
  {
    label: "Bitcoin",
    value: "BTC",
  },
  {
    label: "Euro",
    value: "EUR",
  },
];

const LookupForm = () => {
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.form.formData);

  // We should pass `value` to the corresponding dispatched action from `formSlice`
  const onCoinInputChange = (value) => {
    dispatch(setCoin(value));
  };

  // We should pass `value` to the corresponding dispatched action from `formSlice`
  const onCurrencyInputChange = (value) => {
    dispatch(setCurrency(value));
  };

  // We should initiate our network request using form values here
  const onFormSubmit = () => {
    dispatch(fetchPrice(formValues));
  };

  // Submit is enabled if all form fields are populated with a value
  const submitEnabled = !!formValues.coin;

  return (
    <div className="lookup-form">
      <div className="lookup-column">
        <Autocomplete
          label="Coin"
          onChange={onCoinInputChange}
          options={COIN_OPTIONS}
        />
      </div>
      <div className="lookup-column">
        <Autocomplete
          label="Currency (Optional)"
          onChange={onCurrencyInputChange}
          options={CURRENCY_OPTIONS}
        />
      </div>
      <div className="button-column">
        <Button
          label="Get Prices"
          disabled={!submitEnabled}
          onClick={onFormSubmit}
        />
      </div>
    </div>
  );
};

export default LookupForm;
