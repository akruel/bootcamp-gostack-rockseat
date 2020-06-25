import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import api from './services/api';

import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get('/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.error);
  }, [projects]);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: 'Back-end com Node.js',
      owner: 'Anderson Kruel',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Homepage" />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
      <button onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}

export default App;
