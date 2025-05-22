
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'xeno';
}

const XenoAssistant: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hola, soy XENO. ¿En qué puedo ayudarte a convertirte en tu yo del futuro?", sender: 'xeno' },
  ]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
    };
    
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText('');
    
    // Simulate XENO response
    setTimeout(() => {
      const xenoResponses = [
        "Estoy analizando tus patrones para ayudarte a mejorar.",
        "Puedo ayudarte a desarrollar esa rutina con pequeños pasos diarios.",
        "Basado en tus hábitos actuales, te recomendaría comenzar con 10 minutos al día.",
        "He registrado tu objetivo. Vamos a trabajar juntos para lograrlo.",
      ];
      
      const randomResponse = xenoResponses[Math.floor(Math.random() * xenoResponses.length)];
      
      const xenoReply: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'xeno',
      };
      
      setMessages((prevMessages) => [...prevMessages, xenoReply]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[300px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-xeno-purple text-white rounded-tr-none'
                  : 'glass-morphism rounded-tl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Escribe un mensaje a XENO..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <Button onClick={handleSendMessage}>Enviar</Button>
      </div>
    </div>
  );
};

export default XenoAssistant;
