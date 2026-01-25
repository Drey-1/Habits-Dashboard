import './styles/App.css';

import HabitForm from './components/HabitForm';
import HabitCard from './components/HabitCard';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Btn from './components/Btn';

import { useHabits } from './hooks/useHabits';

function App() {
  const {
    habits,
    filteredHabits,
    filter,
    theme,
    addHabit,
    removeHabit,
    updateHabit,
    doneHabit, 
    setFilter,
    setTheme, 
  } = useHabits();

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
        <Dashboard items={habits} />
        <div className="habit-nav">
          <div
            className={filter === 'all' ? 'nav-y' : ''}
            onClick={() => setFilter('all')}
          >
            <Btn color="" content="All" />
          </div>
          <div
            className={filter === 'checked' ? 'nav-y' : ''}
            onClick={() => setFilter('checked')}
          >
            <Btn color="#87BF84" content="Checked" />
          </div>
          <div
            className={filter === 'unchecked' ? 'nav-y' : ''}
            onClick={() => setFilter('unchecked')}
          >
            <Btn color="#DDDDDD" content="Uncheked" />
          </div>
        </div>
        <div className="list-scroll">
          {filteredHabits.map((item) => (
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
