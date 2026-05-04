"use client";
import React from "react";
import { PageContainer } from "../page";
import coins from "@/data/coin";

import { useState } from "react";
import WalletConnectModals from "@/components/WalletConnectModalsNew";
import TickerTape from "@/data/TickerTape";

function Page() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  function handleOpenChild(coin) {
    setSelectedCoin(coin);
    setIsOpen(true);
  }

  // Filter coins by search
  const filteredCoins = coins.filter((coin) =>
    coin.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PageContainer>
      <TickerTape />
      <div
        style={{ maxWidth: 900, margin: "0 auto", padding: "50px 0 16px 0" }}
      >
          <p
          style={{
            paddingBlock: "1rem",
            fontWeight: "bold",
            wordSpacing: "5px",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Choose wallet
        </p>
        <input
          type="text"
          placeholder="Search for your wallet here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "15px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            marginBottom: 18,
            fontSize: 16,
            boxSizing: "border-box",
            marginBottom: 32,
          }}
        />
      
        <div className="wallet-grid">
          {filteredCoins.length === 0 ? (
            <div
              style={{ textAlign: "center", color: "#888", padding: "32px 0" }}
            >
              No coins found.
            </div>
          ) : (
            filteredCoins.map((obj, id) => (
              <div
                className="wallet-item"
                key={id}
                onClick={() => handleOpenChild(obj)}
                style={{ cursor: "pointer" }}
              >
                <div className="wallet-connect">
                  <img
                    className="wallet-img"
                    src={obj.image.src}
                    alt={obj.title}
                  />
                  <p className="title" style={{ marginTop: 10, color: "#333" }}>
                    {obj.title}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <WalletConnectModals
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          coin={selectedCoin}
        />
      </div>
      <style jsx>{`
        .wallet-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(220px, 1fr));
          gap: 32px;
          justify-items: center;
          align-items: stretch;
          width: 100%;
        }
        .wallet-item {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
          padding: 28px 18px 18px 18px;
          text-align: center;
          transition: box-shadow 0.2s;
          cursor: pointer;
          min-width: 0;
          width: 100%;
          max-width: 340px;
        }
        .wallet-item:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
        }
        .wallet-img {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 50%;
          background: #f5f5f5;
          margin: 0 auto;
          display: block;
        }
        @media (max-width: 1100px) {
          .wallet-grid {
            grid-template-columns: repeat(2, minmax(220px, 1fr));
          }
        }
        @media (max-width: 700px) {
          .wallet-grid {
            grid-template-columns: 1fr;
          }
          .wallet-item {
            padding: 18px 6px 12px 6px;
            max-width: 95%;
            margin: 0 auto 18px auto;
          }
          .wallet-img {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
    </PageContainer>
  );
}

export default Page;
