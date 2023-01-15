import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
    const [data, setData] = useState(
        {list :{
        _id: "",
        name: "",
        date: "",
        description: "",
        link: "",
        items: [],
        submissions: []
    }})

    useEffect(() => {
        console.log(data)
        setData(props)
        console.log(data)
    }, [data, props])

    return (
        <div>
            <h3>{data.list.name}</h3>
            <p>{data.list.category}</p>
            <p>{data.list.date}</p>
            <p>{data.list.description}</p>
            <a href={data.list.link}>{data.list.link}</a>
            <br></br>
            <Link className="btn btn-link" to={`/edit/${props.list._id}`}>Create Rank</Link>
        </div>
    )
}