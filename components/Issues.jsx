import React from 'react';
import styled from 'styled-components';
import IssueCard from './IssueCard';
import { issues } from '@/constants/issues';


export default function IssuesPage({onConnectWallet}) {
  const chunkSize = 9;
  const issueChunks = [];
  for (let i = 0; i < issues.length; i += chunkSize) {
    issueChunks.push(issues.slice(i, i + chunkSize));
  }

  return (
    <Wrapper>
      <Header>
        <h1>
          Make Your <span>Selection Below:</span>
        </h1>
        <p>Choose the Issue Affecting Your Wallet for Quick Assistance!</p>
      </Header>

      {issueChunks.map((chunk, chunkIndex) => (
        <Grid key={chunkIndex} style={{ marginBottom: chunkIndex < issueChunks.length - 1 ? '9rem' : '0' }}>
          {chunk.map((issue, index) => (
            <IssueCard
            key={index}
            icon={issue.icon}
            title={issue.title}
            description={issue.desc}
            onConnectWallet={onConnectWallet}
            />
          ))}
        </Grid>
      ))}
    </Wrapper>
  );
}

// =============== styled-components ===============

const Wrapper = styled.div`
  min-height: 100vh;
  background: var(--section-bg);
  color: var(--foreground);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 2rem;
  box-shadow: 0 0 40px rgba(0,255,200,0.07);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--heading);
    letter-spacing: 0.02em;
    margin-bottom: 0.5rem;
    span {
      text-decoration: underline;
      text-underline-offset: 5px;
      color: var(--foreground);
    }
  }
  p {
    margin-top: 0.5rem;
    color: var(--subheading);
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 16px rgba(0,255,200,0.08);
  &:hover {
    border-color: var(--accent);
    transform: translateY(-8px);
    box-shadow: 0 0 24px var(--accent);
  }
`;

const IconBox = styled.div`
  font-size: 2rem;
  background: rgba(0,255,200,0.13);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: var(--accent);
  margin-bottom: 1.2rem;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--heading);
`;

const Desc = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: var(--subheading);
`;

