import axios from "axios";
import React, { useEffect, useState } from "react";

const ResidentCard = ({ url }) => {
  const [resident, setResident] = useState({});

  useEffect(() => {
    axios.get(url).then((res) => setResident(res.data));
  }, []);

  console.log(resident);

  return (
    
      <div className="resident-card">
        <img className="card-image" src={resident.image} alt="" />
        
        <div className="resident-card-info">
         <h3>{resident.name}</h3>
         <div className="container-line">
          <hr size='1'/>
         </div>
         <p><span>Type:</span> {resident.type}</p>
         <p><span>Status:</span> {resident.status}</p>
         <p><span>Origin:</span> {resident.origin?.name}</p>
         <p><span>Appearance in Episodes:</span> {resident.episode?.length}</p>
        </div>
      </div>
   
  );
};

export default ResidentCard;
