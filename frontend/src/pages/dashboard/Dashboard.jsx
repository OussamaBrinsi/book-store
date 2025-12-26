import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import getBaseUrl from "../../utils/baseURL";
import { MdIncompleteCircle } from "react-icons/md";
import RevenueChart from "./RevenueChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  // console.log(data)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(data)

  if (loading) return <Loading />;

  return (
    <div className="bg-white shadow rounded-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin Section</h2>
      <p>
        Welcome to the admin dashboard. Here you can manage the bookstore as an
        admin.
      </p>
    </div>
  );
};

export default Dashboard;
