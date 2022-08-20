import { useState, useEffect, Dispatch, SetStateAction } from "react";

const useDocumentTitle = (title: string): Dispatch<SetStateAction<string>> => {
  const [document_title, setDocumentTitle] = useState(title);
  useEffect(() => {
    document.title = document_title;
  }, [document_title]);

  return setDocumentTitle;
};

export default useDocumentTitle;
