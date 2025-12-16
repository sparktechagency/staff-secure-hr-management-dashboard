import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const jobBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobBoard: builder.query({
      query: ({ page, limit }) => ({
        url: `/job/all/withApplicantsCount`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.jobBoard],
    }),
    getAllApplicants: builder.query({
      query: ({ id, page, limit, search }) => ({
        url: `/application/view-cvs/${id}`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: search,
        },
      }),
      providesTags: [tagTypes.jobBoard],
    }),
    getAllDispatchedCVs: builder.query({
      query: ({ page, limit }) => ({
        url: `/application/cv-dispatch`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.jobBoard],
    }),
    sendDirectCv: builder.mutation({
      query: (req) => ({
        url: `/application/send-cv/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.jobBoard],
    }),
    // updateCategory: builder.mutation({
    //   query: (req) => ({
    //     url: `/category/update/${req.params.id}`,
    //     method: "PATCH",
    //     body: req.body, // Passing the body from the request
    //   }),
    //   invalidatesTags: [tagTypes.jobBoard],
    // }),
    // deleteCategory: builder.mutation({
    //   query: (req) => ({
    //     url: `/category/${req.params.id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.jobBoard],
    // }),
  }),
});

export const {
  useGetJobBoardQuery,
  useGetAllApplicantsQuery,
  useGetAllDispatchedCVsQuery,
  useSendDirectCvMutation,
} = jobBoardApi;
