import React from 'react';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <div>
      <h2>Noway!! go back where you came from or ...</h2>
      <Link to="/">Return to Login</Link>
    </div>
  );
}