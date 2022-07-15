import { Provider } from "react-redux";
import App from "./App";
import store from "./store/createStore";

const WrappedApp = () => (
  <Provider {...{ store }}>
    <App />
  </Provider>
);

export default WrappedApp;
