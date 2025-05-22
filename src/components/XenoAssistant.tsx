
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl] = useState('https://n8n.klave.ec/webhook-test/2c7b008d-07f0-4f07-91c9-6f61c7903b12');

  const sendToN8n = async (message: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Para evitar problemas de CORS
        body: JSON.stringify({ 
          message,
          timestamp: new Date().toISOString(),
          source: 'XENO Assistant'
        }),
      });
      
      console.log('Mensaje enviado a n8n');
      return true;
    } catch (error) {
      console.error('Error al enviar mensaje a n8n:', error);
      toast({
        title: "Error",
        description: "No se pudo conectar con el agente n8n.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
    };
    
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    
    // Store input and clear it
    const userInput = inputText;
    setInputText('');
    
    // Send to n8n webhook
    const sent = await sendToN8n(userInput);
    
    // Simulate XENO response
    setTimeout(() => {
      let responseText = "";
      
      if (sent) {
        const xenoResponses = [
          "Estoy procesando tu mensaje a través de mi red neuronal externa.",
          "He enviado tu consulta a mi sistema de procesamiento avanzado.",
          "Analizando tu solicitud con mi agente inteligente.",
          "Conectando con mi módulo de procesamiento para darte la mejor respuesta.",
        ];
        responseText = xenoResponses[Math.floor(Math.random() * xenoResponses.length)];
      } else {
        responseText = "Parece que no puedo conectar con mi agente externo en este momento. ¿Hay algo más en lo que pueda ayudarte?";
      }
      
      const xenoReply: Message = {
        id: messages.length + 2,
        text: responseText,
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
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLoading) handleSendMessage();
          }}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
};

export default XenoAssistant;
