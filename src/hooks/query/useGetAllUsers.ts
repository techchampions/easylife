import { useQuery } from "@tanstack/react-query";
import { filterUsers, getAllUsers } from "../../services/endpoints";

export const useGetAllUsers = (page: number) => {
  return useQuery({
    queryKey: ["all-users", page],
    queryFn: () => getAllUsers(page),
    enabled: !!page,
  });
};

export const useFilterUsers = (filters?: UserFilterParams) => {
  return useQuery({
    queryKey: ["filtered-users", filters],
    queryFn: () => filterUsers(filters),
  });
};
