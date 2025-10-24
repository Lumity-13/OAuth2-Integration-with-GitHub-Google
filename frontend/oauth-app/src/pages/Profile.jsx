import React, { useEffect, useState } from 'react';
import { fetchCsrf, getProfile, postProfile } from '../api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [csrf, setCsrf] = useState(null);

  useEffect(() => {
    (async () => {
      const p = await getProfile();
      if (p.status === 200) {
        const data = await p.json();
        setProfile(data);
        setDisplayName(data.displayName || '');
        setBio(data.bio || '');
      } else if (p.status === 401) {
        window.location.href = '/';
      }
      const token = await fetchCsrf();
      setCsrf(token);
    })();
  }, []);

  const save = async () => {
    const headerName = csrf && csrf.headerName ? csrf.headerName : 'X-CSRF-TOKEN';
    const res = await postProfile({ displayName, bio }, csrf ? csrf.token : null, headerName);
    if (res.ok) {
      const updated = await getProfile();
      setProfile(await updated.json());
      setEditing(false);
    } else {
      alert('Failed to save');
    }
  };

  if (!profile) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        <div style={{ color: 'white', fontSize: '18px', fontWeight: '500' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid white',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
          }}>
            <img 
              src={profile.avatarUrl} 
              alt="avatar" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <h1 style={{
            color: 'white',
            fontSize: '28px',
            fontWeight: '700',
            margin: '20px 0 8px 0',
            letterSpacing: '-0.5px'
          }}>
            {profile.displayName || 'Your Profile'}
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '15px',
            margin: 0
          }}>
            {profile.email}
          </p>
        </div>

        {/* Content Section */}
        <div style={{ padding: '40px' }}>
          {editing ? (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Display Name
                </label>
                <input 
                  value={displayName} 
                  onChange={e => setDisplayName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '15px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Bio
                </label>
                <textarea 
                  value={bio} 
                  onChange={e => setBio(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '15px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={save}
                  style={{
                    flex: 1,
                    padding: '14px 24px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: 'white',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  style={{
                    flex: 1,
                    padding: '14px 24px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#6b7280',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{
                background: '#f9fafb',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: '0 0 8px 0'
                  }}>
                    Display Name
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#1a1a1a',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {profile.displayName || 'Not set'}
                  </p>
                </div>

                <div>
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: '0 0 8px 0'
                  }}>
                    Bio
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#1a1a1a',
                    margin: 0,
                    lineHeight: '1.6'
                  }}>
                    {profile.bio || 'No bio added yet'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setEditing(true)}
                  style={{
                    flex: 1,
                    padding: '14px 24px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: 'white',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => { window.location.href = 'http://localhost:8080/logout'; }}
                  style={{
                    padding: '14px 24px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#dc2626',
                    background: 'white',
                    border: '2px solid #fecaca',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fef2f2';
                    e.currentTarget.style.borderColor = '#fca5a5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#fecaca';
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}