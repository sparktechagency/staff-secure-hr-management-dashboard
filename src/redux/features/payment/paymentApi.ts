import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayment: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/payment/recived`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: search,
        },
      }),
      providesTags: [tagTypes.payment],
    }),
  }),
});

export const { useGetAllPaymentQuery } = paymentApi;
