import { apiInstance } from ".";

export const login = async ({ email, password }) => {
  const response = await apiInstance.post("/users/login", { email, password });

  return response;
};

export const signUp = async ({ email, password }) => {
  console.log({ email, password });

  const response = await apiInstance.post("/users/signup", { email, password });
  return response;
};
