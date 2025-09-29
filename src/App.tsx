import { useState } from 'react'
import './App.css'
import ShortenForm from './components/ShortenForm';

export default function App() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-6'>
      <div className='w-full max-w-2xl p-8 bg-white rounded-lg shadow'>
        <h1 className='text-3xl font-bold mb-4'>URL Shortener</h1>
        <ShortenForm />
      </div>
    </div>
  );
}
