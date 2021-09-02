import { numberWithCommas, checkCoinDecimal } from "../utils/numberFormat";

const Volume = (props) => {
  const symbol = props.item.sym?.split("_")[1];
  const isPositive = props.item.percentChange >= 0;
  const checkValue = checkCoinDecimal(props.item.amt, props.item.rat, symbol);
  return (
    <div class={isPositive ? "text-primary" : "text-secondary"}>
      {checkValue}
    </div>
  );
};

export default Volume;
