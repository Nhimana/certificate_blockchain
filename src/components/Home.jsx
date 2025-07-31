import React from 'react';

function Home() {
  return (
    <div className="home-wrapper">
      <div className="blockchain-background">
        <div className="chain-link"></div>
        <div className="chain-link"></div>
        <div className="chain-link"></div>
      </div>
      <div className="home-content">
        <div className="hexagon-icon">
          <img src="/certificate-check.png" alt="Certificate" className="home-icon" />
          <div className="hexagon-border"></div>
        </div>
        <h1>
          <span className="gradient-text">Student Degree and Certificate</span>
          <span className="gradient-text">Validation System</span>
        </h1>
        <p>Secure • Verifiable • Immutable</p>
        <button className="cta-button">
          Validate Certificate
          <span className="button-pulse"></span>
        </button>
        <div className="crypto-badges">
          <span>Ethereum</span>
          <span>Metamask</span>
          <span>Smart Contracts</span>
        </div>
      </div>

      <style jsx>{`
        .home-wrapper {
          min-height: 100vh;
          background: #0a0c17;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .blockchain-background {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .chain-link {
          position: absolute;
          width: 2px;
          height: 100%;
          background: rgba(46, 214, 161, 0.1);
          left: 20%;
        }

        .chain-link:nth-child(2) {
          left: 50%;
        }

        .chain-link:nth-child(3) {
          left: 80%;
        }

        .chain-link::before {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2ed6a1;
          left: -5px;
          top: 30%;
          box-shadow: 0 0 15px #2ed6a1;
        }

        .chain-link:nth-child(2)::before {
          top: 50%;
          background: #6c5ce7;
          box-shadow: 0 0 15px #6c5ce7;
        }

        .chain-link:nth-child(3)::before {
          top: 70%;
          background: #fd79a8;
          box-shadow: 0 0 15px #fd79a8;
        }

        .home-content {
          text-align: center;
          color: white;
          z-index: 1;
          max-width: 800px;
          padding: 2rem;
          background: rgba(10, 12, 23, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 1s ease forwards;
        }

        .hexagon-icon {
          position: relative;
          width: 160px;
          height: 140px;
          margin: 0 auto 2rem;
        }

        .hexagon-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #2ed6a1, #6c5ce7);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          z-index: -1;
          animation: rotate 20s linear infinite;
        }

        .home-icon {
          width: 80px;
          height: 80px;
          margin-top: 30px;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
        }

        h1 {
          font-size: 2.8rem;
          margin-bottom: 1rem;
          font-weight: 700;
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .gradient-text {
          background: linear-gradient(90deg, #2ed6a1, #6c5ce7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        p {
          font-size: 1.3rem;
          opacity: 0.8;
          margin-bottom: 2rem;
          letter-spacing: 1px;
        }

        .cta-button {
          background: linear-gradient(45deg, #2ed6a1, #6c5ce7);
          border: none;
          color: white;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 50px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          margin-bottom: 2rem;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(46, 214, 161, 0.3);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(46, 214, 161, 0.4);
        }

        .button-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(45deg, #2ed6a1, #6c5ce7);
          border-radius: 50px;
          opacity: 0;
          animation: pulse 2s infinite;
        }

        .crypto-badges {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .crypto-badges span {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
          p {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;