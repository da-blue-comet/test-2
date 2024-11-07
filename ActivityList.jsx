import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ActivityList = ({ fetchActivities, activities }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/activities/${id}`);
        Swal.fire("Deleted!", "Your activity has been deleted.", "success");
        fetchActivities();
      } catch (error) {
        Swal.fire("Error", "Failed to delete activity", "error");
      }
    }
  };

  return (
    <ul className="list-group">
      {activities.map((activity) => (
        <li key={activity.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span>{activity.title}</span>
          <div>
            <button
              className="btn btn-secondary btn-sm mx-1"
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              Details
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(activity.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;
