import { useState } from 'react'
import Logo from './assets/logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <img src={Logo} className="logo" alt="logo" />
      </div>
      <h1>수현 & 예원의 프론트 앱</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          개발 진행 중에 있습니다.
        </p>
      </div>
    </>
  )
}

export default App
