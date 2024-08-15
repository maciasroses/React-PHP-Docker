import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AccountingClient } from "../../../services";
import { BarChart, BarChartSkeleton, CurrencySelector } from "./components";
import type { IAccountingsForBarChart } from "../../../interfaces";
import { useClientFetch } from "../../../hooks";

const HomePage = () => {
  const [searchParams] = useSearchParams();

  const fetchAccountings = useCallback(() => {
    return AccountingClient.getAllForBarChart(searchParams) as Promise<
      IAccountingsForBarChart[]
    >;
  }, [searchParams]);

  const { data, loading } =
    useClientFetch<IAccountingsForBarChart[]>(fetchAccountings);

  return (
    <>
      <CurrencySelector />
      {loading ? (
        <BarChartSkeleton />
      ) : (
        <BarChart accountings={data as IAccountingsForBarChart[]} />
      )}
    </>
  );
};

export default HomePage;
