import React, { useEffect, useState } from "react";
import "./Splash.css";
import logo from "./icons/icon-192x192.png"; // Ajusta la ruta a tu ícono

function Splash({ onFinish }) {
const [visible, setVisible] = useState(true);

    useEffect(() => {
    const timer = setTimeout(() => {
        setVisible(false);
      if (onFinish) onFinish(); // Llamamos onFinish solo si existe
    }, 2000); // 2 segundos
    return () => clearTimeout(timer);
}, [onFinish]);

if (!visible) return null;

return (
    <div className="splash-screen">
    <img src={logo} alt="Logo" className="splash-logo" />
    <h1>TlabajApp</h1>
    </div>
);
}

export default Splash;
