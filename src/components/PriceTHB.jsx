import { numberWithCommas } from "../utils/numberFormat";

const PriceTHB = (props) => {
  const isPositive = props.item.percentChange >= 0;
  const rat = numberWithCommas(props.item.rat);
  return (
    <div class={isPositive ? "text-primary" : "text-secondary"}>{rat}</div>
  );
};

export default PriceTHB;
