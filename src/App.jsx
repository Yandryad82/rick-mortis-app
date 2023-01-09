import axios from "axios";
import { useState, useEffect } from "react";
import ResidentCard from "./components/ResidentCard";
import "./styles.css";
import rectangle from '../src/images/Rectangle 1.png'

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
    axios
      .get(`https://rickandmortyapi.com/api/location/${searchId}`)
      .then((res) => setUniverseType(res.data));
      setSearchId('')
  };

  return (
    <div className="App">
      <header className="container-nav">
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
      <ul className="residen-list">
        {universeType.residents?.map((resident) => (
          <ResidentCard url={resident} key={resident} />
        ))}
      </ul>
    </div>
  );
}

export default App;
