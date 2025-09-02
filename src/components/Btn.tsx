import type React from 'react';
import '../styles/Btn.css';

type BtnProps = {
  color?: string;
  content?: React.ReactNode;
};

export default function Btn(props: BtnProps) {
  const { color, content } = props;
  return (
    <div>
      <button style={{ backgroundColor: color }}>
        {content}
      </button>
    </div>
  );
}
