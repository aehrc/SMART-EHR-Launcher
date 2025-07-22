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

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface AusCVDRiskIContextToastCardProps {
  title: string;
  detail: string;
  icon: ReactNode;
  badge: ReactNode;
}

function AusCVDRiskIContextToastCard(props: AusCVDRiskIContextToastCardProps) {
  const { title, icon, badge, detail } = props;

  return (
    <Card className="shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {icon}
          <div className="flex-1">
            <div className="font-medium text-sm">{title}</div>
            <div className="text-xs text-muted-foreground">{detail}</div>
          </div>
          {badge}
        </div>
      </CardContent>
    </Card>
  );
}

export default AusCVDRiskIContextToastCard;
