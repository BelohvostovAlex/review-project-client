import axios from "axios";

type uploadFileServiceProps = string | Blob;

export const uploadFileService = async (file: uploadFileServiceProps) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "review-images");

    const response = await axios.post(
      process.env.REACT_APP_CLOUDINARY_UPLOAD_URL!,
      formData
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
