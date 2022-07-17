import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSongForm from "./EditSongForm";
import "./EditSongForm.css";

function EditSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="user-edit-button" onClick={() => setShowModal(true)}>
        EDIT
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSongForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditSongModal;
