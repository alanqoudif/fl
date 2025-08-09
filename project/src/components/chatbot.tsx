import React, { useState } from 'react';

const ChatBot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const baseMessages = [
      { role: 'system', content: 'أنت مساعد ذكي يتحدث اللغة العربية ويجيب بشكل مختصر وواضح.' },
      ...messages,
      userMessage,
    ];

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: baseMessages,
        }),
      });

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const reply = data.choices?.[0]?.message?.content || 'لم يتمكن المساعد من الرد.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (error: any) {
      console.error('API Error:', error.message);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'حدث خطأ أثناء التواصل مع المساعد. حاول مرة أخرى.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">مساعد الذكاء الاصطناعي</h1>

      <div className="border p-4 rounded-lg h-96 overflow-y-auto bg-gray-50 mb-4 flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-blue-100 self-end text-right ml-auto'
                : 'bg-gray-200 self-start text-right mr-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <p className="text-sm text-center text-gray-400">...جاري الكتابة</p>}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-grow border border-gray-300 px-4 py-2 rounded-lg"
          placeholder="اكتب سؤالك هنا..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          إرسال
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
