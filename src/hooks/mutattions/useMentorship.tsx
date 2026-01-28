import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../zustand/toast.state";
import { dislikePost, likePost } from "../../services/endpoints";

const { showToast } = useToast.getState();
export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentorship-posts"],
      });
      showToast("Post liked", "success");
    },
    onError: () => {
      // Handle any other errors
      showToast("Failed to like post", "error");
    },
  });
};
export const useDislikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dislikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentorship-posts"],
      });
      showToast("Post disliked", "success");
    },
    onError: () => {
      // Handle any other errors
      showToast("Failed to dislike post", "error");
    },
  });
};
