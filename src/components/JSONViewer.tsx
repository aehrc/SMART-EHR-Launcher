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

import SyntaxHighlighter from "react-syntax-highlighter";

interface JsonViewerProps {
  jsonString: string;
}

function JsonViewer(props: JsonViewerProps) {
  const { jsonString } = props;

  return (
    <SyntaxHighlighter
      language="json"
      customStyle={{
        backgroundColor: "var(--background-muted)",
      }}
    >
      {jsonString}
    </SyntaxHighlighter>
  );
}

export default JsonViewer;
