const lngHelper: { [key: string]: { [key: string]: string } } = {
  en: {
    Expense: "Expense",
    Income: "Income",
    Transfer: "Transfer",
  },
  es: {
    Expense: "Gasto",
    Income: "Ingreso",
    Transfer: "Transferencia",
  },
};

const formatType = (lng: string, type: string) => {
  return lngHelper[lng][type];
};

export default formatType;
