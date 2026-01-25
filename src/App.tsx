import './styles/App.css';

import HabitForm from './components/HabitForm';
import HabitCard from './components/HabitCard';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

import { useHabits } from './hooks/useHabits';
import Filter from './components/Filter';

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
          <Filter filter={filter} type="all" onFilter={setFilter} bgColor="" />
          <Filter filter={filter} type="checked" onFilter={setFilter} bgColor="#87BF84" />
          <Filter filter={filter} type="unchecked" onFilter={setFilter} bgColor="#DDDDDD" />
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
