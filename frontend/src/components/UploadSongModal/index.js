import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";
import UploadSongForm from "./UploadSong";

function UploadSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadSongForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UploadSongModal;
