import React from 'react';
import { PrimeReactProvider } from 'primereact/api';

export default function Root({ children }) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
