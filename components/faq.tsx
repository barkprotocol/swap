import React from 'react';

interface FaqProps {
  question: string;
  answer: string;
}

const Faq: React.FC<FaqProps> = ({ question, answer }) => {
  return (
    <div className="faq-item p-4 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </div>
  );
};

export default Faq;
