import React, {useState, useEffect} from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error';


function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad:'',
    pais:''
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);
  const {ciudad, pais} = busqueda;



  useEffect(() => {
   
    if(consultar)
    {
      consultaAPI();
      guardarConsultar(false);

    }
    //eslint-disable-next-line
  }, [consultar]);

const consultaAPI = async ()=> {
  const KEY = '56d92caae0ee42bb2d070841d2e8506b'; 
  const API = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${KEY}`;

  const respuesta = await fetch(API);
  const resultado = await respuesta.json();
  if(resultado.cod === "404"){
    guardarError(true);
  }else{
    guardarError(false);
  }
  guardarResultado(resultado);
} 


if(error){
  
}
  return (
    <>
      <Header
        titulo="Clima React App"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
             {
               error?
                (
                  <Error 
                    mensaje="No hay resultados"
                  />
                )
               :
               (
                <Clima
                  resultado={resultado}
                />
               )

             }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
