import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import Header from "../components/Header";

export default function AllAccommodations() {
    const [accommodations, setAccommodations] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getAccommodations();
    }, []);

    function getAccommodations() {
        axios.get("http://localhost:8070/accommodation/accommodationDashboard")
            .then((res) => {
                setAccommodations(res.data);
            })
            .catch((error) => {
                console.error(error.message);
                toast.error("Failed to fetch accommodations");
            });
    }

    function deleteAccommodation(id) {
        axios.delete(`http://localhost:8070/accommodation/delete/${id}`)
            .then(() => {
                console.log("Accommodation deleted");
                toast.success("Accommodation deleted");
                getAccommodations();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to delete accommodation");
            });
    }

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }

    const filteredAccommodations = accommodations.filter((acc) => {
        return acc.name.toLowerCase().includes(filter.toLowerCase());
    });

    function generatePDF() {
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "Accommodation Details";
        const headers = [["Name", "Date", "Accommodation", "Location", "Estimated Price", "Alternatives", "Notes"]];
        const data = filteredAccommodations.map((acc) => [
            acc.name,
            acc.date,
            acc.accommodation,
            acc.location,
            acc.estprice,
            acc.alternatives,
            acc.notes
        ]);
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("AccommodationReport.pdf");
        toast.success("Accommodation Report Downloaded");
    }

    return (
        <div>
            <div className="page-content container">
                <h1>Accommodation Dashboard</h1>

                <form className="d-flex justify-content-end" role="search">
                    <input onChange={handleFilterChange} className="form-control me-2 w-auto" type="search" placeholder="Search" aria-label="Search" />
                    <button className="search-btn btn btn-outline-info" type="submit">Search</button>
                </form>

                <table className="table border shadow table table-striped border" style={{ fontWeight: 'bold' }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Accommodation</th>
                            <th scope="col">Location</th>
                            <th scope="col">Estimated Price</th>
                            
                            <th scope="col">Notes</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredAccommodations.map((acc, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{acc.name}</td>
                                <td>{acc.date}</td>
                                <td>{acc.accommodation}</td>
                                <td>{acc.location}</td>
                                <td>{acc.estprice}</td>
                                
                                <td>{acc.notes}</td>
                                <td>
                                    <Link className="btn btn-warning" to={`/update/${acc._id}`}>
                                        <i className="fas fa-edit"></i>&nbsp;Edit
                                    </Link>
                                    &nbsp;
                                    <button className="btn btn-danger" onClick={() => deleteAccommodation(acc._id)}>
                                        <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Link className="btn btn-success" to={"/add"}>
                    <i className="fa-solid fa-plus"></i>&nbsp;Add New Accommodation
                </Link>
                &nbsp;&nbsp;
                <button className="btn btn-primary" onClick={() => generatePDF()}>
                    <i className="fa-regular fa-file"></i>&nbsp;Generate Report
                </button>
                &nbsp;&nbsp;
                <ToastContainer />
            </div>
        </div>
    );
}
