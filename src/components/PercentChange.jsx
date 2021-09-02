const PercentChange = (props) => {
  const isPositive = props.item.percentChange >= 0;

  return (
    <div class="flex items-center justify-center">
      <div
        class={`rounded w-24 py-2 ${
          isPositive ? "bg-green-50 text-primary" : "bg-red-50 text-secondary"
        }`}
      >
        {props.item.percentChange}%
      </div>
    </div>
  );
};

export default PercentChange;
