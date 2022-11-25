import Header from "./components/Header/Header";
import Todos from "./components/Todos/Todos";


function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Todos />
      </main>
    </div>
  );
}

export default App;
