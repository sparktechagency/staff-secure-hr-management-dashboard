import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersOverview: builder.query({
      query: () => "/users/stats",
      providesTags: [tagTypes.user],
    }),
    getAllEmployers: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/users/employer/all?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getAllCandidates: builder.query({
      query: ({ page, limit, searchTerm, designation, location }) => ({
        url: `/users/candidate/all?page=${page}&limit=${limit}&searchTerm=${searchTerm}&designation=${designation}&location=${location}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    blockAndUnblockUser: builder.mutation({
      query: (req) => ({
        url: `/users/update-status/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllUsersOverviewQuery,
  useGetAllEmployersQuery,
  useGetAllCandidatesQuery,
  useBlockAndUnblockUserMutation,
} = UsersApi;
