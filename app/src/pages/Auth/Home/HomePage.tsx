import { useCallback } from "react";
import { Card404 } from "../../../components";
import { useTranslation } from "react-i18next";
import { useClientFetch } from "../../../hooks";
import { Link, useSearchParams } from "react-router-dom";
import { AccountingClient } from "../../../services";
import { BarChart, BarChartSkeleton, CurrencySelector } from "./components";
import type { IAccountingsForBarChart } from "../../../interfaces";

const HomePage = () => {
  const { t } = useTranslation();
  const lng = t("lang");
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
        <>
          {data && data.length > 0 ? (
            <BarChart accountings={data as IAccountingsForBarChart[]} />
          ) : (
            <>
              <Card404
                title={
                  lng === "en"
                    ? "Accountings were not found for graph"
                    : "No se encontraron contabilidades para el gráfico"
                }
                description={
                  lng === "en"
                    ? "Try adding a new accounting"
                    : "Intenta agregar una nueva contabilidad"
                }
              />
              <div className="flex justify-center items-center">
                <Link to="/auth/accounting/add">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    {lng === "en" ? "Create" : "Crear"}
                  </button>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
