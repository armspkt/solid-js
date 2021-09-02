export const checkSide = (txn) => {
  let side = "";
  let isPositive = false;
  if (txn?.search("SELL") >= 0) {
    side = "SELL";
    isPositive = false;
  } else if (txn?.search("BUY") >= 0) {
    side = "BUY";
    isPositive = true;
  }
  return { side, isPositive };
};
