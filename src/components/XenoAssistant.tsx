
import React, { useState, useEffect } from 'react';
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
  const [messageId, setMessageId] = useState(2);
  const [webhookUrl] = useState('https://n8n.klave.ec/webhook-test/2c7b008d-07f0-4f07-91c9-6f61c7903b12');
  const [responseUrl] = useState('http://172.23.0.5:8080/message/sendText/');

  const sendToN8n = async (message: string) => {
    try {
      setIsLoading(true);
      
      // Configurar el cuerpo de la petición
      const body = {
        message,
        timestamp: new Date().toISOString(),
        source: 'XENO Assistant',
        instance: message // Enviamos el mensaje como instancia para la URL de respuesta
      };

      // Enviar mensaje a n8n
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Para evitar problemas de CORS
        body: JSON.stringify(body),
      });
      
      console.log('Mensaje enviado a n8n:', body);

      // Intentamos obtener una respuesta del endpoint especificado
      try {
        const encodedInstance = encodeURIComponent(message);
        const fullResponseUrl = `${responseUrl}${encodedInstance}`;
        
        console.log('Solicitando respuesta de:', fullResponseUrl);
        
        const xresp = await fetch(fullResponseUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (xresp.ok) {
          const responseData = await xresp.json();
          console.log('Respuesta recibida:', responseData);
          
          // Añadir la respuesta real como mensaje de XENO
          const xenoResponse: Message = {
            id: messageId + 1,
            text: responseData.text || responseData.message || "He recibido tu mensaje y lo estoy procesando.",
            sender: 'xeno',
          };
          
          setMessageId(messageId + 2);
          setMessages(prev => [...prev, xenoResponse]);
          return true;
        } else {
          console.log('La respuesta no fue satisfactoria:', xresp.status);
          return false;
        }
      } catch (respError) {
        console.error('Error al obtener respuesta:', respError);
        return false;
      }
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
    
    const nextId = messageId;
    setMessageId(messageId + 1);
    
    // Add user message
    const newUserMessage: Message = {
      id: nextId,
      text: inputText,
      sender: 'user',
    };
    
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    
    // Store input and clear it
    const userInput = inputText;
    setInputText('');
    
    // Send to n8n webhook and get response
    const sent = await sendToN8n(userInput);
    
    // If we couldn't get a proper response, show a temporary message
    if (!sent) {
      setTimeout(() => {
        const fallbackText = "Parece que no puedo conectar con mi agente externo en este momento. ¿Hay algo más en lo que pueda ayudarte?";
        
        const xenoReply: Message = {
          id: messageId + 1,
          text: fallbackText,
          sender: 'xeno',
        };
        
        setMessageId(messageId + 2);
        setMessages((prevMessages) => [...prevMessages, xenoReply]);
      }, 1000);
    }
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
