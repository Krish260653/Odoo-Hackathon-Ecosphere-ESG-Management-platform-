import React, { useState, useRef, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Badge from './common/Badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  TrendingDown, 
  ShieldCheck, 
  Leaf, 
  AlertTriangle 
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const AICopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your EcoSphere ESG Copilot. Ask me anything about our carbon emissions, department rankings, or policy compliance audits.',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle send action
  const handleSend = (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulated typing delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
    }, 700);
  };

  // Rule-based Response Matcher
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Carbon Report Intent
    if (input.includes('carbon') || input.includes('emissions') || input.includes('scope')) {
      const chartData = [
        { name: 'Scope 1', value: 45.2 },
        { name: 'Scope 2', value: 82.4 },
        { name: 'Scope 3', value: 112.8 }
      ];

      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Here is the current carbon emissions summary for this quarter:',
        time,
        chart: chartData,
        summary: 'Total Emissions: 240.4 MT CO₂e (down 4.2% from last quarter). Scope 1 (Direct): 45.2 MT, Scope 2 (Utility energy): 82.4 MT, Scope 3 (Supply Chain): 112.8 MT.'
      };
    }

    // 2. Highest Emitting Department Intent
    if (input.includes('highest emitting') || input.includes('worst department') || input.includes('high emit')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: '📊 **Manufacturing** is the highest emitting department in the platform. This quarter, Manufacturing logged approximately 140 Tons CO₂e emissions, primarily driven by fuel combustion in Plant 2B and heavy machinery Scope 1 utilities.',
        time
      };
    }

    // 3. Generate ESG Report Intent
    if (input.includes('generate') || input.includes('report') || input.includes('compile')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: '📋 **ESG Report Compiled Successfully**:\n\n' + 
              '• **Environmental**: 82/100 (Compliant)\n' +
              '• **Social**: 74/100 (Needs Improvement)\n' +
              '• **Governance**: 79/100 (Compliant)\n' +
              '• **Overall Score**: 78/100 (Good)\n\n' +
              'Next audit: GDPR Data Alignment Review on July 25, 2026.',
        time
      };
    }

    // 4. Suggest Improvements Intent
    if (input.includes('suggest') || input.includes('improvement') || input.includes('help') || input.includes('fix')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: '💡 **Suggestions for ESG Score Improvement**:\n\n' +
              'Since our **Social Score** is the lowest (74/100), I suggest the following:\n\n' +
              '1. **Volunteering Drive**: Initiate a new CSR volunteering project in Manufacturing to log outstanding hours.\n' +
              '2. **Accessibility Audits**: Push Bangalore campus accessibility upgrades past 85% to reach the 100% target.\n' +
              '3. **Anti-Corruption Training**: Boost Finance & Legal training sign-offs from 89% to 95%.',
        time
      };
    }

    // Fallback response
    return {
      id: Date.now() + 1,
      sender: 'bot',
      text: "I couldn't quite match that question. You can ask me things like:\n\n" +
            '• "Show carbon report"\n' +
            '• "Highest emitting department"\n' +
            '• "Generate ESG report"\n' +
            '• "Suggest improvements"',
      time
    };
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-[#2D6A4F]/20"
        title="EcoSphere ESG Copilot"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
      </button>

      {/* Slide-in Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[380px] h-[500px] bg-white border border-[#EEEEEE] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#2D6A4F] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-300" />
              <div>
                <h3 className="text-sm font-bold leading-tight">ESG Copilot</h3>
                <span className="text-[10px] text-green-100 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                  <span>Interactive Agent</span>
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAFA] text-left">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Bot Icon */}
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-white border border-[#EEEEEE] flex items-center justify-center text-[#2D6A4F] flex-shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* Message Bubble */}
                <div className="space-y-1 max-w-[80%]">
                  <div 
                    className={`rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line shadow-sm border ${
                      msg.sender === 'user' 
                        ? 'bg-[#E9F5ED] text-[#1A1A1A] border-[#2D6A4F]/15' 
                        : 'bg-white text-[#1A1A1A] border-[#EEEEEE]'
                    }`}
                  >
                    {msg.text}

                    {/* Inline Chart for Carbon Reports */}
                    {msg.chart && (
                      <div className="w-full h-32 mt-3 pt-3 border-t border-[#EEEEEE] bg-[#FAFAFA] rounded-lg">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={msg.chart} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                            <XAxis dataKey="name" fontSize={9} stroke="#6B7280" tickLine={false} />
                            <YAxis fontSize={9} stroke="#6B7280" tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#457B9D" radius={[2, 2, 0, 0]} maxBarSize={20} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}

                    {/* Inline Summary for Carbon Reports */}
                    {msg.summary && (
                      <p className="text-[10px] text-[#6B7280] font-medium mt-2 italic">
                        {msg.summary}
                      </p>
                    )}
                  </div>
                  
                  <span className="text-[9px] text-[#6B7280] block px-1.5 font-medium">
                    {msg.time}
                  </span>
                </div>

                {/* User Icon */}
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-[#2D6A4F] flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#EEEEEE] flex items-center justify-center text-[#2D6A4F] flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-[#EEEEEE] rounded-2xl px-4 py-3 flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick-Replies Chips */}
          <div className="px-4 py-2 border-t border-[#EEEEEE] bg-[#FAFAFA] flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {[
              'Show carbon report',
              'Highest emitting department',
              'Suggest improvements'
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-[10px] font-semibold text-[#6B7280] hover:text-[#1D1D1D] bg-white border border-[#EEEEEE] hover:border-[#2D6A4F] rounded-full px-3 py-1.5 whitespace-nowrap transition-all duration-150 shadow-sm"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-[#EEEEEE] flex gap-2 items-center">
            <input
              type="text"
              placeholder="Ask Copilot..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 text-xs border border-[#EEEEEE] rounded-lg px-3 py-2 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white transition-all"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-lg bg-[#2D6A4F] hover:bg-[#1B4332] text-white transition-colors active:scale-95 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default AICopilot;
