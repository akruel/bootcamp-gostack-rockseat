const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: '752b8525-8b5e-41cf-95b9-bb7bc9918874',
    title: 'Mobile com React Native',
    owner: 'Anderson Kruel',
  },
  {
    id: '5b9cc402-8b16-44fb-a0fb-3cc4d839f484',
    title: 'Front-end com ReactJS',
    owner: 'Anderson Kruel',
  },
];

function logRequests(request, response, next) {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ message: 'Invalid project ID' });
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  const project = { id: uuid(), title, owner };
  projects.push(project);
  return response.status(201).json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex < 0) {
    return response.status(404).json({ message: 'Project Not Found' });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex < 0) {
    return response.status(404).json({ message: 'Project Not Found' });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => console.log('🚀️ Servidor rodando ...'));
