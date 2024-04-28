import React from "react";
import "./style.css"

const Header = () => {
  return (
    <header>
      <div>
        <a href="/">
          <h1>Luiz</h1>
        </a>
      </div>
      <div>
        <ul>
          <a href="/">
            <li>Inicio</li>
          </a>
          <a href="/add">
            <li>Adicionar Café</li>
          </a>
        </ul>
      </div>
    </header>
  );
};

export default Header;