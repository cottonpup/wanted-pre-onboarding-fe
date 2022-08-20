import { useState } from 'react';

export default function TodoListItem(props) {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="flex items-center justify-between p-2 hover:bg-slate-100 rounded-sm">
      <div className="flex items-center" onClick={() => setCompleted(!completed)}>
        <input
          id={props.item.id}
          checked={completed}
          readOnly
          type="checkbox"
          className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
        />
        <label
          htmlFor={props.item.id}
          className={`ml-3 text-sm text-gray-600 ${completed ? 'line-through' : ''}`}
        >
          {props.item.text}
        </label>
      </div>
      <div className="flex items-center">
        <button className="flex items-center">
          <svg
            className="inline-block h-4 w-4 fill-[#9ca3af] hover:fill-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path>
          </svg>
        </button>
        <button
          className="flex items-center"
          onClick={(e) => props.removeTodoItem(e, props.item)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 stroke-[#9ca3af] hover:stroke-indigo-600"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
