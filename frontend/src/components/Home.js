import React from "react";
import backgroundImage from "../images/home-background.jpg";

export default function Home(){
    return(

        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h2 style={{textAlign: 'center', color: '#fff', fontFamily: 'serif', fontSize: '70px', paddingTop: '10px'}}>Tailor Your Travels to Your Heart's Desire</h2>
            <h3 style={{textAlign: 'center', fontStyle: 'italic', fontSize: '20px', color: '#fff'}}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</h3>
        </div>
        
    );
}