import List from './List';

export default function Lists({ todoData, setTodoData }) {
  return (
    <div>
      {todoData.map((data) => (
        <List
          key={data.id}
          completed={data.completed}
          title={data.title}
          id={data.id}
          todoData={todoData}
          setTodoData={setTodoData}
        />
      ))}
    </div>
  );
}
