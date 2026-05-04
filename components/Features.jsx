'use client'

import styled from 'styled-components'
import { issues } from '@/constants/issues'

const Section = styled.section`
  width: 100%;
  background: #0f0f0f;;
  padding: 5rem 1.5rem;
`

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

const Subtitle = styled.p`
  // color: ${({ theme }) => theme?.colors?.primary || '#6366f1'};
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.foreground || '#ffffff'};
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`

const Description = styled.p`
  color: ${({ theme }) => theme?.colors?.muted || '#94a3b8'};
  font-size: 1.125rem;
`

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  font-size: 18px;
  justify-content: center;
`

const IssueButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  padding: 0.75rem 1.5rem;
  // border: 1px solid rgba(99, 102, 241, 0.4);
  // border: 1px solid #3B82F6;
  // box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);

  border: 1px solid transparent;
background: linear-gradient(#0b0f1a, #0b0f1a) padding-box,
linear-gradient(90deg, #3B82F6, #8B5CF6) border-box;
  border-radius: 9999px;

  // background: transparent;
  color: #6366f1;
  font-size: 0.875rem;
  font-weight: 500;

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
  border-color: #8B5CF6;
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.6);
}

  svg {
    font-size: 1rem;
  }
`

export default function Features({ onConnectWallet}) {
  return (
    <Section id="features">
      <Container>
        <Header>
          <Title>What You Can Fix</Title>
          <Description>
            Comprehensive solutions for all your Web3 challenges
          </Description>
        </Header>

        <TagsWrapper onClick={onConnectWallet}>
          {issues.map((issue, index) =>{ 
            const Icon = issue.icon
            return(
            <IssueButton key={index}>
              <Icon />
              {issue.title}
            </IssueButton>
          )})}
        </TagsWrapper>
      </Container>
    </Section>
  )
}
