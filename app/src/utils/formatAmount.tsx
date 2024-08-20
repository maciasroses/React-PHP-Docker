const locale: { [key: string]: string } = {
  USD: "en-US",
  GBP: "en-GB",
  EUR: "de-DE",
  MXN: "es-MX",
};

const formatAmount = (amount: number, currency: string) => {
  return Number(amount).toLocaleString(locale[currency], {
    style: "currency",
    currency: currency,
  });
};

export default formatAmount;
