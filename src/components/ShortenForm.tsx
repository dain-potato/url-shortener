import React, { useState } from 'react';

interface ShortenResponse {
    shortUrl?: string;
    code?: string;
    error?: string;
}

export default function ShortenForm() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const apiBase: string = import.meta.env.VITE_APP_URL || '';

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setShortUrl('');
        if (!longUrl) {
            setError('Please enter a URL');
            return;
        }
    }

}