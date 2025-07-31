import React, { useState } from 'react';

function RetrieveInstitution() {
  const [retrievalAddress, setRetrievalAddress] = useState('');
  const [retrievedInstitution, setRetrievedInstitution] = useState(null);
  const [error, setError] = useState('');

  const retrieveInstitution = () => {
    let institutions = JSON.parse(sessionStorage.getItem('institutions')) || [];
    const institution = institutions.find(inst => inst.address === retrievalAddress);

    if (institution) {
      setRetrievedInstitution(institution);
      setError('');
    } else {
      setError('Address not recognized.');
      setRetrievedInstitution(null);
    }
  };

  return (
    <div className="retrieve-institution">
      <div className="glass-card">
        <h2>
          <span role="img" aria-label="search">🏛️</span> Retrieve Institution
        </h2>

        <div className="form-group">
          <label>
            <span role="img" aria-label="address">🔗</span> Institution Ethereum Address
          </label>
          <input
            type="text"
            value={retrievalAddress}
            onChange={(e) => setRetrievalAddress(e.target.value)}
            placeholder="0x..."
            autoFocus
            required
            style={{ boxSizing: 'border-box' }}
          />
        </div>

        <button type="button" onClick={retrieveInstitution} className="submit-btn">
          <span role="img" aria-label="magnifier">🔍</span> Retrieve Institution
        </button>

        {retrievedInstitution && (
          <div className="institution-info">
            <h3>
              <span role="img" aria-label="info">📄</span> Institution Details
            </h3>
            <div className="info-grid">
              <div>
                <span className="info-label">Name:</span>
                <span>{retrievedInstitution.name}</span>
              </div>
              <div>
                <span className="info-label">Email:</span>
                <span>{retrievedInstitution.email}</span>
              </div>
              <div>
                <span className="info-label">Accreditation ID:</span>
                <span>{retrievedInstitution.accreditationId}</span>
              </div>
              <div>
                <span className="info-label">Country:</span>
                <span>{retrievedInstitution.country}</span>
              </div>
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>

      <style>
        {`
          body {
            background: linear-gradient(135deg, #2196F3 0%, #21CBF3 100%);
            min-height: 100vh;
          }
          .retrieve-institution {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #2196F3 0%, #21CBF3 100%);
          }
          .glass-card {
            background: rgba(255,255,255,0.85);
            border-radius: 20px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
            backdrop-filter: blur(8px);
            padding: 2.5rem 2rem 2rem 2rem;
            max-width: 420px;
            width: 100%;
            margin: 2rem auto;
            border: 1px solid rgba(255,255,255,0.25);
            animation: fadeIn 0.8s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          h2 {
            text-align: center;
            margin-bottom: 2rem;
            font-size: 2rem;
            color: #1976d2;
            letter-spacing: 1px;
            font-weight: 700;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          label {
            font-weight: 600;
            display: block;
            margin-bottom: 0.5rem;
            color: #1976d2;
            font-size: 1.1rem;
          }
          input {
            width: 100%;
            min-width: 0;
            padding: 0.85rem 1rem;
            border: 1.5px solid #b3e5fc;
            border-radius: 8px;
            font-size: 1rem;
            background: #f8fdff;
            transition: border 0.2s;
            outline: none;
            box-sizing: border-box;
            max-width: 100%;
          }
          input:focus {
            border: 1.5px solid #1976d2;
            background: #e3f2fd;
          }
          .submit-btn {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(90deg, #1976d2 0%, #21cbf3 100%);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.1rem;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(33,203,243,0.15);
            transition: background 0.2s, transform 0.1s;
            margin-top: 0.5rem;
          }
          .submit-btn:hover {
            background: linear-gradient(90deg, #1565c0 0%, #00bcd4 100%);
            transform: translateY(-2px) scale(1.02);
          }
          .institution-info {
            margin-top: 2rem;
            padding: 1.5rem 1rem;
            background: rgba(33, 203, 243, 0.08);
            border-radius: 12px;
            box-shadow: 0 1px 6px rgba(33,203,243,0.08);
            animation: fadeIn 0.5s;
          }
          .institution-info h3 {
            margin-bottom: 1.2rem;
            color: #1976d2;
            font-size: 1.2rem;
            font-weight: 600;
            text-align: center;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.7rem;
          }
          .info-label {
            font-weight: 600;
            color: #1565c0;
            margin-right: 0.5rem;
          }
          .error-message {
            margin-top: 1.2rem;
            color: #d32f2f;
            text-align: center;
            font-weight: 600;
            background: #ffebee;
            border-radius: 8px;
            padding: 0.7rem 0.5rem;
            box-shadow: 0 1px 4px rgba(211,47,47,0.08);
          }
          @media (max-width: 600px) {
            .glass-card {
              padding: 1.2rem 0.5rem 1rem 0.5rem;
              max-width: 98vw;
            }
            input {
              font-size: 0.98rem;
              padding: 0.7rem 0.7rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default RetrieveInstitution;
