
import { useEffect, useState } from "react";
import SelectTokenModal from "./SelectTokenModal";

 

const ModalProvider = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      
      <SelectTokenModal/>
    </>
  );
};

export default ModalProvider;