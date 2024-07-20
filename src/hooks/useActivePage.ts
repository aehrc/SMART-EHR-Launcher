import { ActivePageContext } from "../contexts/ActivePageContext.tsx";
import { useContext } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function useActivePage() {
  const { path, setPath } = useContext(ActivePageContext);

  const navigate = useNavigate();
  const { closeSnackbar } = useSnackbar();

  return {
    activePath: path,
    switchActivePage: (newPath: string) => {
      setPath(newPath);
      closeSnackbar();
      navigate(newPath + window.location.search);
    },
  };
}

export default useActivePage;
