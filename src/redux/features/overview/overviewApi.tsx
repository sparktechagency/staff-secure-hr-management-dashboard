import { baseApi } from "../../api/baseApi";
// import { tagTypes } from "../../tagTypes";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => {
        return {
          url: "/overview/admin/total-overview",
          method: "GET",
        };
      },
      //   providesTags: [tagTypes.],
    }),
    getUserOverviewStats: builder.query({
      query: ({ role, year }) => {
        return {
          url: `/overview/admin/user-statistics?role=${role}&year=${year}`,
          method: "GET",
        };
      },
      //   providesTags: [tagTypes.],
    }),
    getEarningStats: builder.query({
      query: ({ year }) => {
        return {
          url: `/overview/admin/earning-statistics?year=${year}`,
          method: "GET",
        };
      },
      //   providesTags: [tagTypes.],
    }),
    getNotificationAndJob: builder.query({
      query: () => {
        return {
          url: `/overview/admin/latest-notifications-and-jobs`,
          method: "GET",
        };
      },
      //   providesTags: [tagTypes.],
    }),
    getAllNotifications: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/notification`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetUserOverviewStatsQuery,
  useGetEarningStatsQuery,
  useGetNotificationAndJobQuery,
  useGetAllNotificationsQuery,
} = overviewApi;
