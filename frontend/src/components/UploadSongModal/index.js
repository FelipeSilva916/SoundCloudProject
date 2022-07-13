import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UploadSongForm from "./UploadSong";

function UploadSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadSongForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UploadSongModal;
