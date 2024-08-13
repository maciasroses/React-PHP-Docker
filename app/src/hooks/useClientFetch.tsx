// OPTION WITHOUT TRANSFORM:

import { useEffect, useState } from "react";

export default function useClientFetch<T>(fetchClient: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchClient();
        setData(result);
      } catch {
        console.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchClient]);

  return { data, loading };
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
