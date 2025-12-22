import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const jobBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDispatchOverview: builder.query({
      query: () => ({
        url: `/overview/cv-dispatch`,
        method: "GET",
      }),
      providesTags: [tagTypes.jobBoard],
    }),
    getPlacementOverview: builder.query({
      query: () => ({
        url: `/overview/placement`,
        method: "GET",
      }),
      providesTags: [tagTypes.jobBoard],
    }),
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
    getAllPlacementCandidates: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/application/placement-candidates`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: search,
        },
      }),
      providesTags: [tagTypes.jobBoard],
    }),
    getAllAITopPlacementCandidates: builder.query({
      query: ({ path }) => ({
        url: `/application/top-ai-suggested-cvs/${path}`,
        method: "GET",
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
    sendMultipleCv: builder.mutation({
      query: (req) => ({
        url: `/application/sent-multiple-cvs`,
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
  useGetDispatchOverviewQuery,
  useGetPlacementOverviewQuery,
  useGetJobBoardQuery,
  useGetAllApplicantsQuery,
  useGetAllDispatchedCVsQuery,
  useGetAllPlacementCandidatesQuery,
  useGetAllAITopPlacementCandidatesQuery,
  useSendDirectCvMutation,
  useSendMultipleCvMutation,
} = jobBoardApi;
