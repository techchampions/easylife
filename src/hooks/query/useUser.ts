import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../zustand/user.state";
import { getUser } from "../../services/endpoints";
import { useEffect } from "react";

export const useGetUser = () => {
  const { setUser, setIsLoggedIn } = useUserStore();
  const queryResult = useQuery<any, Error>({
    queryKey: ["user-profile"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (queryResult.data?.success) {
      setUser(queryResult.data.user);
      //   setIsLoggedIn(true);
    }
  }, [queryResult.data, setUser, setIsLoggedIn]);

  return queryResult;
};
