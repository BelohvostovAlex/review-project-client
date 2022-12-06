import axios from "axios";

import { CLOUDINARY_UPLOAD_URL } from "../../mock/mockUrls";

type uploadFileServiceProps = string | Blob;

export const uploadFileService = async (file: uploadFileServiceProps) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "review-images");

    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
