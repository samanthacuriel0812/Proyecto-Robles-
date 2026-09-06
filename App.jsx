import React, { useState } from 'react';

// Product Backlog inicial sincronizado con el proyecto en Jira (UDG12)
const initialBacklog = [
  {
    id: 'UDG12-6',
    title: 'Planificación e Investigación',
    description: 'Definir el alcance, validar requerimientos con los clientes y estructurar el Producto Mínimo Viable (MVP).',
    priority: 'Media',
    points: 5,
    status: 'Backlog',
  },
  {
    id: 'UDG12-13',
    title: 'Planificación e Investigación',
    description: 'Reunión de equipo para verificar lo solicitado por los clientes y definir los detalles correspondientes para la presentación inicial del proyecto.',
    priority: 'Media',
    points: 5,
    status: 'Backlog',
  },
  {
    id: 'UDG12-17',
    title:'Investigación y definición de Storys de cliente/usuario',
    description: 'Levantamiento de información con el cliente y usuarios para estructurar las historias de usuario y requerimientos funcionales principales.',
    priority: 'Media',
    points: 5,
    status: 'Backlog',
  },
  {
    id: 'UDG12-19',
    title:'Investigación de referencias y mercado',
    description:'Análisis de soluciones existentes en el mercado y recopilación de buenas prácticas / referencias visuales y técnicas para el desarrollo.',
    priority: 'Media',
    points: 5,
    status: 'Backlog',
  },
  {
    id: 'UDG12-20',
    title: 'Planificación de tareas y tiempos',
    description:'Organización del plan de trabajo en Jira, asignación de actividades entre los integrantes del equipo y establecimiento del cronograma por Sprints.',
    priority: 'Media',
    points: 5,
    status: 'Backlog',
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialBacklog);

  // Mover tarea desde el Product Backlog hacia el Sprint
  const moveToSprint = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: 'Por Hacer' } : task
      )
    );
  };

  // Cambiar el estado de una tarea dentro del Sprint
  const handleStatusChange = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const backlogTasks = tasks.filter((t) => t.status === 'Backlog');
  const sprintTasks = tasks.filter((t) => t.status !== 'Backlog');
  const totalSprintPoints = sprintTasks.reduce((acc, curr) => acc + curr.points, 0);

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>Tablero Scrum - Proyecto UDG12</h1>
        <p>Sincronización de Sprint Planning y Product Backlog</p>
      </header>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        
        {/* Columna 1: Product Backlog */}
        <section style={{ flex: 1, backgroundColor: '#f4f5f7', padding: '16px', borderRadius: '8px' }}>
          <h2>Product Backlog ({backlogTasks.length})</h2>
          {backlogTasks.length === 0 ? (
            <p style={{ color: '#666' }}>No hay tareas pendientes en el Product Backlog.</p>
          ) : (
            backlogTasks.map((task) => (
              <div key={task.id} style={cardStyle}>
                <span style={badgeStyle}>{task.priority}</span>
                <h3 style={{ margin: '8px 0' }}>[{task.id}] {task.title}</h3>
                <p style={{ color: '#555', fontSize: '14px' }}>{task.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <span><strong>Points:</strong> {task.points}</span>
                  <button onClick={() => moveToSprint(task.id)} style={btnPrimary}>
                    Asignar a Sprint
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Columna 2: Sprint Backlog */}
        <section style={{ flex: 1, backgroundColor: '#eef6fc', padding: '16px', borderRadius: '8px', border: '1px solid #b3d8f8' }}>
          <h2>Sprint Backlog (Puntos Activos: {totalSprintPoints})</h2>
          {sprintTasks.length === 0 ? (
            <p style={{ color: '#666' }}>No hay tareas asignadas al Sprint actual.</p>
          ) : (
            sprintTasks.map((task) => (
              <div key={task.id} style={{ ...cardStyle, borderColor: '#0066cc' }}>
                <h3 style={{ margin: '4px 0' }}>[{task.id}] {task.title}</h3>
                <p style={{ color: '#555', fontSize: '14px' }}>{task.description}</p>
                <div style={{ marginTop: '10px' }}>
                  <label htmlFor={`select-${task.id}`} style={{ marginRight: '8px', fontSize: '14px', fontWeight: 'bold' }}>
                    Estado:
                  </label>
                  <select
                    id={`select-${task.id}`}
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    style={{ padding: '4px 8px', borderRadius: '4px' }}
                  >
                    <option value="Por Hacer">Por Hacer</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Completado">Completado</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </section>

      </div>
    </div>
  );
}

// Estilos de la interfaz
const cardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '6px',
  padding: '14px',
  marginBottom: '12px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

const badgeStyle = {
  backgroundColor: '#ffab00',
  color: '#000',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: 'bold',
};

const btnPrimary = {
  backgroundColor: '#0052cc',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
};