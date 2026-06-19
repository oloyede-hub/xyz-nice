"use client"
import React, { useEffect } from 'react';
import styled from 'styled-components';
import TickerTape from '../data/TickerTape';
import Image from 'next/image';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  background-color: rgba(26, 26, 26, 0.9); /* dark-bg with opacity */
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  gap:1.5;
  font-size: 1.5rem;
  font-weight: 700;
  color: #00d4ff;
  letter-spacing: 0.05em;
`;

const ConnectButton = styled.button`
  position: relative;
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 9999px;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
`;

const ButtonGradient = styled.span`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #00ffff, #0072ff);
  transition: all 0.3s ease-out;

  ${ConnectButton}:hover & {
    transform: scale(1.05, 1.1);
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 10;
  transition: color 0.3s ease;

  ${ConnectButton}:hover & {
    color: white;
  }
`;

const Navbar = ({ onConnectWallet }) => {
  return (
    <Nav>
      <TickerTape />
      <Container>
        {/* Logo/Title */}
        <Logo>
          <Image src="/logo_dapp.png" alt="logo" width={25} height={25} priority style={{ marginInline:"10px"}}/>
          <h3>DAPP</h3>
        </Logo>
        <ConnectButton onClick={onConnectWallet}>
          <ButtonGradient />
          <ButtonText>
            Connect Wallet
          </ButtonText>
        </ConnectButton>
      </Container>
    </Nav>
  );
};

export default Navbar;