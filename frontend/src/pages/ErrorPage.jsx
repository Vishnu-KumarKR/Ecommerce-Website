import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            background: '#f8fafc',
            color: '#153266',
            padding: '20px'
        }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>😕</div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Oops! Something went wrong.</h1>
            <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '30px' }}>
                {error.statusText || error.message || "An unexpected error occurred."}
            </p>
            <Link
                to="/"
                style={{
                    padding: '12px 24px',
                    background: '#153266',
                    color: '#fff',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(21, 50, 102, 0.2)'
                }}
            >
                Go Back Home
            </Link>
        </div>
    );
}
