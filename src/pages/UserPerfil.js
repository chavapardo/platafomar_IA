import React, { useState } from 'react';
import './UserPerfil.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserPerfil = () => {
    const [user, setUser] = useState({
        name: 'Nombre de usuario',
        profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
    });

    const [ video, setVideo ] = useState(null);

    const handleVideoUpload = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleVideoSubmit = () => {
        //Logica para subir video al servidor
        console.log(video);
    };

    return (
        <>
        <Header />
            <div className="user-profile">
                <img src={user.profilePicture} alt="Foto de perfil" className="profile-picture" />
                <h2>{user.name}</h2>
                <img src="../assets/logo-subir-video.svg" alt="subida de videos" className="img_subida" />
                <input type="file" accept="video/*" onChange={handleVideoUpload} />
                <button onClick={handleVideoSubmit}>Subir Video</button>
            </div>
        <Footer />
        </>
    );
        
    };

export default UserPerfil;
