import LookupForm from './LookupForm';
import ResultsSection from './ResultsSection';
import "./app.scss";

// Use this component as the top level for the Crypto Tracker App
// Utilize other components, that represent sections of the tracker UI (Form, Results, etc) to build out this component

// App Structure
// App.js
//  - Crypto Lookup Form
//    - Coin Input (Autocomplete.js)
//    - Currency Input (Autocomplete.js)
//    - Submit Button (Button.js)
//  - Results Section (data derived from API)
//    - Results List (ResultsCard.js)
//    - Loader UI (Loader.js) for when results are fetching
//
// Store Structure
// formSlice
//  - `formData`: object of form data, holds the values for the lookup form
//  - Has a setter function for each form field
// resultsSlilce
//  - `results`: results data returned from the 3rd party crypto price API
//  - Will contain our async request logic + data storage on success

const App = () => (
  <div className="app">
    <h1 className="app__header">Crypto Price Checker</h1>
    <LookupForm />
    <ResultsSection />
  </div>
)
export default App;
