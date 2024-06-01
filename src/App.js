import "./App.css";
import { useApp } from "./useApp";

function App() {
  const { handleFormSubmit, handleInputChange, input, messages } = useApp();
  return (
    <>
      <ul id="messages">
        {messages.map((msg) => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
      <form id="form" onSubmit={handleFormSubmit}>
        <input
          id="input"
          autoComplete="off"
          onChange={handleInputChange}
          value={input}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
