import React, { useState } from 'react';
import { ethers } from 'ethers';
import WalletConnect from './WalletConnect';
import QRCode from 'qrcode.react'; // Make sure to install qrcode.react
import './CertificateIssuance.css';

function CertificateIssuance() {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    courseProgram: '',
    grade: '',
    completionDate: '',
    certificateFile: null,
    institutionCategory: '',
    institutionAddress: '',
    studentAddress: ''
  });

  const [fileName, setFileName] = useState('');
  const [issuanceResult, setIssuanceResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to issue certificates');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const metadata = {
        ...formData,
        issueDate: new Date().toISOString(),
        issuer: accounts[0]
      };

      const tx = await signer.sendTransaction({
        to: formData.studentAddress,
        value: 0
      });

      await tx.wait();

      sessionStorage.setItem(formData.studentAddress, JSON.stringify({
        hash: tx.hash,
        metadata
      }));

      setIssuanceResult({ hash: tx.hash, metadata });

      setFormData({
        studentName: '',
        studentId: '',
        courseProgram: '',
        grade: '',
        completionDate: '',
        certificateFile: null,
        institutionCategory: '',
        institutionAddress: '',
        studentAddress: ''
      });

      setFileName('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="certificate-page-bg">
      <div className="certificate-container enhanced-ui">
        <div className="glass-card animated-card">
          <h2 className="title gradient-text neon-glow">🎓 Issue Blockchain Certificate</h2>
          <WalletConnect />

          <form onSubmit={handleSubmit} className="certificate-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                required
                className="input-field fancy-input"
                autoComplete="off"
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                required
                className="input-field fancy-input"
                autoComplete="off"
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Course or Program"
                value={formData.courseProgram}
                onChange={(e) => setFormData({ ...formData, courseProgram: e.target.value })}
                required
                className="input-field fancy-input"
                autoComplete="off"
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Grade (e.g. A+)"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                required
                className="input-field fancy-input"
                autoComplete="off"
              />
            </div>

            <div className="form-row">
              <input
                type="date"
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                required
                className="input-field fancy-input"
              />
            </div>

            <div className="form-row file-upload">
              <label className="file-label">
                <span className="file-btn gradient-btn neon-glow">📎 Upload supporting documents</span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    setFormData({ ...formData, certificateFile: e.target.files[0] });
                    setFileName(e.target.files[0]?.name || '');
                  }}
                  required
                  style={{ display: 'none' }}
                />
              </label>
              {fileName && <span className="file-name">📄 {fileName}</span>}
            </div>

            <div className="form-row">
              <select
                value={formData.institutionCategory}
                onChange={(e) => setFormData({ ...formData, institutionCategory: e.target.value })}
                required
                className="input-field fancy-input"
              >
                <option value="">Select Institution Category</option>
                <option value="Secondary School">Secondary School</option>
                <option value="TVET School">TVET School</option>
                <option value="University">University/College</option>
              </select>
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Institution Blockchain Address"
                value={formData.institutionAddress}
                onChange={(e) => setFormData({ ...formData, institutionAddress: e.target.value })}
                required
                className="input-field fancy-input"
                autoComplete="off"
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Student Blockchain Address"
                value={formData.studentAddress}
                onChange={(e) => setFormData({ ...formData, studentAddress: e.target.value })}
                required
                className="input-field fancy-input"
                autoComplete="off"
              />
            </div>

            <button type="submit" className="submit-btn gradient-btn neon-glow" disabled={loading}>
              {loading ? (
                <span>
                  <span className="spinner" /> Issuing Certificate...
                </span>
              ) : (
                <span>🚀 Issue Certificate</span>
              )}
            </button>
          </form>

          {issuanceResult && (
            <div className="result-box success fade-in">
              <div className="success-header">
                <span className="success-icon">✅</span> Certificate issued!
              </div>
              <div className="hash-row">
                <strong>Hash:</strong>
                <code className="hash-code">{issuanceResult.hash}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(issuanceResult.hash)}
                  className="copy-btn"
                  title="Copy hash"
                >
                  📋
                </button>
              </div>
              <div className="qr-section">
                <QRCode value={issuanceResult.hash} size={128} />
                <div className="qr-caption">Scan to verify</div>
              </div>
            </div>
          )}

          {error && (
            <div className="result-box error fade-in">
              <span className="error-icon">❌</span> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificateIssuance;
