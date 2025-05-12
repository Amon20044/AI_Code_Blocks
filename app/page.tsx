'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';
import ChatParser from '@/utils/parser';
import { StudentDetails } from '@/types/types';

export default function Chat() {
  const { messages, input, setInput, handleSubmit, isLoading } = useChat();
  const [mounted, setMounted] = useState(false);

  const [studentDetails, setStudentDetails] = useState<StudentDetails>({
    name: '',
    age: 0,
    gender: 'male',
    DateOfBirth: '',
    BirthTime: '',
    BirthCity: '',
    BirthState: '',
    BirthCountry: '',
  });

  const [note, setNote] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudentDetails(prev => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `User Note: ${note}\n\nStudent Details:\n${Object.entries(studentDetails)
      .map(([key, val]) => `- ${key}: ${val}`)
      .join('\n')}`;

    setInput(message);
    handleSubmit(e);
    setNote('');
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {/* Chat History */}
      {messages.map(message => (
        <div
          key={message.id}
          className="whitespace-pre-wrap mb-4 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800"
        >
          <div className="font-semibold mb-1">
            {message.role === 'user' ? 'User: ' : 'AI: '}
          </div>
          {message.parts.map((part, i) => {
            if (part.type === 'text') {
              return <ChatParser key={`${message.id}-${i}`} message={part.text} />;
            }
          })}
        </div>
      ))}

      {/* Multi-input form */}
      <form onSubmit={onFormSubmit} className="fixed bottom-0 w-full max-w-md bg-white dark:bg-zinc-900 shadow-lg p-4 space-y-2 border-t border-zinc-300 dark:border-zinc-800">
        {/* Student Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <input
            name="name"
            value={studentDetails.name}
            onChange={handleChange}
            placeholder="Name"
            className="input"
          />
          <input
            name="age"
            type="number"
            value={studentDetails.age}
            onChange={handleChange}
            placeholder="Age"
            className="input"
          />
          <select
            name="gender"
            value={studentDetails.gender}
            onChange={handleChange}
            className="input col-span-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            name="DateOfBirth"
            value={studentDetails.DateOfBirth}
            onChange={handleChange}
            placeholder="Date of Birth"
            className="input"
          />
          <input
            name="BirthTime"
            value={studentDetails.BirthTime}
            onChange={handleChange}
            placeholder="Birth Time"
            className="input"
          />
          <input
            name="BirthCity"
            value={studentDetails.BirthCity}
            onChange={handleChange}
            placeholder="Birth City"
            className="input"
          />
          <input
            name="BirthState"
            value={studentDetails.BirthState}
            onChange={handleChange}
            placeholder="Birth State"
            className="input"
          />
          <input
            name="BirthCountry"
            value={studentDetails.BirthCountry}
            onChange={handleChange}
            placeholder="Birth Country"
            className="input"
          />
        </div>

        {/* Note Input */}
        <input
          name="note"
          value={note}
          onChange={handleNoteChange}
          placeholder="Type your question..."
          className="input"
          disabled={isLoading}
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send to AI'}
        </button>
      </form>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
          Processing...
        </div>
      )}
    </div>
  );
}
