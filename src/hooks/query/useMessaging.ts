import { useQuery } from "@tanstack/react-query";
import { getConversations, getMessages } from "../../services/endpoints";

export const useGetMessages = (conversation_id: string) => {
  return useQuery({
    queryKey: ["messages", conversation_id],
    queryFn: () => getMessages(conversation_id),
    enabled: !!conversation_id,
  });
};
export const useGetCoonversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations(),
  });
};
