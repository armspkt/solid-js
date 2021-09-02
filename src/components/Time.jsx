import { format } from "date-fns";

const formatTime = (timestamp) => {
  if (timestamp) {
    return format(new Date(timestamp * 1000), "HH:mm:ss");
  }
  return null;
};

const Time = (props) => {
  const time = formatTime(props.item.ts);
  const isPositive = props.item.percentChange >= 0;
  return (
    <div class={isPositive ? "text-primary" : "text-secondary"}>{time}</div>
  );
};

export default Time;
