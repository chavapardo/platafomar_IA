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
    const [message, setMessage] = useState("");
    const [uploadedVideos, setUploadedVideos] = useState([]); // Nuevo estado para los videos subidos

    // Función para manejar la carga del video
    const handleVideoUpload = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleVideoSubmit = () => {
        if (!video) {
            setMessage("Por favor, selecciona un video.");
            return;
        }
    
        const formData = new FormData();
        formData.append('video', video);
    
        fetch('http://localhost:5000/api/upload-video', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Video uploaded successfully") {
                    console.log('Video uploaded successfully:', data);
                    setUploadedVideos((prevVideos) => [...prevVideos, data.videoPath]); // Agrega el video a la lista de videos subidos
                    setMessage("Video uploaded successfully!");
                    // Limpiar los campos después de la carga exitosa
                    setVideo(null);  // Limpia el archivo de video seleccionado
                } else {
                    setMessage(data.message || "Error uploading video.");
                }
            })
            .catch((error) => {
                console.error('Error uploading video:', error);
                setMessage(error.message || "Error uploading video.");
            });
    };
    
    // Función para manejar el cambio de la imagen de perfil
    const handleProfileImageChange = (e) => {
        const selectedImage = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setUser(prevUser => ({
                ...prevUser,
                profilePicture: reader.result,
            }));
        };
        if (selectedImage) {
            reader.readAsDataURL(selectedImage);
        }

        setProfileImage(selectedImage);
    };

    // Función para manejar la carga de la imagen de perfil al servidor
    const handleProfileImageUpload = () => {
        if (!profileImage) {
            setMessage("Por favor, selecciona una imagen.");
            return;
        }

        const formData = new FormData();
        formData.append('profileImage', profileImage);

        fetch('http://localhost:5000/api/upload-profile-image', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Profile image uploaded successfully") {
                    console.log('Profile image uploaded:', data);
                    setMessage("Profile image uploaded successfully!");
                } else {
                    throw new Error(data.message || "Error uploading profile image.");
                }
            })
            .catch((error) => {
                console.error('Error uploading profile image:', error);
                setMessage(error.message || "Error uploading profile image.");
            });
    };

    return (
        <>
            <Header />
            <div className="user-profile container mt-5">
                {/* Sección de foto de perfil */}
                <div className="profile-picture-container d-flex justify-content-center position-relative">
                    <img
                        src={user.profilePicture}
                        alt="Foto de perfil"
                        className="profile-picture rounded-circle"
                    />
                    <input
                        type="file"
                        onChange={handleProfileImageChange}
                        className="file-input"
                        id="profile-image-input"
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={() => document.getElementById('profile-image-input').click()}
                        className="btn btn-success position-absolute bottom-0 start-50 translate-middle-x"
                    >
                        Editar Foto de Perfil
                    </button>
                </div>
                <h2 className="text-center mt-3">{user.name}</h2>

                {/* Sección de video */}
                <div className="video-upload mt-4 text-center">
                    <input
                        type="file"
                        onChange={handleVideoUpload}
                        className="form-control mb-3"
                    />
                    <button
                        onClick={handleVideoSubmit}
                        className="btn btn-primary"
                    >
                        Subir Video
                    </button>
                </div>

                <p className="text-center mt-3">{message}</p>

                {/* Sección de videos subidos */}
                <div className="uploaded-videos mt-5">
                    <h3>Videos Subidos</h3>
                    <div className="videos-list">
                        {uploadedVideos.length > 0 ? (
                            uploadedVideos.map((videoPath, index) => (
                                <div key={index} className="video-item mb-3">
                                    <video width="320" height="240" controls>
                                        <source src={`http://localhost:5000${videoPath}`} type="video/mp4" />
                                        Tu navegador no soporta el formato de video.
                                    </video>
                                </div>
                            ))
                        ) : (
                            <p>No has subido videos todavía.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserPerfil;
