import { useState } from "react"

function History({table}){
  // console.log(table
  if(table.length === 0){
    return(
      <div>press a button to start rendering</div>
    )
  }
  return(
    <div>{table.join(" ")}</div>
  )
}

function Button(props){
  return(
    <button onClick={props.handleclick}>{props.text}</button>
  )
}

function App() {
  const [clicks, setClicks] = useState({left: 0, right: 0});
  const [allClicks, setAllClicks] = useState([])
  const [total, setTotal] = useState(0)
  function handleLeft(){
    const sum = clicks.left + 1
    const newClicks = {      
      ...clicks,
      left: sum
    }

    setAllClicks(allClicks.concat("L"))
    setClicks(newClicks)
    setTotal(sum + clicks.right);
  }
  function handleRight(){
    const sum = clicks.right + 1;
    const newClicks = {
      ...clicks,
      right: sum
    }
    setAllClicks(allClicks.concat("R"))
    setClicks(newClicks)
    setTotal(clicks.left + sum);
  } 

  return (
    <>
      <h1>Hello world</h1>
      <span>right: {clicks.right}</span>
      <span>left: {clicks.left}</span>
      <Button handleclick={handleRight} text={"R"}/>
      <Button handleclick={handleLeft} text={"L"}/>
      <History table={allClicks}/>
      <p>total clicks: {total}</p>
    </>
  )
}

export default App
