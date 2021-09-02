import { checkSide } from "../utils/lib";

const Currency = (props) => {
  const symbol = props.item.sym?.split("_")[1];
  const isPositive = props.item.percentChange >= 0;

  return (
    <div class={isPositive ? "text-primary" : "text-secondary"}>{symbol}</div>
  );
};

export default Currency;
