import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

interface LinkFormProps {
  title: string;
  path: string;
}

function LinkForm(props: LinkFormProps) {
  const { title, path } = props;

  const navigate = useNavigate();

  const { closeSnackbar } = useSnackbar();

  return (
    <div
      key={path}
      className="text-xs underline cursor-pointer"
      onClick={() => {
        closeSnackbar();
        navigate(path + window.location.search);
      }}
    >
      {title}
    </div>
  );
}

export default LinkForm;
