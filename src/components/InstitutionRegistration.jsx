import React, { useState } from 'react';
import { ethers } from 'ethers';
import WalletConnect from './WalletConnect';
import CertificateVerificationABI from '../abis/CertificateVerification.json';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function InstitutionRegistration() {
  const [institutionAddress, setInstitutionAddress] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [email, setEmail] = useState('');
  const [accreditationId, setAccreditationId] = useState('');
  const [country, setCountry] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const registerInstitution = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFeedback('');

    try {
      if (!window.ethereum) throw new Error('MetaMask not detected');

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CertificateVerificationABI, signer);

      const ISSUER_ROLE = ethers.id("ISSUER_ROLE");
      const tx = await contract.grantRole(ISSUER_ROLE, institutionAddress);
      await tx.wait();

      // Store institution details in sessionStorage
      const institutionData = {
        address: institutionAddress,
        name: institutionName,
        email,
        accreditationId,
        country
      };

      let institutions = JSON.parse(sessionStorage.getItem('institutions')) || [];
      institutions.push(institutionData);
      sessionStorage.setItem('institutions', JSON.stringify(institutions));

      setFeedback(`✅ Institution "${institutionName}" registered successfully.`);
      setInstitutionAddress('');
      setInstitutionName('');
      setEmail('');
      setAccreditationId('');
      setCountry('');
    } catch (err) {
      setError(err.message || 'Transaction failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="institution-registration">
      <div className="registration-card">
        <h2>
          <span role="img" aria-label="university">🎓</span> Register Institution
        </h2>
        <WalletConnect />

        <form onSubmit={registerInstitution} className="registration-form">
          <div className="form-group">
            <label>Ethereum Address</label>
            <input
              type="text"
              value={institutionAddress}
              onChange={(e) => setInstitutionAddress(e.target.value)}
              placeholder="0x..."
              required
            />
          </div>
          <div className="form-group">
            <label>Institution Name</label>
            <input
              type="text"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              placeholder="e.g. MIT"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@institution.edu"
              required
            />
          </div>
          <div className="form-group">
            <label>Accreditation ID</label>
            <input
              type="text"
              value={accreditationId}
              onChange={(e) => setAccreditationId(e.target.value)}
              placeholder="e.g. ACC-12345"
              required
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. United States"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span>
                <span className="loader"></span> Registering...
              </span>
            ) : (
              'Register Institution'
            )}
          </button>
        </form>

        {feedback && (
          <div className="success-message">
            <span role="img" aria-label="success">✅</span> {feedback}
          </div>
        )}
        {error && (
          <div className="error-message">
            <span role="img" aria-label="error">❌</span> {error}
          </div>
        )}
      </div>

      <style>
        {`
          .institution-registration {
            min-height: 100vh;
            background: linear-gradient(135deg, #2196F3 0%, #21CBF3 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
          }
          .registration-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 8px 32px rgba(33, 203, 243, 0.15), 0 1.5px 6px rgba(33, 150, 243, 0.08);
            padding: 2.5rem 2rem 2rem 2rem;
            max-width: 520px;
            width: 100%;
            margin: 2rem 0;
            animation: fadeIn 0.7s;
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
          .registration-form {
            width: 100%;
          }
          .form-group {
            margin-bottom: 1.2rem;
            display: flex;
            flex-direction: column;
          }
          label {
            font-weight: 600;
            margin-bottom: 0.4rem;
            color: #1976d2;
            font-size: 1rem;
          }
          input {
            padding: 0.7rem 1rem;
            border: 1.5px solid #e3eafc;
            border-radius: 7px;
            font-size: 1rem;
            background: #f7fbff;
            transition: border 0.2s;
            outline: none;
          }
          input:focus {
            border-color: #2196F3;
            background: #e3f2fd;
          }
          .submit-btn {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(90deg, #1976d2 0%, #21CBF3 100%);
            color: #fff;
            border: none;
            border-radius: 7px;
            font-weight: bold;
            font-size: 1.1rem;
            cursor: pointer;
            margin-top: 1.2rem;
            box-shadow: 0 2px 8px rgba(33, 150, 243, 0.08);
            transition: background 0.2s, transform 0.1s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
          .submit-btn:disabled {
            background: #b3e5fc;
            cursor: not-allowed;
          }
          .success-message, .error-message {
            margin-top: 1.5rem;
            padding: 1rem;
            border-radius: 7px;
            text-align: center;
            font-size: 1.1rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
          .success-message {
            background: #e8f5e9;
            color: #388e3c;
            border: 1px solid #c8e6c9;
          }
          .error-message {
            background: #ffebee;
            color: #d32f2f;
            border: 1px solid #ffcdd2;
          }
          .loader {
            border: 3px solid #e3eafc;
            border-top: 3px solid #2196F3;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            animation: spin 0.8s linear infinite;
            display: inline-block;
            vertical-align: middle;
          }
          @media (max-width: 900px) {
            .registration-card {
              max-width: 98vw;
              padding: 1.5rem 0.5rem 1.5rem 0.5rem;
            }
          }
          @media (max-width: 600px) {
            .registration-card {
              padding: 1.2rem 0.2rem 1.2rem 0.2rem;
            }
            h2 {
              font-size: 1.3rem;
            }
            .submit-btn {
              font-size: 1rem;
              padding: 0.8rem;
            }
            input {
              font-size: 0.95rem;
              padding: 0.6rem 0.7rem;
            }
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}

export default InstitutionRegistration;






// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import WalletConnect from './WalletConnect';
// import CertificateVerificationABI from '../abis/CertificateVerification.json';

// const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// function InstitutionRegistration() {
//   const [institutionAddress, setInstitutionAddress] = useState('');
//   const [institutionName, setInstitutionName] = useState('');
//   const [email, setEmail] = useState('');
//   const [accreditationId, setAccreditationId] = useState('');
//   const [country, setCountry] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const registerInstitution = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setFeedback('');

//     try {
//       if (!window.ethereum) throw new Error('MetaMask not detected');

//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, CertificateVerificationABI, signer);

//       const ISSUER_ROLE = ethers.id("ISSUER_ROLE");
//       const tx = await contract.grantRole(ISSUER_ROLE, institutionAddress);
//       await tx.wait();

//       setFeedback(`✅ Institution "${institutionName}" registered successfully.`);
//       setInstitutionAddress('');
//       setInstitutionName('');
//       setEmail('');
//       setAccreditationId('');
//       setCountry('');
//     } catch (err) {
//       setError(err.message || 'Transaction failed.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="institution-registration">
//       <h2>Register Institution</h2>
//       <WalletConnect />

//       <form onSubmit={registerInstitution} className="registration-form">
//         <div className="form-group">
//           <label>Institution Ethereum Address</label>
//           <input
//             type="text"
//             value={institutionAddress}
//             onChange={(e) => setInstitutionAddress(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Institution Name</label>
//           <input
//             type="text"
//             value={institutionName}
//             onChange={(e) => setInstitutionName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Accreditation ID</label>
//           <input
//             type="text"
//             value={accreditationId}
//             onChange={(e) => setAccreditationId(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Country</label>
//           <input
//             type="text"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="submit-btn" disabled={loading}>
//           {loading ? 'Registering...' : 'Register Institution'}
//         </button>
//       </form>

//       {feedback && <div className="success-message">{feedback}</div>}
//       {error && <div className="error-message">{error}</div>}

//       <style>
//         {`
//           .institution-registration {
//             padding: 2rem;
//             background: #fff;
//             border-radius: 12px;
//             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//             max-width: 600px;
//             margin: auto;
//           }

//           h2 {
//             text-align: center;
//             margin-bottom: 1.5rem;
//           }

//           .form-group {
//             margin-bottom: 1rem;
//           }

//           label {
//             font-weight: 500;
//             display: block;
//             margin-bottom: 0.5rem;
//           }

//           input {
//             width: 100%;
//             padding: 0.75rem;
//             border: 1px solid #ccc;
//             border-radius: 5px;
//           }

//           .submit-btn {
//             width: 100%;
//             padding: 1rem;
//             background: #2196F3;
//             color: #fff;
//             border: none;
//             border-radius: 5px;
//             font-weight: bold;
//             cursor: pointer;
//           }

//           .submit-btn:disabled {
//             background: #90caf9;
//           }

//           .success-message {
//             margin-top: 1rem;
//             color: green;
//             text-align: center;
//           }

//           .error-message {
//             margin-top: 1rem;
//             color: red;
//             text-align: center;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default InstitutionRegistration;













