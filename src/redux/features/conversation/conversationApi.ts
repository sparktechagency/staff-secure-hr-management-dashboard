import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const conversationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getConversationList: build.query({
      query: ({ page, limit = 1000000, role, search }) => {
        return {
          url: `/chat/admin/my-chat-list`,
          method: "GET",
          params: {
            role,
            page,
            limit,
            search,
          },
        };
      },
      providesTags: [tagTypes.conversation],
    }),
    getConversationMessageList: build.query({
      query: ({ id, page, limit }) => ({
        url: `/message/${id}`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.conversation],
    }),
  }),
});

export const {
  useGetConversationListQuery,
  useGetConversationMessageListQuery,
} = conversationApi;

export default conversationApi;
