import { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';
import { v4 } from 'uuid';
import HabitCard from './components/HabitCard';
import Dashboard from './components/Dashboard';
import './styles/App.css';
import Header from './components/Header';
import Btn from './components/Btn';

type habitType = {
  id: string;
  title: string;
  done: boolean;
};

function App() {
  const [items, setItems] = useState<habitType[]>(() => {
    const savedItems = localStorage.getItem('habits');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : 'light';
  });

  const [kindHabit, setKindhabit] = useState<'all' | 'checked' | 'unchecked'>(
    'all'
  );

  const saveHabits = (items: habitType[]) => {
    localStorage.setItem('habits', JSON.stringify(items));
  };

  const addHabit = (newItem: string) => {
    const habit: habitType = {
      id: v4(),
      title: newItem,
      done: false,
    };
    setItems((prev) => [...prev, habit]);
  };

  const removeHabit = (id: string) => {
    if (window.confirm('Do you really want to delete this habit?')) {
      setItems((prev) => prev.filter((item) => item.id != id));
    }
  };

  const updateHabit = (id: string) => {
    const newText = window.prompt('Write the new text:');
    if(newText){
      setItems((prev) =>
        prev.map((item) => (item.id == id ? { ...item, title: newText } : item))
      );
    }
  }

  const doneHabit = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id == id ? { ...item, done: true } : item))
    );
  };

  const resetDones = () => {
    setItems((prev) => prev.map((item) => ({ ...item, done: false })));
  };

  const filteredItems = items.filter((item) => {
    if (kindHabit === 'checked') return item.done;
    if (kindHabit === 'unchecked') return !item.done;
    return true; // "all"
  });

  useEffect(() => {
    saveHabits(items);
  }, [items]);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDay = localStorage.getItem('today');

    if (savedDay != today) {
      resetDones();
      saveHabits(items);
      localStorage.setItem('today', today);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

//  useEffect(() => {
//    console.log(JSON.stringify(items, null, 2));
//  }, [items]);

  return (
    <div id="bigP" className={theme === 'dark' ? 'dm' : ''}>
      <Header
        theme={theme}
        changeTheme={() =>
          setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        }
      />
      <div className="container">
        <HabitForm onSubmit={addHabit} />
        <Dashboard items={items} />
        <div className="habit-nav">
          <div
            className={kindHabit === 'all' ? 'nav-y' : ''}
            onClick={() => setKindhabit('all')}
          >
            <Btn color="" content="All" />
          </div>
          <div
            className={kindHabit === 'checked' ? 'nav-y' : ''}
            onClick={() => setKindhabit('checked')}
          >
            <Btn color="#87BF84" content="Checked" />
          </div>
          <div
            className={kindHabit === 'unchecked' ? 'nav-y' : ''}
            onClick={() => setKindhabit('unchecked')}
          >
            <Btn color="#DDDDDD" content="Uncheked" />
          </div>
        </div>
        <div className="list-scroll">
          {filteredItems.map((item) => (
            <HabitCard
              key={item.id}
              item={item}
              onRemove={removeHabit}
              onDone={doneHabit}
              onUpdate={updateHabit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
