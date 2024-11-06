import React, { useState, useEffect } from 'react';
import './VideoList.css';

const VideoList = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        //Logica para obtener videos del servidor
        //Aquí puedes hacer una solicitud a tu backend para obetener los videos
        const fetchedVideos = [
            { id: 1, url: 'https://www.youtube.com/watch?v=JGwWNGJdvx8' },
            { id: 2, url: 'https://www.youtube.com/watch?v=JGwWNGJdvx8' },
            { id: 3, url: 'https://www.youtube.com/watch?v=JGwWNGJdvx8' },
        ];
        setVideos(fetchedVideos);
    }, []);

    return ( 
        <div className="video-list">
            {videos.map(video => (
                <div key={video.id} className="video-item">
                    <video src={video.url} controls />
                    <h3>{video.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default VideoList;