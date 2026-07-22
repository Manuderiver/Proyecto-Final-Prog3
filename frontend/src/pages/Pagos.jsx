import { useEffect,useState } from "react";
import api from "../services/api";


function Pagos(){

const [pagos,setPagos]=useState([]);


useEffect(()=>{

const cargar=async()=>{

    try{

    const response=await api.get("/pagos");
    setPagos(response.data);

    }catch(error){

    console.log(error);

    }

};


cargar();

},[]);



return(

<div>

    <h1>Pagos</h1>


    <table border="1">

    <thead>
        <tr>
        <th>ID</th>
        <th>Monto</th>
        <th>Fecha</th>
        </tr>
    </thead>


    <tbody>

    {
        pagos.map(pago=>(

        <tr key={pago.id}>

            <td>{pago.id}</td>
            <td>{pago.monto}</td>
            <td>{pago.fecha}</td>

        </tr>

        ))
    }


    </tbody>


    </table>


</div>

);

}


export default Pagos;