import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

// Forward ref to access input from parent
const TodoForm = forwardRef(({ addTodo }, ref) => {
  const [text, setText] = useState('');
  const inputRef = useRef(); // input için referans tanımlandı

  // Expose the input focus method to parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo({ id: Date.now(), text });
      setText('');
      inputRef.current.focus(); // Yeni görevi ekledikten sonra inputa odaklan
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef} // Referansı burada kullan
        className="flex-1 border p-2 rounded"
        placeholder="Yeni görev ekle..."
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        Ekle
      </button>
    </form>
  );
});

export default TodoForm;
