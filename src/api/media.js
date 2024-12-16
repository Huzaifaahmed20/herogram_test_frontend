import { apiInstance } from ".";

export const upload = async (file) => {
  const response = await apiInstance.post("/media/upload", file);

  return response;
};
