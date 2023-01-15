import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/utils/card"
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 
 // This following section will display the table with the records of individuals.
 return (
  <div>
    {
      records.map((element,i) => <Card list={element}></Card>)
    }
  </div>
 );
}