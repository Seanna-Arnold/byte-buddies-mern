import React from 'react';

function CatButton({ buttons, onClick }) {
  return (
    <ul>
      {buttons.map((button, index) => (
        <li key={index}>
          <button onClick={() => onClick(index)}>{button}</button>
        </li>
      ))}
    </ul>
  );
}

export default CatButton;
