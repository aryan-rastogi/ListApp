import React, { useState } from "react";
import { useNavigate } from "react-router";

import { categories } from "../globallists";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   category: "",
   description: "",
   link: "",
   items: [""] 
 });
 const [inputtype, setInputtype] = useState("")
 const navigate = useNavigate();

let insertItem = (index, value) => {
  console.log(index, value)
  let temparray = form.items
  temparray[index] = value
  setForm({...form, items: temparray})
}

let addOneField = () => {
  setForm({...form, items: [...form.items, ""]})
}

let addTenFields = () => {
  let temparray = form.items
  for (let i = 0; i < 10; i++){
    temparray.push("")
  }
  setForm({...form, items: temparray})
}

let removeField = (index) => {
  console.log(form.items.length)
  if (form.items.length > 1){
    let temparray = form.items
    temparray.splice(index , 1)
    setForm({...form, items: temparray})
  }
}

 // This function will handle the submission.
 async function onSubmit() { 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newList = { ...form };
 
   await fetch(process.env.REACT_APP_BACKEND_URL + "/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newList),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
   console.log("Done")
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
  <div>
    <h3>Create New List</h3>
    <div className="form-group">
       <label>List Name</label>
         <input
          type="text"
          className="form-control"
          id="name"
          value={form.name}
          onChange={(e) => setForm({...form, name : e.target.value })}
        />
    </div>
    <div className="form-group">
      <label>Category</label>
      <select
        type="text"
        className="form-control"
        id="category"
        value={form.category}
        onChange={(e) => setForm({...form, category : e.target.value })}
      >
        <option hidden></option>
        {
          categories.map((cat, i) => <option value={cat}>{cat}</option>)
        }
      </select>
      </div>
      <div className="form-group">
       <label>Description</label>
         <textarea
          className="form-control"
          id="Description"
          value={form.description}
          onChange={(e) => setForm({...form, description : e.target.value })}
        />
      </div> 
      <div className="form-group">
       <label>Reference URL</label>
         <input
          className="form-control"
          type="text"
          id="Description"
          value={form.link}
          onChange={(e) => setForm({...form, link : e.target.value })}
        />
      </div> 
      <div className="form-group">
       <label>Form List Items</label>
       <p>Input Type:</p>
       <input type="radio" checked={inputtype === "fields"} onChange={(e) => setInputtype("fields")}/>
       <label>Seperate Input Fields</label>
       <input type="radio" checked={inputtype === "textbox"} onChange={(e) => setInputtype("textbox")}/>
       <label>Text input with ; delimiter</label>

        {
          inputtype === "fields" ?
          <div>
            <label>Please add fields as you need.</label>
            <br></br>
            {
              form.items.map((item, i) => 
              <div>
                <input
                  type="text"
                  className="item-control"
                  id="item-input"
                  value={form.items[i]}
                  onChange={(e) => insertItem(i,e.target.value)}
                />
                <button  onClick={() => removeField(i)}>Remove</button>
              </div>)
            }
            <br></br>
            <button onClick={() => addOneField()}>Add 1</button>
            <button onClick={() => addTenFields()}>Add 10</button>
          </div>
          : 
          inputtype === "textbox" ?
          <div>
            <label>Please enter items with semicolons(;) between each one. Do not use spaces.</label>
            <textarea
              className="form-control"
              id="Description"
              onChange={(e) => setForm({...form, items : e.target.value.split(";")})}
          />
          </div>
          : <></>
        }
      </div> 
      <button onClick={() => onSubmit()}>Submit</button>
  </div>
 );
}