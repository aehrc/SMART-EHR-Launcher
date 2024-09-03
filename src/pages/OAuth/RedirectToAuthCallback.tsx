import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function RedirectToAuthCallback() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/authcallback");
    // Save state to session storage
    sessionStorage.setItem("initialSearchParams", searchParams.toString());
  }, [navigate, searchParams]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="border-gray-200 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      <div className="sr-only">Loading</div>
    </div>
  );
}

export default RedirectToAuthCallback;
