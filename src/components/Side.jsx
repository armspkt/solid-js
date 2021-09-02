import { checkSide } from "../utils/lib";

const Side = (props) => {
  const { side, isPositive } = checkSide(props.item.txn);
  return (
    <div class={isPositive ? "text-primary" : "text-secondary"}>{side}</div>
  );
};

export default Side;
