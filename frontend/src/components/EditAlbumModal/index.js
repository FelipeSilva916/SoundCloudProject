import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditAlbumForm from "./EditAlbumForm";

const EditAlbumModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="user-edit-button" onClick={() => setShowModal(true)}>
        EDIT
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditAlbumForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default EditAlbumModal;
