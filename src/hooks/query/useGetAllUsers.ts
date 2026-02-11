import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  filterUsers,
  getAllUsers,
  getUserByID,
} from "../../services/endpoints";

export const useGetUserByID = (id: number | string) => {
  return useQuery({
    queryKey: ["single-user", id],
    queryFn: () => getUserByID(id),
    enabled: !!id,
  });
};
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

export const useGetAllUsersInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["all-users"],

    queryFn: ({ pageParam = 1 }) => getAllUsers(pageParam as number),

    initialPageParam: 1,

    getNextPageParam: (data) => {
      // Most common patterns — choose one that matches your API
      // if (!data.users.next) return undefined;
      // return data.users.current + 1;
      if (!data) {
        return undefined;
      }

      // Alternative styles:
      // return lastPage.nextPage ?? undefined;
      // return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined;
    },

    // Optional but recommended:
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
  });
};
