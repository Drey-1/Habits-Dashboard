import type React from 'react';
import '../styles/Btn.css';

type BtnProps = {
  color?: string;
  content?: React.ReactNode;
};

export default function Btn(props: BtnProps) {
  const { color, content } = props;
  return (
    <div className='btn-p'>
      <button className='btn' style={{ backgroundColor: color }}>
        {content}
      </button>
    </div>
  );
}
