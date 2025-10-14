import { useState } from 'react';
import Lists from './components/Lists';
import Form from './components/form';

const initailTodoData = localStorage.getItem('todoData')
  ? JSON.parse(localStorage.getItem('todoData'))
  : [];

export default function App() {
  const [todoData, setTodoData] = useState(initailTodoData);
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value === '') {
      return;
    }

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    const newTodoData = [...todoData, newTodo];

    setTodoData(newTodoData);
    setValue('');
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <Form
          value={value}
          setValue={setValue}
          handleSubmit={handleSubmit}
        ></Form>

        <Lists todoData={todoData} setTodoData={setTodoData}></Lists>
      </div>
    </div>
  );
}
