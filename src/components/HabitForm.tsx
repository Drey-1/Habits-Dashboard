import { Plus } from 'lucide-react';
import Btn from './Btn';
import '../styles/HabitForm.css';
import type React from 'react';
import { useState } from 'react';

type HabitFormProps = {
  onSubmit: (habit: string) => void;
};

export default function HabitForm({ onSubmit }: HabitFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    } else {
      window.alert('Error:There is nothing written in the habit input!');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Habit name"
        />
        <Btn color={'#4baf47ff'} content={<Plus />} />
      </form>
    </>
  );
}
