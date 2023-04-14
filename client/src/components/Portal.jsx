import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ShareModel from "./Models/ShareModel";
import Menu from "../components/NavigationBar/Menu";

const Portal = () => {
  const [showShareModel, setShowShareModel] = useState(false);

  const handleClose = () => setShowShareModel(false);
  const handleClickShareButton = () => setShowShareModel(true);

  const el = document.getElementById("custom-portal");
  const div = document.createElement("div");

  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    if (el == null) return;
    el.appendChild(div);
    setDomReady(true);

    return () => {
      el.removeChild(div);
    };
  }, [div]);

  return (
    <>
      {domReady &&
        createPortal(
          <ShareModel
            onClose={handleClose}
            show={showShareModel}
            onClickShare={handleClickShareButton}
          />,
          div
        )}
      <Menu
        onClose={handleClose}
        show={showShareModel}
        onClickShare={handleClickShareButton}
      />
    </>
  );
};

export default Portal;
