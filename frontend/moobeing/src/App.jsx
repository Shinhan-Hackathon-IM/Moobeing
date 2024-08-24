import './App.css';
import Router from './Router';

function App() {
  return (
    <div className="app-container">
      <h1>수현 & 예원의 프론트 앱</h1>
      <div className="card">
        <p>앱 내용이 여기에 들어갑니다.</p>
        <p>이 내용은 모든 화면 크기에서 동일하게 표시됩니다.</p>
        <Router/>
      </div>
    </div>
  );
}

export default App;