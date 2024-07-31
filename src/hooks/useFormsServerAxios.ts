import axios from "axios";
import { useContext } from "react";
import { FormsServerContext } from "@/contexts/FormsServerContext.tsx";

function useFormsServerAxios() {
  const { baseUrl, accessToken } = useContext(FormsServerContext);

  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      // Use access token if provided
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      // Reuse existing config if no token
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosInstance;
}

export default useFormsServerAxios;
