import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const [search, setSearch] = useSearchParams();
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));

  return [searchAsObject, setSearch];
};
