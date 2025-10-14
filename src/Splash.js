import React, { useEffect, useState } from "react";
import "./Splash.css";
import logo from "./icons/icon-192x192.png"; 

function Splash({ onFinish }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
    const timer = setTimeout(() => {
        setVisible(false);
        onFinish();
    }, 2000); 

    return () => clearTimeout(timer);
    }, [onFinish]);

    if (!visible) return null;

    return (
    <div className="splash-screen">
        <img src={logo} alt="Logo" className="splash-logo" />
        <h1>Mi To-Do PWA</h1>
    </div>
);
}

export default Splash;
