import AxiosInstance from "../utils/AxiosInstance";

export const createShortUrl = async ({url,slug}) => {
  try {
    const { data } = await AxiosInstance.post("/api/create", { url,slug });
    return data.shortUrl;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
        error.response.data ||
        "Server error"
      );
    }

    if (error.request) {
      throw new Error("Server not responding. Please try again.");
    }
    throw new Error(error.message || "Unexpected error");
  }
};
