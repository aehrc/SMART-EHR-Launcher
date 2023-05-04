import { TitleContext } from "../contexts/TitleContext";
import { useContext, useEffect } from "react";

const useTitle = (text: string) => {
  const { title, setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle(text);
  }, [setTitle, text]);

  return title;
};

export default useTitle;
