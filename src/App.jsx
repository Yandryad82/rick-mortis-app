import axios from "axios";
import { useState, useEffect } from "react";
import ResidentCard from "./components/ResidentCard";
import "./styles.css";
import rectangle from '../src/images/imagendefondo.jpg'
import Morty from '../src/images/Morty.jpg'
function App() {
  const [universeType, setUniverseType] = useState({});
  const [searchId, setSearchId] = useState("");


  useEffect(() => {
    const randomId = Math.floor(Math.random() * 126) + 1;
    axios
      .get(`https://rickandmortyapi.com/api/location/${randomId}/`)
      .then((res) => setUniverseType(res.data));
  }, []);

  console.log(universeType);

  const searchType = () => {


    if (searchId == "") {

    } else {
      axios
        .get(`https://rickandmortyapi.com/api/location/${searchId}`)
        .then((res) => setUniverseType(res.data));
      setSearchId('')
    }
  };

  let cond = universeType.residents?.length == 0 ? true : false

  const [population, setPopulation] = useState(cond)

  return (
    <div className="App">
      <header className="container-header ">
        <img className="imagenfondo" src={rectangle} alt="" />
      </header>
      <div className="container-input">
        <input
          type="text"
          placeholder="type a resident type id"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={searchType}>Search</button>
      </div>
      <div className="container-box-general-info">
<div className="contenedor-filter-name">

<p className='item-name'> 
          {universeType.name}</p>
</div>
          <div className="filter-barra">
          <p className='itenfilter'> <span>Type</span> <br />
            {universeType.type}</p>

          <p className='itenfilter'> <span>Dimension</span> <br />
            {universeType.dimension}</p>

          <p className='itenfilter'> <span>Resident</span> <br />
            {universeType.residents?.length}</p>

        </div>

      </div>
      <ul className="residen-list">
      {cond ? <div className="resident-card"><h3>We find no residents in this universe</h3>
        <img className="imgdefault" src={Morty} alt="" />
      </div> :  
      <> 
        {universeType.residents?.map((resident) => (
          <ResidentCard url={resident} key={resident} />
        ))} 
        </>
      }  
            </ul>
    </div>
  );
}

export default App;
