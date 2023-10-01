import React from 'react';

const Button = ({ label, eventHandler }) => {
  return (
    <button type="button" onClick={eventHandler} data-action={label}>
      {label}
    </button>
  );
};

export default Button;
