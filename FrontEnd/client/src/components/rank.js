import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Rank() {
  const [data, setData] = useState({
  name: 0,
  date: "",
  description: "",
  link: "",
  items: [""],
  submissions: [""]
  });
  const params = useParams();
  const navigate = useNavigate();

  const [bruh, setBruh] = useState(1)
  const [unranked, setUnranked] = useState([])
  const [rankings, setRankings] = useState([])
 
 useEffect(() => {
   async function fetchData() {
    console.log("pulling data")

     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
    console.log(record)
    setData(record);
    setUnranked(record.items)
    let arr = []
    for (let i = 0; i < record.items.length; i++){
      arr.push("")
    }
    setRankings(arr)

   }

   if (data.name === 0){
    fetchData();
   }
   
 
   return;
 }, [params.id, navigate, unranked, rankings, bruh, data.name]);
 
  async function onSubmit(e) {
    let newSubmissions = data.submissions
    if (newSubmissions[0] === ""){
      newSubmissions.splice(0,1)
    }
    newSubmissions.push(rankings)

    console.log("pushing data", newSubmissions)
    await fetch(`http://localhost:5000/addRanking/${params.id}`, {
      method: "POST",
      body: JSON.stringify(newSubmissions),
      headers: {
        'Content-Type': 'application/json'
      },
      })
    navigate("/");
  }

  let onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("id", id);
  }

  let onDragOver = (ev) => {
    ev.preventDefault()
  }

  let onDropUR = (ev) => {
    let id = ev.dataTransfer.getData("id")
    console.log("dropon", id)

    let newRanks = rankings
    newRanks[newRanks.indexOf(id)] = ""
    setRankings(newRanks)

    let newUnrankeds = unranked
    newUnrankeds.push(id)
    setUnranked(newUnrankeds)

    refresh()
  }

  let onDropRank = (ev, index) => {
    let id = ev.dataTransfer.getData("id")
    console.log("dropon", id, index)

    let newUnrankeds = unranked
    newUnrankeds.splice(newUnrankeds.indexOf(id), 1)
    setUnranked(newUnrankeds)
    console.log(newUnrankeds)
    console.log(unranked)

    let newRanks = rankings
    newRanks[index] = id
    setRankings(newRanks)

    refresh()

  } 

  function refresh(){
    if (bruh){
      setBruh(0)
    } else {
      setBruh(1)
    }
  }

 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
      <h3>{data.name}</h3>
      <p>{data.category}</p>
      <p>{data.date}</p>
      <p>{data.description}</p>
      <a href={data.link}>{data.link}</a>

      <div 
        className="unranked"
        onDragOver={(e)=>onDragOver(e)}
        onDrop={(e)=>onDropUR(e)}>
        {unranked.map((element, i ) => 
        <div 
          draggable 
          onDragStart = {(e) => onDragStart(e, element)}
          className="draggable">
          <p>{element}</p>
        </div>)}

      </div>

      <div 
        className="rankings"
        >

        {rankings.map((element, i) =>
        <div 
          style={{backgroundColor:"grey", height:"100px", width:"100px"}}
          onDragOver={(e) => onDragOver(e)}
          onDrop={element === "" ? (e) => onDropRank(e, i) : 0}>
          
          <div 
          draggable 
          onDragStart = {(e) => onDragStart(e, element)}
          className="draggable">
          <p>{element}</p>
        </div>
        </div>
        )}
      </div>

      <button onClick={(e) => onSubmit(e)}disabled={unranked.length === 0 ? false : true}>Submit</button>

    <p hidden>{bruh}</p>
   </div>
 );
}
