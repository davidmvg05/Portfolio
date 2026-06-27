import { useEffect, useRef } from 'react';

function Starfield({ isDarkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Initialize stars
    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 8000); // Responsive star count
      
      for (let i = 0; i < numStars; i++) {
        // Vary star colors: mostly white/blueish, some faint purples
        const colorVal = Math.random();
        let color = 'rgba(255, 255, 255, '; // Default white
        if (colorVal > 0.85) {
          color = 'rgba(173, 216, 230, '; // Light blue
        } else if (colorVal > 0.7) {
          color = 'rgba(224, 186, 252, '; // Faint purple/lavender
        }

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          alphaSpeed: 0.005 + Math.random() * 0.015,
          color: color,
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with transparent background so underlying CSS nebula gradient shows through
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      stars.forEach((star) => {
        // Update alpha for twinkling effect
        star.alpha += star.alphaSpeed * star.direction;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.direction = -1;
        } else if (star.alpha <= 0.05) {
          star.alpha = 0.05;
          star.direction = 1;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Stars are brighter in dark mode, fainter in light mode
        const finalAlpha = isDarkMode ? star.alpha : star.alpha * 0.4;
        const starColor = isDarkMode ? star.color : 'rgba(100, 100, 150, '; // Slate stars in light mode

        ctx.fillStyle = `${starColor}${finalAlpha})`;
        ctx.shadowBlur = isDarkMode ? star.radius * 2 : 0;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
        transition: 'background-color 0.8s ease'
      }}
    />
  );
}

export default Starfield;
