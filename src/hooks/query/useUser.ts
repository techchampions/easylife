import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../zustand/user.state";
import {
  getNotifications,
  getUser,
  verifyReferalCode,
} from "../../services/endpoints";
import { useEffect } from "react";

export const useGetUser = () => {
  const { setUser, setIsLoggedIn, token } = useUserStore();
  const queryResult = useQuery<GetUserResponse, Error>({
    queryKey: ["user-profile"],
    queryFn: getUser,
    enabled: !!token,
  });

  useEffect(() => {
    if (queryResult.data?.success) {
      setUser(queryResult.data.user);
      //   setIsLoggedIn(true);
    }
  }, [queryResult.data, setUser, setIsLoggedIn]);

  return queryResult;
};

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });
};

export const useVerifyReferalCode = (referal_code: string) => {
  return useQuery({
    queryKey: ["referal_code_exists", referal_code],
    queryFn: () => verifyReferalCode(referal_code),
    enabled: !!referal_code,
  });
};
