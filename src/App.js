import React, { useState, useEffect } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");


  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const mostrarNotificacion = (titulo, mensaje) => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(titulo, {
          body: mensaje,
          icon: "/icons/icon-192x192.png",
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permiso) => {
          if (permiso === "granted") {
            new Notification("Notificaciones activadas 🔔", {
              body: "Ahora recibirás avisos al agregar o eliminar tareas.",
              icon: "/icons/icon-192x192.png",
            });
          }
        });
      }
    }
  };

  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") return;

    const nueva = { texto: nuevaTarea, completada: false };
    const nuevasTareas = [...tareas, nueva];
    setTareas(nuevasTareas);
    setNuevaTarea("");

    mostrarNotificacion(
      "Nueva tarea agregada",
      `"${nueva.texto}" se agregó a tu lista.`
    );
  };

  const eliminarTarea = (index) => {
    const tareaEliminada = tareas[index];
    const nuevas = tareas.filter((_, i) => i !== index);
    setTareas(nuevas);

    mostrarNotificacion(
      "Tarea eliminada",
      `"${tareaEliminada.texto}" se eliminó de tu lista.`
    );
  };

  const toggleCompletada = (index) => {
    const nuevas = [...tareas];
    nuevas[index].completada = !nuevas[index].completada;
    setTareas(nuevas);
  };

  return (
    <div className="contenedor">
      <h1>Lista de Tareas</h1>

      <div className="formulario">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button onClick={agregarTarea}>
          <FontAwesomeIcon icon={faPlus} /> Agregar
        </button>
      </div>

      <ul className="lista">
        {tareas.map((tarea, index) => (
          <li
            key={index}
            className={tarea.completada ? "tarea completada" : "tarea"}
          >
            <span onClick={() => toggleCompletada(index)}>
              {tarea.texto}{" "}
              {tarea.completada && <FontAwesomeIcon icon={faCheck} />}
            </span>
            <button onClick={() => eliminarTarea(index)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
