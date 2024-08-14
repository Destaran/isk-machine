import { useQuery } from "@tanstack/react-query";
import {
  getUniverseCategoriesCategoryId,
  GetUniverseCategoriesCategoryIdData,
} from "../../hey-api";

export function useCategory(id: number) {
  const options: GetUniverseCategoriesCategoryIdData = {
    path: { category_id: id },
  };

  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getUniverseCategoriesCategoryId(options),
  });
}
