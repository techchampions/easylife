import { useQuery } from "@tanstack/react-query";
import {
  getMentorshipPost,
  getMentorshipPostById,
} from "../../services/endpoints";

export const useGetMentorshipPost = () => {
  return useQuery({
    queryKey: ["mentorship-posts"],
    queryFn: () => getMentorshipPost(),
  });
};
export const useGetMentorshipPostById = (id: number) => {
  return useQuery({
    queryKey: ["mentorship-posts", id],
    queryFn: () => getMentorshipPostById(id),
    enabled: !!id,
  });
};
