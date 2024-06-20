import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header";
import '../styles.css';


export default function UpdateAccommodation() {
    const { id } = useParams();

    const [accommodation, setAccommodation] = useState({});
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [accommodationType, setAccommodationType] = useState("");
    const [location, setLocation] = useState("");
    const [estPrice, setEstPrice] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState("");

    useEffect(() => {
        async function fetchAccommodation() {
            try {
                const response = await axios.get(`http://localhost:8070/accommodation/get/${id}`);
                const data = response.data;
                setAccommodation(data);
                setName(data.name);
                setDate(data.date);
                setAccommodationType(data.accommodation);
                setLocation(data.location);
                setEstPrice(data.estprice);
                setNotes(data.notes);
            } catch (error) {
                alert(error.message);
            }
        }
        fetchAccommodation();
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();

        if (name.length === 0 || date.length === 0 || accommodationType.length === 0 || location.length === 0 || estPrice.length === 0 || notes.length === 0) {
            setErrors(true);
        } else {
            const updatedAccommodation = {
                name,
                date,
                accommodation: accommodationType,
                location,
                estprice: Number(estPrice),
                notes
            };

            axios.put(`http://localhost:8070/accommodation/update/${id}`, updatedAccommodation)
                .then(() => {
                    toast.success("Accommodation updated successfully!", { theme: 'colored' });
                    setErrors("");
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    }

    return (
        <div>
            <div className="container" style={{ display: "flex" }}>
                <ToastContainer />

                &nbsp;&nbsp;&nbsp;&nbsp;

                <div className="updateAccommodationForm" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue"
                }}>
                    <h1 style={{ color: "#00BFFF" }}>Edit Accommodation</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputName">Name : </label>
                            <input type="text" className="form-control" style={{ width: "500px" }} name="name" value={name} placeholder="Enter Name"
                                onChange={(e) => { setName(e.target.value); }} />
                            {errors && name.length <= 0 ? <label className="validation-label">Name cannot be empty</label> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputDate">Date : </label>
                            <input type="date" className="form-control" name="date" value={date} placeholder="Enter Date"
                                onChange={(e) => { setDate(e.target.value); }} />
                            {errors && date.length <= 0 ? <label className="validation-label">Date cannot be empty</label> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAccommodation">Accommodation Type : </label>
                            <input type="text" className="form-control" name="accommodationType" value={accommodationType} placeholder="Enter Accommodation Type"
                                onChange={(e) => { setAccommodationType(e.target.value); }} />
                            {errors && accommodationType.length <= 0 ? <label className="validation-label">Accommodation Type cannot be empty</label> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputLocation">Location : </label>
                            <input type="text" className="form-control" name="location" value={location} placeholder="Enter Location"
                                onChange={(e) => { setLocation(e.target.value); }} />
                            {errors && location.length <= 0 ? <label className="validation-label">Location cannot be empty</label> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEstPrice">Estimated Price : </label>
                            <input type="number" className="form-control" name="estPrice" value={estPrice} placeholder="Enter Estimated Price"
                                onChange={(e) => { setEstPrice(e.target.value); }} />
                            {errors && estPrice.length <= 0 ? <label className="validation-label">Estimated Price cannot be empty</label> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputNotes">Notes : </label>
                            <input type="text" className="form-control" name="notes" value={notes} placeholder="Enter Notes"
                                onChange={(e) => { setNotes(e.target.value); }} />
                            {errors && notes.length <= 0 ? <label className="validation-label">Notes cannot be empty</label> : ""}
                        </div>

                        <br />
                        <button type="submit" className="btn-update btn btn-primary" style={{ background: 'linear-gradient(#F7971E,#FFD200)', width: '100px' }}>Update</button>
                        &nbsp;&nbsp;
                        <Link className="btn-back btn btn-primary" style={{ background: 'linear-gradient(royalblue,tomato)', width: '80px' }} to={"/accommodationDashboard"}>
                            <i className="fa-solid fa-backward"></i>&nbsp;Back
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
