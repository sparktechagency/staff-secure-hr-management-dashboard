import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";
import Cookies from "js-cookie";
import { getBaseUrl } from "../../helpers/config/envConfig";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("staffSecureDashboard_accessToken");
    const resendOtptoken = Cookies.get("staffSecureDashboard_forgetToken");
    const resetPasswordToken = Cookies.get(
      "staffSecureDashboard_forgetOtpMatchToken"
    );

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (resendOtptoken) {
      headers.set("Authorization", `Bearer ${resendOtptoken}`);
    }
    if (resetPasswordToken) {
      headers.set("Authorization", `Bearer ${resetPasswordToken}`);
    }

    return headers;
  },
});

// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     const res = await fetch(`${getBaseUrl()}/auth/refresh-token`, {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();
//     if (data?.data?.accessToken) {
//       const user = api.getState().auth.user;

//       api.dispatch(
//         setUser({
//           user,
//           token: data.data.accessToken,
//         })
//       );

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       // api.dispatch(logout());
//     }
//   }

//   return result;
// };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
