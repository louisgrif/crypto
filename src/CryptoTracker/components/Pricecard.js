import "./pricecard.scss";

const Pricecard = ({ data, coin }) => {

  const getPrice = (price, base) => {
    //Make sure price isn't too long
    if (price.length > 8 && price.indexOf(".") + 3 < price.length) {
      let tempPrice = price;
      tempPrice = tempPrice.substring(0, tempPrice.indexOf(".") + 3);
      /*
      TODO: Add in scientific notation or something
      if(tempPrice === "0.00") {

      }*/
      price = tempPrice;
    }
    //Tack on a zero if it needs one
    else if (price.indexOf(".") > price.length - 3) price = price + "0";

    //If it's currency, put the unit before the price
    let intlPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: base,
    }).format(price);
    if (!intlPrice) return price + " " + base;
    //If it's another coin, put the unit after the price
    return intlPrice;
  };

  const getTimestamp = (time) => {
    let timeOfDay = (time - 18000) % 86400;

    let seconds = timeOfDay % 60;
    //seconds to minutes
    timeOfDay = Math.floor(timeOfDay / 60);
    let minutes = timeOfDay % 60;
    //minutes to hours
    timeOfDay = Math.floor(timeOfDay / 60);
    if (timeOfDay === 0) timeOfDay = 12;

    //fixing possible single digit minute or second value
    if (seconds < 10) seconds = "0" + seconds;
    if (minutes < 10) minutes = "0" + minutes;

    return timeOfDay + ":" + minutes + ":" + seconds;
  };

  const getExchange = (exchange) => {
    return (
      coin +
      " - " +
      exchange.substring(0, 1).toUpperCase() +
      exchange.substring(1, exchange.length)
    );
  };

  return (
    <div className="pricecard">
      <label className="pricecard__heading">
        {getExchange(data.exchange)}
      </label>
      <label className="pricecard__timestamp">
        {getTimestamp(data.time)}
      </label>
      <label className="pricecard__price">
        {getPrice(data.price, data.price_base)}
      </label>
    </div>
  );
};

export default Pricecard;
