import React, { useState, useEffect } from 'react';
import './landingPage.css'

const TypingAnimation = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const skillsText = 'Elevate Your Computer Science';

  useEffect(() => {
    const typeText = () => {
      const currentText = isDeleting
        ? skillsText.substring(0, currentIndex)
        : skillsText.substring(0, currentIndex + 1);

      setText(currentText);

      if (!isDeleting && currentText === skillsText) {
        setIsDeleting(true);
        setTimeout(() => setCurrentIndex(currentIndex - 1), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex(0);
      } else {
        setTimeout(
          () =>
            setCurrentIndex((prevIndex) =>
              isDeleting ? prevIndex - 1 : prevIndex + 1
            ),
          100 
        );
      }
    };

    const typingTimer = setTimeout(typeText, 100);

    return () => clearTimeout(typingTimer);
  }, [currentIndex, isDeleting]);

  return (
    <div className="typing-animation">
      <span>{text}</span>
      <span className={currentIndex === skillsText.length && isDeleting ? 'blink' : ''}>_ </span> <span className='secondary-text'>Skills </span>
       with <br/> Our <span className='secondary-text'>Interactive Learning Platform</span>
    </div>
  );
};

export default TypingAnimation;
