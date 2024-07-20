import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

function PatientProfileLoading() {
  return (
    <Card className="mt-2 ring-offset-background">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Patient demographic information and other details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 my-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex gap-5">
              <Skeleton className="w-32 bg-gray-200 animate-pulse" />
              <Skeleton className="h-5 w-64 bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PatientProfileLoading;
