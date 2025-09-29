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

    // const apiBase: string = import.meta.env.VITE_APP_URL || '';

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setShortUrl('');
        if (!longUrl) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ longUrl }),
            });

            if (!res.ok) { 
                const text = await res.text();
                throw new Error(text || `Server error: ${res.status}`);
            }

            const data: ShortenResponse = await res.json();

            const out = 
                data.shortUrl || 
                (data.code ? `${window.location.origin}/${data.code}` : null);

            if (out) { 
                setShortUrl(out);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) { 
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unknown error');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <label className='block'>
                <span className='text-sm font-medium'>Long URL</span>
                <input 
                    type="url" 
                    placeholder='https://example.com/very/long/url'
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    className='mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2'
                    required
                />
            </label>

            <div className='flex gap-2'>
                <button
                    type='submit'
                    disabled={loading}
                    className='px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60'
                >
                    {loading ? 'Shortening...' : 'Shorten'}
                </button>

                <button
                    type='button'
                    onClick={() => {
                        setLongUrl('');
                        setShortUrl('');
                        setError('');
                    }}
                    className='px-4 py-2 rounded border'
                >
                    Reset
                </button>
            </div>

            {error && <p className='text-red-600'>{error}</p>}

            {shortUrl && (
                <div className='p-3 bg-gray-50 rounded'>
                    <a href={shortUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-blue-600 break-all'
                    >
                    {shortUrl}
                    </a>
                    <div className='mt-2'>
                        <button 
                            onClick={() => navigator.clipboard.writeText(shortUrl)}
                            type='button'
                            className='px-2 py-1 border rounded text-sm'
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}