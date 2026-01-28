import { useQuery } from "@tanstack/react-query";
import { getMentorshipPost } from "../../services/endpoints";

export const useGetMentorshipPost = () => {
  return useQuery({
    queryKey: ["mentorship-posts"],
    queryFn: () => getMentorshipPost(),
  });
};
