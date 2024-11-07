import React, { useState } from 'react';
import './UserPerfil.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserPerfil = () => {
    const [user, setUser] = useState({
        name: 'Nombre de usuario',
        profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
    });

    const [video, setVideo] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const handleVideoUpload = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleVideoSubmit = () => {
        // Lógica para subir video al servidor
        console.log(video);
    };

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleProfileImageUpload = () => {
        const formData = new FormData();
        formData.append('profileImage', profileImage);

        fetch('/api/upload-profile-image', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Actualizar la URL de la imagen de perfil en el estado del usuario
            setUser(prevUser => ({
                ...prevUser,
                profilePicture: data.filePath,
            }));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <>
            <Header />
            <div className="user-profile">
                <div className="profile-picture-container">
                    <img src={user.profilePicture} alt="Foto de perfil" className="profile-picture" />
                    <input type="file" onChange={handleProfileImageChange} className="file-input" />
                    <button onClick={handleProfileImageUpload} className="change-picture-button">Cambiar Foto de Perfil</button>
                </div>
                <h2>{user.name}</h2>
                <div className="video-upload">
                    <input type="file" onChange={handleVideoUpload} />
                    <button onClick={handleVideoSubmit}>Subir Video</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserPerfil;