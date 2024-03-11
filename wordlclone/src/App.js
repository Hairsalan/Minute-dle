import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";



function App() {

  const [solution, setSolution] = useState(null)
  const [timer, setTimer] = useState(60)
  const [freezeTimer, setFreezeTimer] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect( () => {
  
    setLoading(true);

    
    const apiUrl = 'https://random-word-api.herokuapp.com/word?length=5';

    fetch(apiUrl)
      .then(res => res.json())
      .then(words => {
        const randomSolution = words[0];
        setSolution(randomSolution);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching word from API:', error);
        setLoading(false); 
      });

}, [])

  useEffect ( () => {
    const interval = setInterval(() => {
      if(!freezeTimer) {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1: prevTimer))
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  },[freezeTimer])

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="App">
      <h1>Minute-dle</h1>
      <h2>Timer: {timer} seconds</h2>
      {solution && <Wordle solution={solution} timer={timer} setFreezeTimer={setFreezeTimer}/>}
    </div>
      
  );
}

export default App;
