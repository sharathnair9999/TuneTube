import { useState, useEffect } from "react";

const useDocumentTitle = (title) => {
  const [document_title, setDocumentTitle] = useState(title);
  useEffect(() => {
    document.title = document_title;
  }, [document_title]);

  return [document_title, setDocumentTitle];
};

export default useDocumentTitle;
