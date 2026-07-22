import { useEffect,useState } from "react";
import api from "../services/api";


function Asistencias(){

const [asistencias,setAsistencias]=useState([]);



useEffect(()=>{

    const cargar=async()=>{

    try{

    const response=await api.get("/asistencias");

    setAsistencias(response.data);


    }catch(error){

    console.log(error);

    }

};


cargar();


},[]);



return(

<div>

    <h1>Asistencias</h1>


    <table border="1">

    <thead>

        <tr>
        <th>ID</th>
        <th>Socio</th>
        <th>Fecha</th>
        </tr>

    </thead>


    <tbody>

    {
        asistencias.map(a=>(

        <tr key={a.id}>

            <td>{a.id}</td>

            <td>
            {a.socio?.nombre || "Sin datos"}
            </td>

            <td>
            {a.fecha}
            </td>

        </tr>

        ))
    }

    </tbody>


    </table>


</div>

);

}


export default Asistencias;