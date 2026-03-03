import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useContext } from "react";
import PractitionerRoleTable from "./PractitionerRoleTable";
import { UserContext } from "@/contexts/UserContext";
import { getSelectedDataIDColorClass } from "@/utils/dataTable";

function PractitionerRoleSettings() {
  const { selectedUser } = useContext(UserContext);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>PractitionerRole Context</CardTitle>
          <CardDescription>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="flex-1">
                Select the PractitionerRole to be used as the PractitionerRole
                launch context
              </span>
              {selectedUser ? (
                <div className="text-xs">
                  User context:{" "}
                  <span
                    className={`px-2 py-0.5 rounded ${getSelectedDataIDColorClass("Practitioner")}`}
                  >
                    {selectedUser.id}
                  </span>
                </div>
              ) : null}
            </div>
          </CardDescription>
          <PractitionerRoleTable selectedUser={selectedUser} />
        </CardHeader>
      </Card>
    </div>
  );
}

export default PractitionerRoleSettings;
