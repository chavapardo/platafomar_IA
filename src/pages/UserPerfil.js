import React, { useState, useEffect } from 'react';
import './UserPerfil.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserPerfil = () => {
    const [user, setUser] = useState({
        name: '',
        profilePicture: '',
    });

    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user-profile');
                const data = await response.json();
                setUser(data);
                setNewName(data.name);
            } catch (error) {
                console.error('Error al obtener el perfil de usuario:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleProfilePictureUpload = (e) => {
        setNewProfilePicture(e.target.files[0]);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleProfileUpdate = async () => {
        const formData = new FormData();
        formData.append('profilePicture', newProfilePicture);
        formData.append('name', newName);

        try {
            const response = await fetch('http://localhost:5000/api/upload-profile', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setUser(data.userProfile);
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="user-profile">
                <img src={user.profilePicture} alt="Foto de perfil" className="profile-picture" />
                <h2>{user.name}</h2>
                <input type="file" accept="image/*" onChange={handleProfilePictureUpload} />
                <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                    placeholder="Nuevo nombre de usuario"
                />
                <button onClick={handleProfileUpdate}>Actualizar Perfil</button>
                <input type="file" accept="video/*" onChange={handleVideoUpload} />
                <button onClick={handleVideoSubmit}>Subir Video</button>
            </div>
            <Footer />
        </>
    );
};

export default UserPerfil;