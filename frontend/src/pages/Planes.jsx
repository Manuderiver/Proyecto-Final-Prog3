import { useEffect, useState } from "react";
import api from "../services/api";


function Planes(){

  const [planes,setPlanes] = useState([]);


  useEffect(()=>{

    const cargar = async()=>{

      try{

        const response = await api.get("/planes");
        setPlanes(response.data);

      }catch(error){
        console.log(error);
      }

    };


    cargar();

  },[]);



  return(

    <div>

      <h1>Planes</h1>


      <ul>

        {
          planes.map(plan=>(

            <li key={plan.id}>
              {plan.nombre}
            </li>

          ))
        }

      </ul>


    </div>

  );

}


export default Planes;