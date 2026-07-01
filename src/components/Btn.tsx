import '../styles/Btn.css';
import type { BtnProps } from '../types/BtnProps';

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
