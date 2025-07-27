import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface IFaqItem {
    question: string,
    answer: string,
    isOpen: boolean,
    onToggle: any 
}
 
const FAQItem = ({ question, answer, isOpen, onToggle }: IFaqItem ) => {
  return (
    // <div className="border border-slate-600/30 rounded-xl mb-4 overflow-hidden bg-slate-800/40 backdrop-blur-sm">
    <div className="border border-slate-600/30 rounded-xl mb-4 overflow-hidden bg-slate-800/40 backdrop-blur-sm">
      <button
        className="w-full px-6 py-5 text-left hover:bg-slate-700/50 transition-all duration-300 flex justify-between items-center group"
        onClick={onToggle}
      >
        <h3 className="font-semibold text-slate-100 text-lg group-hover:text-white transition-colors">
          {question}
        </h3>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-6 py-5 bg-slate-800/60 border-t border-slate-600/20">
          <p className="text-slate-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set());

  const faqData = [
    {
      id: 1,
      question: "What is token vesting and why is it important?",
      answer: "Token vesting is a mechanism that gradually releases tokens locked in the protocol over time according to a predetermined schedule"
    },
    {
      id: 2,
      question: "What networks are supported?",
      answer: "We currently support BSC and Polygon. We will add more networks based on demand"
    },
    {
      id: 3,
      question: "Are there any fees for using the platform?",
      answer: "We charge a one-time setup fee for creating vesting of 200 USDT. There are no ongoing fees, and beneficiaries don't pay anything to receive their vested tokens"
    },
    {
      id: 4,
      question: "How do beneficiaries claim their tokens?",
      answer: "One of our best features is automatic distribution. Beneficiaries will receive their corresponding tokens automatically, on schedule without you or they doing anything after the vesting is created"
    },
    {
      id: 5,
      question: "How does it work?",
      answer: "You fill the form with the required vesting information, we ask your permission to do 3 things, pay the fee, lock the vested tokens and created the vesting. Then we handle it everything for you"
    },
  ];

  const toggleItem = (id: any) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    // <div className="mt-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="mt-6">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about our token vesting platform and how it works.
          </p>
        </div>
        
        <div className="space-y-3">
          {faqData.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openItems.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <a href="mailto:contact@cooltech.quest" target="_blank">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                Contact Support
              </button>
          </a>
        </div>
      </div>
    </div>
  );
}
