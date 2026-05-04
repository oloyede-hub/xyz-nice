"use client"
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Partners from '@/components/Partners';
import Ratings from '@/components/Ratings';
import Services from '@/components/Services';
import Features from '@/components/Features';
import WhyChooseUs from '@/components/WhyChooseUs';
import styled from 'styled-components';
import { useRouter} from 'next/navigation';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a; /* dark-bg */
  color: #e5e5e5; /* dark-text */
`;

const Main = styled.main`
  /* Add any additional main styles here if needed */
`;

export default function Home() {
  const router = useRouter();
  const handleOpenWalletModal = () => router.push("/connect");
  return (
    <PageContainer>
      <Navbar />
      <Main>
        <Hero />
        <Ratings />
        <Partners />
        <Features onConnectWallet={handleOpenWalletModal} />
        <Services onConnectWallet={handleOpenWalletModal} />
        <WhyChooseUs />
      </Main>
      <FAQ />
      <Footer />
    </PageContainer>
  );
}