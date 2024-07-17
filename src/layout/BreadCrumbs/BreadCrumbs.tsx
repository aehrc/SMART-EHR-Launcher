import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb.tsx";
import { TitleContext } from "@/contexts/TitleContext.tsx";
import { useContext } from "react";

function BreadCrumbs() {
  const { title } = useContext(TitleContext);

  return (
    <Breadcrumb className="flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <div className="text-base">{title}</div>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumbs;
