import React, { useState } from 'react';

// Datos iniciales del Product Backlog
const initialBacklog = [
  {
    id: 'HU-01',
    title: 'Visualización del Backlog',
    description: 'Renderizar lista de historias de usuario.',
    priority: 'Must have',
    points: 3,
    status: 'Backlog',
  },
  {
    id: 'HU-02',
    title: 'Gestión de Sprint Planning',
    description: 'Mover historias del backlog al sprint activo.',
    priority: 'Must have',
    points: 5,
    status: 'Backlog',
  },
  {
    id: 'HU-03',
    title: 'Actualización de estados',
    description: 'Cambiar estado de tareas a En Proceso o Completado.',
    priority: 'Should have',
    points: 3,
    status: 'Backlog',
  },
];

export default function SprintPlanningApp() {
  const [backlog, setBacklog] = useState(initialBacklog);

  // Mover elemento al Sprint Activo
  const moveToSprint = (id) => {
    setBacklog(
      backlog.map((item) =>
        item.id === id ? { ...item, status: 'Sprint Backlog' } : item
      )
    );
  };

  // Cambiar estado de la tarea dentro del Sprint
  const updateStatus = (id, newStatus) => {
    setBacklog(
      backlog.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const backlogItems = backlog.filter((item) => item.status === 'Backlog');
  const sprintItems = backlog.filter((item) => item.status !== 'Backlog');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Sprint Planning Board</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        
        {/* Columna: Product Backlog */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Product Backlog</h3>
          {backlogItems.length === 0 ? <p>No hay tareas en el backlog.</p> : null}
          {backlogItems.map((item) => (
            <div key={item.id} style={cardStyle}>
              <h4>[{item.id}] {item.title}</h4>
              <p>{item.description}</p>
              <p><strong>Prioridad:</strong> {item.priority} | <strong>Esfuerzo:</strong> {item.points} pts</p>
              <button onClick={() => moveToSprint(item.id)} style={buttonStyle}>
                Agregar al Sprint
              </button>
            </div>
          ))}
        </div>

        {/* Columna: Sprint Backlog */}
        <div style={{ flex: 1, border: '1px solid #4CAF50', padding: '15px', borderRadius: '8px' }}>
          <h3>Sprint Backlog (Sprint Activo)</h3>
          {sprintItems.length === 0 ? <p>Ninguna tarea asignada al Sprint.</p> : null}
          {sprintItems.map((item) => (
            <div key={item.id} style={cardStyle}>
              <h4>[{item.id}] {item.title}</h4>
              <p>{item.description}</p>
              <label><strong>Estado: </strong></label>
              <select
                value={item.status}
                onChange={(e) => updateStatus(item.id, e.target.value)}
                style={{ marginLeft: '8px' }}
              >
                <option value="Sprint Backlog">Por Hacer</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#f9f9f9',
};

const buttonStyle = {
  backgroundColor: '#008CBA',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
};