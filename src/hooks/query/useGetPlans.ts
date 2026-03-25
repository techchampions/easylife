import { useQuery } from "@tanstack/react-query";
import api from "../../services/api.service";

export const useGetPlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async (): Promise<Plan[]> => {
      const res = await api.get(`/plans/all-plans`);
      return res.data;
    },
  });
};
export const useFetchSubscription = () => {
  return useQuery({
    queryKey: ["subscription-history"],
    queryFn: async (): Promise<SubHistoryRespone> => {
      const res = await api.get(`/subscriptions/history`);
      return res.data;
    },
  });
};
