import { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';
import HabitCard from './components/HabitCard';
import Dashboard from './components/Dashboard';
import './styles/App.css';
import Header from './components/Header';
import Btn from './components/Btn';

import type { Habit } from './types/habitType';
import { createHabit, deleteHabit, filterHabits, resetHabits, toggleDoneHabit, updateHabitTitle } from './domain/habitsComands';
import { loadDay, loadHabits, loadTheme, saveDay, saveHabits, saveTheme } from './services/localStorage';

function App() {
  const [items, setItems] = useState<Habit[]>(loadHabits());

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = loadTheme();
    return savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : 'light';
  });

  const [kindHabit, setKindhabit] = useState<'all' | 'checked' | 'unchecked'>(
    'all'
  );

  const addHabit = (newItem: string) => {
    setItems((prev) => [...prev, createHabit(newItem)]);
  };

  const removeHabit = (id: string) => {
    if (window.confirm('Do you really want to delete this habit?')) {
      setItems(deleteHabit(items,id))
    }
  };

  const updateHabit = (id: string) => {
    const newText = window.prompt('Write the new text:');
    if(newText){
      setItems(updateHabitTitle(items,newText,id))
    }
  }

  const doneHabit = (id: string) => {
    setItems(toggleDoneHabit(items,id))
  };

  const resetDones = () => {
    //setItems((prev) => prev.map((item) => ({ ...item, done: false })));
    setItems(resetHabits(items))
  };

  useEffect(() => {
    saveHabits(items);
  }, [items]);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDay = loadDay();

    if (savedDay != today) {
      resetDones();
      saveHabits(items);
      saveDay(today);
    }
  }, []);

  useEffect(() => {
    saveTheme(theme);
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
          {filterHabits(items,kindHabit).map((item) => (
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
