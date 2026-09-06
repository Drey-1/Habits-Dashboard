import './styles/App.css';
import HabitForm from './components/HabitForm';
import HabitCard from './components/HabitCard';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { useHabits } from './hooks/useHabits';
import Filter from './components/Filter';
import { useDragDrop } from './hooks/useDragDrop';

export default function App() {
  const {
    habits,
    setHabits,
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
  
  const { onDragStart,onMouseOver,onDrop,onDragEnd } = useDragDrop(habits, setHabits);

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
              onDragStart={onDragStart}
              onMouseOver={onMouseOver}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
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