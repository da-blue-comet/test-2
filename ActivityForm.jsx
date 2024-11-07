import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const ActivityForm = ({ showModal, setShowModal, fetchActivities }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setTitle("");
    setDescription("");
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/activities", { title, description });
      Swal.fire("Success", "Activity added successfully!", "success");
      fetchActivities(); // Fetch updated activities
      handleClose();
    } catch (error) {
      Swal.fire("Error", "Failed to add activity", "error");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleAddActivity}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ActivityForm;
