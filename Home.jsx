import React, { useState, useEffect } from "react";
import axios from "axios";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:3000/activities");
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div>
      <h1 className="my-4">Daily Activity Manager</h1>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add Activity
      </button>
      <ActivityList fetchActivities={fetchActivities} activities={activities} />
      <ActivityForm showModal={showModal} setShowModal={setShowModal} fetchActivities={fetchActivities} />
    </div>
  );
};

export default Home;
