import React from "react";
import "../styles/Market.css";

export default function Market() {
  return (
    <main className="market-page" role="main">
      <header>
        <h1 className="market-title">Market Price Checker</h1>
        <p className="market-subtitle">
          Check today’s mandi / market prices directly from the official Government portal.
        </p>
      </header>

      <section className="market-card" aria-labelledby="market-card-title">
        <h2 id="market-card-title" className="visually-hidden">
          AGMARKNET Link
        </h2>

        <p className="market-description">
          Click the button below to open the AGMARKNET portal and view live prices.
        </p>

        <a
          href="https://agmarknet.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="market-btn"
          role="button"
          aria-label="Open AGMARKNET portal in a new tab"
        >
          Open AGMARKNET
        </a>
      </section>
    </main>
  );
}
