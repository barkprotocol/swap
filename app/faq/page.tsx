"use client";

import Hero from "@/components/hero";
import Faq from "@/components/faq";

const FAQ_DATA = [
  {
    question: "What is BARK?",
    answer: "BARK is a blockchain platform that allows you to trade, mint NFTs, and explore real-world asset-backed NFTs on Solana.",
  },
  {
    question: "How can I trade SPL tokens?",
    answer: "You can use the BARKSwap platform to seamlessly trade Solana SPL tokens through a user-friendly interface.",
  },
  {
    question: "What are Real-World Asset-Backed NFTs?",
    answer: "These are NFTs that represent ownership of real-world physical assets, allowing you to add tangible value to your digital assets.",
  },
  {
    question: "How do I mint an NFT?",
    answer: "You can create unique NFTs directly on our platform through the minting section, which guides you step by step.",
  },
  {
    question: "How does the royalty system work?",
    answer: "Our NFT platform supports a royalty system, which rewards creators with a percentage of resale transactions.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <section className="my-8">
          <h2 className="font-medium text-xl mb-4">Frequently Asked Questions</h2>
          <p className="mb-4">
            Find answers to the most commonly asked questions about our platform, NFTs, and token swaps.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {FAQ_DATA.map((faq, index) => (
              <Faq key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
