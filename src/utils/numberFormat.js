export const scientificToDecimal = (num) => {
  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    let zero = "0",
      parts = String(num).toLowerCase().split("e"), //split into coeff and exponent
      e = parts.pop(), //store the exponential part
      l = Math.abs(e), //get the number of zeros
      sign = e / l,
      coeff_array = parts[0].split(".");
    if (sign === -1) {
      num = zero + "." + new Array(l).join(zero) + coeff_array.join("");
    } else {
      let dec = coeff_array[1];
      if (dec) l = l - dec.length;
      num = coeff_array.join("") + new Array(l + 1).join(zero);
    }
  }
  return num;
};

export const numberFormat = (number, fixed = 8, pad = true, zeroPad = 0) => {
  let n = parseFloat(number);
  if (isNaN(n)) {
    return 0;
  }
  let str = scientificToDecimal(n);
  let parts = str.toString().split(".");
  let dec = "";
  if (parts.length < 2) {
    if (zeroPad > 0) {
      return n.toFixed(zeroPad);
    }

    return n;
  } else {
    dec = parts[1].substring(0, fixed);
    if (pad && dec.length < fixed) {
      let rem = fixed - dec.length;
      for (let i = 0; i < rem; i++) {
        dec += "0";
      }
    }
    let result = parts[0];
    if (dec.length) {
      result = result + "." + dec;
    }
    return result;
  }
};

export const numberWithCommas = (x) => {
  if (typeof x === "undefined" || isNaN(x)) {
    return 0;
  }
  let y = x.toString().split(".");
  let d = y.length > 1 ? "." + y[1] : "";
  return y[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + d;
};

export const numberFormatWithCommas = (
  number,
  fixed = 8,
  pad = true,
  zeroPad = 0
) => {
  return numberWithCommas(numberFormat(number, fixed, pad, zeroPad));
};

export const checkCoinDecimal = (volumnCoin = 0, priceTHB = 0, alias = "") => {
  const GROUP_8_DECIMAL = ["BTC"];

  if (GROUP_8_DECIMAL.includes(alias)) {
    return numberFormatWithCommas(volumnCoin, 8);
  } else if (priceTHB >= 100000) {
    return numberFormatWithCommas(volumnCoin, 8);
  } else if (priceTHB >= 1000 && priceTHB < 100000) {
    return numberFormatWithCommas(volumnCoin, 4);
  } else {
    return numberFormatWithCommas(volumnCoin, 2);
  }
};
