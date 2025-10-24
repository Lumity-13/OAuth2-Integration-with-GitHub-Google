import React from 'react';

export default function Home() {
  const googleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };
  const githubLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '60px 50px',
        maxWidth: '440px',
        width: '100%',
        textAlign: 'center',
        animation: 'slideUp 0.5s ease-out'
      }}>
        {/* Logo/Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          margin: '0 auto 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
        }}>
          🔐
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1a1a1a',
          margin: '0 0 12px 0',
          letterSpacing: '-0.5px'
        }}>
          Welcome Back
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: '0 0 40px 0',
          lineHeight: '1.6'
        }}>
          Sign in to your account to continue
        </p>

        {/* Google Login Button */}
        <button
          onClick={googleLogin}
          style={{
            width: '100%',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#1a1a1a',
            background: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'all 0.2s ease',
            marginBottom: '16px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f9fafb';
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M19.8 10.2273C19.8 9.51818 19.7364 8.83636 19.6182 8.18182H10V12.05H15.4818C15.2364 13.3 14.5273 14.3591 13.4727 15.0682V17.5773H16.7636C18.7182 15.8364 19.8 13.2727 19.8 10.2273Z" fill="#4285F4"/>
            <path d="M10 20C12.7 20 14.9636 19.1045 16.7636 17.5773L13.4727 15.0682C12.5727 15.6682 11.4 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.40455 11.9H0.990906V14.4909C2.78182 18.0591 6.10909 20 10 20Z" fill="#34A853"/>
            <path d="M4.40455 11.9C4.19091 11.3 4.06818 10.6591 4.06818 10C4.06818 9.34091 4.19091 8.7 4.40455 8.1V5.50909H0.990906C0.359091 6.76364 0 8.18182 0 10C0 11.8182 0.359091 13.2364 0.990906 14.4909L4.40455 11.9Z" fill="#FBBC05"/>
            <path d="M10 3.97727C11.5273 3.97727 12.8909 4.51818 13.9727 5.54545L16.8909 2.62727C14.9591 0.818182 12.6955 0 10 0C6.10909 0 2.78182 1.94091 0.990906 5.50909L4.40455 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* GitHub Login Button */}
        <button
          onClick={githubLogin}
          style={{
            width: '100%',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: '#24292e',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1a1e22';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#24292e';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
          </svg>
          Continue with GitHub
        </button>

        <div style={{
          marginTop: '32px',
          paddingTop: '32px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{
            fontSize: '13px',
            color: '#9ca3af',
            margin: 0,
            lineHeight: '1.6'
          }}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}