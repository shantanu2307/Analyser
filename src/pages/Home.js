import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { REACT_APP_SERVER_URL } from "../config";
import { DataContext } from "../contexts/DataContext";
import "../styles/Home.css";

/**
 * Function to return JSX for Home page
 * @returns jsx for the form element Home
 */
export default function Home() {
  // Global datacontext for the website
  const dataContext = useContext(DataContext);
  // State to indicate the status o form i.e. submitted or not submitted
  const [formSubmitted, setFormSubmitted] = useState(false);
  // State to indicate whther data is currently loading
  const [loading, setLoading] = useState(false);
  // State to indicate whether an error occured during data fetching
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  /**
   * Function to manage states on form submission and fetch data
   * @param {String} url Url of website
   * @param {Object} headers Headers that need to be sent in request along with url
   * @param {String} formFactor Type of device
   */
  async function onFormSubmit(url, headers, formFactor) {
    setFormSubmitted(true);
    setLoading(true);
    try {
      const result = await axios.get(REACT_APP_SERVER_URL, {
        method: "GET",
        params: {
          url,
          headers,
          formFactor,
        },
      });
      setLoading(false);
      dataContext.setData({ type: "changeData", data: result.data });
      navigate("/bootup-time");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  return (
    <div className="container">
      {!formSubmitted && <Form onFormSubmit={onFormSubmit} />}
      {formSubmitted && loading && !error && <div className="loader"></div>}
      {formSubmitted && error && <h1>Error..</h1>}
    </div>
  );
}