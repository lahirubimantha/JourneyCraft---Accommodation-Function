import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';
import Header from './Header';

export default function AddAccommodation() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [accommodation, setAccommodation] = useState("");
    const [location, setLocation] = useState("");
    const [estprice, setEstPrice] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState("");

    function sendData(e) {
        e.preventDefault();

        if (name.length === 0 || date.length === 0 || accommodation.length === 0 || location.length === 0 || estprice.length === 0 || notes.length === 0) {
            setErrors(true);
        } else {
            const newAccommodation = {
                name,
                date,
                accommodation,
                location,
                estprice,
                notes
            };

            axios.post("http://localhost:8070/accommodation/add", newAccommodation)
                .then(() => {
                    toast.success("Accommodation added successfully!", { theme: 'colored' });
                    setName("");
                    setDate("");
                    setAccommodation("");
                    setLocation("");
                    setEstPrice("");
                    setNotes("");
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
                <ToastContainer></ToastContainer>
                

                &nbsp;&nbsp;&nbsp;&nbsp;

                <div className="addAccommodationForm" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue"
                }}>
                    <h1 style={{ color: "#00BFFF" }}>Add New Accommodation</h1>
                    <form onSubmit={sendData}>
                        <div className="form-group">
                            <label htmlFor="inputName">Name : </label>
                            <input type="text" className="form-control" style={{ width: "500px" }} id="name" value={name} aria-describedby="emailHelp" placeholder="Enter Name"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                            {errors && name.length <= 0 ? <label className="validation-label">Name cannot be empty</label> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputDate">Date : </label>
                            <input type="date" className="form-control" id="date" value={date} placeholder="Enter Date"
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }} />
                            {errors && date.length <= 0 ? <label className="validation-label">Date cannot be empty</label> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAccommodation">Accommodation : </label>
                            <input type="text" className="form-control" id="accommodation" value={accommodation} placeholder="Enter Accommodation"
                                onChange={(e) => {
                                    setAccommodation(e.target.value);
                                }} />
                            {errors && accommodation.length <= 0 ? <label className="validation-label">Accommodation cannot be empty</label> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputLocation">Location : </label>
                            <input type="text" className="form-control" id="location" value={location} placeholder="Enter Location"
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }} />
                            {errors && location.length <= 0 ? <label className="validation-label">Location cannot be empty</label> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEstPrice">Estimated Price : </label>
                            <input type="text" className="form-control" id="estPrice" value={estprice} placeholder="Enter Estimated Price"
                                onChange={(e) => {
                                    setEstPrice(e.target.value);
                                }} />
                            {errors && estprice.length <= 0 ? <label className="validation-label">Estimated Price cannot be empty</label> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputNotes">Notes : </label>
                            <input type="text" className="form-control" id="notes" value={notes} placeholder="Enter Notes"
                                onChange={(e) => {
                                    setNotes(e.target.value);
                                }} />
                            {errors && notes.length <= 0 ? <label className="validation-label">Notes cannot be empty</label> : ""}
                        </div>

                        <br />
                        <button type="submit" className="btn-add btn btn-success" style={{ background: 'linear-gradient(#F7971E,#FFD200)', width: '80px' }}>Add</button>
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
