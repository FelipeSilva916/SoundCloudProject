import React from "react";
import { Modal } from "../../context/Modal";
import EditAlbumModal from "./EditAlbumModal";

const EditAlbumModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>EDIT</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditAlbumModal setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default EditAlbumModal;
