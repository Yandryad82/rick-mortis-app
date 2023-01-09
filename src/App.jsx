import axios from "axios";
import { useState, useEffect } from "react";
import ResidentCard from "./components/ResidentCard";
import "./styles.css";
import rectangle from '../src/images/Rectangle 1.png'
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
    
      
      if (searchId == ""){

      }else{
        axios
      .get(`https://rickandmortyapi.com/api/location/${searchId}`)
      .then((res) => setUniverseType(res.data));
      setSearchId('')
      }
  };
  
  let cond = universeType.residents?.length==0  ? true : false
  
  const [population, setPopulation] = useState(cond)  
  
  return (
    <div className="App">
      <header className="container-header">
        <img src={rectangle} alt="" />
      </header>
      <input
        type="text"
        placeholder="type a resident type id"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={searchType}>Search</button>
      <div className="container-box-general-info">
        <div>
          <span>Name: </span>
          <p>{universeType.name}</p>
        </div>
        <div>
          <span>Type: </span>
          <p>{universeType.type}</p>
        </div>
        <div>
          <span>Dimesion: </span>
          <p>{universeType.dimension}</p>
        </div>
        <div>
          <span>Poblation: </span>
          <p>{universeType.residents?.length}</p>
        </div>
      </div>
      {cond ? <div className="no-residents"><h1>We find no residents in this universe</h1>
      <img src={Morty} alt="" />
      </div> : <ul className="residen-list">
        {universeType.residents?.map((resident) => (
          <ResidentCard url={resident} key={resident} />
        ))}
      </ul>}
    </div>
  );
}

export default App;
