import axios, {AxiosError} from "axios";
import { useCallback, useState } from "react";
import {IError} from "../../interface/collection";

interface Props<T> {
  url: string;
  initialData: T[] | null;
}

interface State<T> {
  loading: boolean;
  data: T[] | null;
  error: string | null;
}

export default function useFetch<T = unknown>({ url, initialData }: Props<T>): [
  refetch: (params: any) => Promise<void | Error>,
  args: State<T>
] {
  const [data, setData] = useState<null | T[]>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const fetchHandler = useCallback(async (params: any) => {
    setLoading(prevState => !prevState);
    setError(null);
    setData(null);
    try {
      await axios
        .get(url, { params: { ...params } })
        .then((res) => setData(res.data.data))
    } catch(err) {
      const error = err as Error | AxiosError<IError>;

      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error);
      } else {
        setError("Error occurred");
      }
    } finally {
      setLoading(prevState => !prevState);
    }
  }, [url]);


  return [fetchHandler, { data, error, loading }];
};
