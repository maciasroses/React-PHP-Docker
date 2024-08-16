// OPTION WITHOUT TRANSFORM:

import { IResponse } from "../interfaces";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function useClientFetch<T>(fetchClient: () => Promise<T>) {
  const { t } = useTranslation();
  const lng = t("lang");

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = (await fetchClient()) as IResponse;
        if (result.status !== 200)
          throw new Error(JSON.stringify(result.messages));
        setData(result.data as T);
      } catch (error) {
        const errorData = JSON.parse((error as Error).message);
        setError({
          name: lng === "en" ? errorData.error : errorData.es_error,
          message:
            lng === "en" ? errorData.description : errorData.es_description,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchClient, lng]);

  return { data, loading, error };
}

// OPTION WITH TRANSFORM:

// import { useEffect, useState } from "react";

// export default function useClientFetch<T, R>(
//   client: Promise<T>,
//   transform: (data: T) => R
// ) {
//   const [data, setData] = useState<R | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const result = await client;
//         const transformedData = transform(result);
//         setData(transformedData);
//       } catch {
//         console.error("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [client, transform]);

//   return { data, loading };
// }
