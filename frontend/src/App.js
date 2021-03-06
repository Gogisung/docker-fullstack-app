import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  useEffect(() => {
    //여기서 데이터베이스에 있는 값을 가져온다.App
    axios.get('/api/values')
    .then(response => {
    console.log('response', response)
    setLists(response.data)
    })
    
    }, [])

    
  const [lists, setLists] = useState([])
  const [value, setValue] = useState("")

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => { 
    event.preventDefault();
    
    axios.post('/api/values', {value: value}).then((res) => {
      if(res.data.success) {
        console.log("res", res);
        setLists([...lists, res.data])
        setValue("");
      } else {
        alert('값을 DB에 넣는데 실패 했습니다.');
      }
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && lists.map((list, index) => {
            <li key={index}>{lists.value}</li>
          })}

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
