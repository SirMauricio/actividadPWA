import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  // 🔹 Cargar las tareas desde localStorage al iniciar
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  // 🔹 Guardar las tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  // 🔹 Agregar tarea
  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") return;
    const nueva = { texto: nuevaTarea, completada: false };
    setTareas([...tareas, nueva]);
    setNuevaTarea("");
  };

  // 🔹 Eliminar tarea
  const eliminarTarea = (index) => {
    const nuevas = tareas.filter((_, i) => i !== index);
    setTareas(nuevas);
  };

  // 🔹 Marcar o desmarcar tarea
  const toggleCompletada = (index) => {
    const nuevas = [...tareas];
    nuevas[index].completada = !nuevas[index].completada;
    setTareas(nuevas);
  };

  return (
    <div className="contenedor">
      <h1>Lista de Tareas 📝</h1>

      <div className="formulario">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul className="lista">
        {tareas.map((tarea, index) => (
          <li
            key={index}
            className={tarea.completada ? "tarea completada" : "tarea"}
          >
            <span onClick={() => toggleCompletada(index)}>{tarea.texto}</span>
            <button onClick={() => eliminarTarea(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
