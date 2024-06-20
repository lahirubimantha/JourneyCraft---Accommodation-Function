import React from 'react';

function Header() {

    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#" style={{padding: "30px", fontSize: "25PX"}}>JC</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/home" style={{padding: "30px", fontSize: "18PX"}}>Home</a>
                <a class="nav-link" href="" style={{padding: "30px", fontSize: "18PX"}} >Plan Your Trip</a>
                <a class="nav-link" href="#" style={{padding: "30px", fontSize: "18PX"}}>Where We Go</a>
                <a class="nav-link" href="/accommodationDashboard" style={{padding: "30px", fontSize: "18PX"}}>Accommodations</a>
                <a class="nav-link" href="#" style={{padding: "30px", fontSize: "18PX"}}>Budget Plan</a>
                <a class="nav-link" href="#" style={{padding: "30px", fontSize: "18PX"}}>About Us </a>
                </div>

                <form class="d-flex" role="search" style={{marginLeft: "300px"}}>
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{marginRight: "5px"}}/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            </div>
        </nav>
    );
    
}

export default Header;