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

import { createContext, ReactNode } from "react";
import {
  ConfigFile,
  FALLBACK_CONFIG,
  loadConfigFle,
  responseIsConfigFile,
} from "@/utils/configFile.ts";
import { useQuery } from "@tanstack/react-query";

interface ConfigContextType {
  config: ConfigFile;
  configIsLoading: boolean;
  configIsValid: boolean;
  loadConfigHasError: boolean;
}

export const ConfigContext = createContext<ConfigContextType>({
  config: FALLBACK_CONFIG,
  configIsLoading: true,
  configIsValid: false,
  loadConfigHasError: false,
});

const ConfigContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: loadedConfig,
    isLoading,
    isError,
    error,
  } = useQuery<ConfigFile>({
    queryKey: ["configFile"],
    queryFn: loadConfigFle,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 1,
  });

  let config = FALLBACK_CONFIG;
  if (loadedConfig) {
    config = loadedConfig;
  }

  const configIsValid = responseIsConfigFile(config);

  // Log error if the config is not valid
  if (isError) {
    console.error("[ConfigContext.tsx] Error from config.json:\n", error);
  }

  return (
    <ConfigContext.Provider
      value={{
        config: config,
        configIsLoading: isLoading,
        configIsValid: configIsValid,
        loadConfigHasError: isError,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
