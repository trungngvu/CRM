import { useSearchParams } from 'react-router-dom';

const useParams = (params: string) => {
  const [searchParams] = useSearchParams();

  const result = searchParams.get(params);

  return result;
};

export default useParams;
