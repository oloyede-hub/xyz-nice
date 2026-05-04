'use client'

import styled, { keyframes } from 'styled-components'

const slideLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`

const Section = styled.section`
  width: 100%;
  padding: 2rem 1.5rem;
  background: #0f0f0f;
`

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`

const Header = styled.div`
font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme?.colors?.muted || '#94a3b8'};
  font-weight: 500;
  font-size: 2.5rem;
  font-weight: 700;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`

const CarouselTrack = styled.div`
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: ${slideLeft} 20s linear infinite;
`

const PartnerItem = styled.div`
  flex-shrink: 0;
  min-width: max-content;
`

const PartnerCard = styled.div`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.125rem;
  cursor: pointer;
  border: 1px solid transparent;
  color: ${({ color }) => color};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ color }) => color};
    color: #ffffff;
    border-color: ${({ color }) => color};
  }
`

export default function Partners() {
  const partners = [
    { name: 'Kraken', color: '#6B4DB8' },
    { name: 'Bitfinex', color: '#1DB954' },
    { name: 'Ethereum', color: '#627EEA' },
    { name: 'BNB Chain', color: '#F3BA2F' },
    { name: 'Polygon', color: '#8247E5' },
  ]

  // Duplicate for infinite scroll illusion
  const carouselPartners = [...partners, ...partners]

  return (
    <Section id="partners">
      <Container>
        <CarouselWrapper>
          <CarouselTrack>
            {carouselPartners.map((partner, index) => (
              <PartnerItem key={index}>
                <PartnerCard color={partner.color}>
                  {partner.name}
                </PartnerCard>
              </PartnerItem>
            ))}
          </CarouselTrack>
        </CarouselWrapper>
      </Container>
    </Section>
  )
}
