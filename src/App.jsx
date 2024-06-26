import { useEffect, useRef, useState } from 'react';
import './app.css';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.log('Autoplay was prevented:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const playAudio = () => {
      audioRef.current.play().catch(error => {
        console.log('Autoplay was prevented:', error);
      });
    };

    playAudio();
    setIsPlaying(true);
  }, []);

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="/audio.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <header>
        <img src="/logo.webp" alt="Logo del Juego" className="logo" />
        <h1>¡Bienvenido a TicketToGo!</h1>
        <p>Una experiencia increíble te espera. ¡Únete a nosotros y comienza a jugar!</p>
        <button className="button" onClick={toggleAudio}>
          {isPlaying ? 'Apagar Música' : 'Prender Música'}
        </button>
      </header>
    </div>
  );
}

export default App;
