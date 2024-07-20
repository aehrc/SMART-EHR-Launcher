import useActivePage from "@/hooks/useActivePage.ts";

interface FormLinkProps {
  title: string;
  path: string;
}

function FormLink(props: FormLinkProps) {
  const { title, path } = props;

  const { switchActivePage } = useActivePage();

  return (
    <div
      key={path}
      className="text-xs underline cursor-pointer"
      onClick={() => {
        switchActivePage(path);
      }}
    >
      {title}
    </div>
  );
}

export default FormLink;
