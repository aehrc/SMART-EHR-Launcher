import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useContext } from "react";
import { Button } from "@/components/ui/button.tsx";
import PractitionerRoleTable from "./PractitionerRoleTable";
import { UserContext } from "@/contexts/UserContext";
import { getSelectedDataIDColorClass } from "@/utils/dataTable";
import { PractitionerRoleContext } from "@/contexts/PractitionerRoleContext";

function PractitionerRoleSettings() {
  const { selectedUser } = useContext(UserContext);

  const { practitionerRoleContextEnabled, onEnablePractitionerRoleContext } =
    useContext(PractitionerRoleContext);

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
          {practitionerRoleContextEnabled ? (
            <PractitionerRoleTable selectedUser={selectedUser} />
          ) : (
            <div>
              <div className="flex items-center justify-center m-20">
                <div className=" text-base text-gray-400">{`Connected Source FHIR Server doesn't support PractitionerRole context`}</div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                  onClick={onEnablePractitionerRoleContext}
                >
                  Enable anyway (launch may fail or PractitionerRole context may
                  not work!)
                </Button>
              </div>
            </div>
          )}
        </CardHeader>
      </Card>
    </div>
  );
}

export default PractitionerRoleSettings;
