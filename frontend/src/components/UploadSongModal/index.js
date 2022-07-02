import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";
import UploadSongForm from "./UploadSong";

function UploadSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <NavLink to="/upload" onClick={() => setShowModal(true)}>
        Upload
      </NavLink>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadSongForm />
        </Modal>
      )}
    </>
  );
}

export default UploadSongModal;
