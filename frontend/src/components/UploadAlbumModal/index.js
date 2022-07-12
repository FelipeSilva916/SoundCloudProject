import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UploadAlbumForm from "./UploadAlbum";

const UploadAlbumModal = () => {
  const [showModal, setShowModal] = useState();
  return (
    <>
      <button onClick={() => setShowModal(true)}> Create Album</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadAlbumForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default UploadAlbumModal;
