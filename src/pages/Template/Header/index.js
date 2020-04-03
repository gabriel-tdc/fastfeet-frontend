import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '~/assets/fastfeet.svg';

import { Menu, Nav, Logout } from './styles';

export default function Header() {
  const userName = useSelector(state => state.user.profile.name);
  const { pathname } = useLocation();
  const activeStyle = { color: '#444444' };

  return (
    <Menu>
      <img src={logo} alt="Logotipo Fastfeet" />
      <Nav>
        <li>
          <Link
            to="/encomendas"
            style={pathname.includes('encomenda') ? activeStyle : {}}
          >
            ENCOMENDAS
          </Link>
        </li>
        <li>
          <Link
            to="/entregadores"
            style={pathname.includes('entregador') ? activeStyle : {}}
          >
            ENTREGADORES
          </Link>
        </li>
        <li>
          <Link
            to="/destinatarios"
            style={pathname.includes('destinatario') ? activeStyle : {}}
          >
            DESTINATÁRIOS
          </Link>
        </li>
        <li>
          <Link
            to="/problemas"
            style={pathname.includes('problema') ? activeStyle : {}}
          >
            PROBLEMAS
          </Link>
        </li>
      </Nav>
      <Logout>
        <p>{userName}</p>
        <Link to="/">sair do sistema</Link>
      </Logout>
    </Menu>
  );
}
