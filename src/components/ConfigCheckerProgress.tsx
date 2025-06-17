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

interface ConfigCheckerProgressProps {
  validCount: number;
  totalCount: number;
}

function ConfigCheckerProgress(props: ConfigCheckerProgressProps) {
  const { validCount, totalCount } = props;

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Configuration Status: {validCount}/{totalCount} configured
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${
              validCount === totalCount ? "bg-green-600" : "bg-yellow-500"
            } transition-all duration-300`}
            style={{
              width: `${(validCount / totalCount) * 100}%`,
            }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {Math.round((validCount / totalCount) * 100)}%
        </span>
      </div>
    </div>
  );
}

export default ConfigCheckerProgress;
