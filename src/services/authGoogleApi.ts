import axios from "axios";

import { GOOGLE_OAUTH_USER_INFO_URL } from "../mock/mockUrls";

export const authGoogleApi = async (accessToken: string) => {
  try {
    const { data } = await axios.get(GOOGLE_OAUTH_USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
