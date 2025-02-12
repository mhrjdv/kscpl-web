import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssociationsPage = () => {
  const [associations, setAssociations] = useState({ architects: [], consultants: [] });

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const response = await axios.get('https://kscplcms.cubeone.in//api/associations?populate=*');
        const data = response.data.data[0].associations;
        const architects = data.filter(item => item.Associations === 'Architects');
        const consultants = data.filter(item => item.Associations === 'Consultants');
        setAssociations({ architects, consultants });
      } catch (error) {
        console.error('Error fetching associations:', error);
      }
    };

    fetchAssociations();
  }, []);

  return (
    <div className="associations-page">
      <div className="architects">
        <h2>Architects</h2>
        <ul>
          {associations.architects.map(architect => (
            <li key={architect.id}>{architect.Name}</li>
          ))}
        </ul>
      </div>
      <div className="consultants">
        <h2>Consultants</h2>
        <ul>
          {associations.consultants.map(consultant => (
            <li key={consultant.id}>{consultant.Name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssociationsPage;

