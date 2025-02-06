import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConstructionCard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('API_URL_HERE')
      .then(response => {
        setProjects(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const handleCardClick = (project) => {
    const category = project.projectDetails.Category.toLowerCase();
    const slug = project.projectDetails.Title.toLowerCase().replace(/ /g, '-');
    const url = `http://localhost:4040/construction/${category}/${slug}/`;
    window.location.href = url;
  };

  return (
    <div className="construction-cards">
      {projects.map(project => (
        <div key={project.id} className="construction-card" onClick={() => handleCardClick(project)}>
          <h3>{project.projectDetails.Title}</h3>
          {/* Render other project details as needed */}
        </div>
      ))}
    </div>
  );
};

export default ConstructionCard;
