import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getMonthName } from "../../../../../utils/getMonthName";
import type { IAccountingsForBarChart } from "../../../../../interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getMonthlyData = (
  transactions: IAccountingsForBarChart[],
  type: string
) => {
  const dataByMonth: { [key: number]: number } = {};

  transactions
    .filter((transaction) => transaction.type === type)
    .forEach((transaction) => {
      const month = new Date(transaction.date).getMonth(); // Get month index (0 = January)
      if (!dataByMonth[month]) {
        dataByMonth[month] = 0;
      }
      dataByMonth[month] += transaction.amount;
    });

  return dataByMonth;
};

const BarChart = ({
  accountings,
}: {
  accountings: IAccountingsForBarChart[];
}) => {
  const incomeData = getMonthlyData(accountings, "Income");
  const expenseData = getMonthlyData(accountings, "Expense");
  const transferData = getMonthlyData(accountings, "Transfer");

  // Get unique months from the combined data
  const uniqueMonths = [
    ...new Set([
      ...Object.keys(incomeData),
      ...Object.keys(expenseData),
      ...Object.keys(transferData),
    ]),
  ].sort((a, b) => Number(a) - Number(b)); // Sort months

  const labels = uniqueMonths.map((month) => getMonthName(Number(month)));

  // Map data to match the unique months order
  const mapDataToMonths = (data: { [key: number]: number }) =>
    uniqueMonths.map((month) => data[Number(month)] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Ingresos",
        data: mapDataToMonths(incomeData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Gastos",
        data: mapDataToMonths(expenseData),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Transferencias",
        data: mapDataToMonths(transferData),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Ingresos y Gastos por Mes",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
