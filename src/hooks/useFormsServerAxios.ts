/*
 * Copyright 2025 Commonwealth Scientific and Industrial Research
 * Organisation (CSIRO) ABN 41 687 119 230.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import axios from "axios";
import useConfig from "@/hooks/useConfig.ts";

function useFormsServerAxios() {
  const { formsServerUrl } = useConfig();

  const axiosInstance = axios.create({
    baseURL: formsServerUrl,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      // Reuse existing config. Forms server token config removed as of 17 June 2026 - doesn't make sense for a Questionnaire definition server to have a token
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosInstance;
}

export default useFormsServerAxios;
