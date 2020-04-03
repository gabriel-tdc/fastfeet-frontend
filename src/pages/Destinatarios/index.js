import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaEllipsisH, FaPen, FaTrash } from 'react-icons/fa';

import Header from '~/pages/Template/Header/';

import {
  Content,
  Title,
  ContentHeader,
  Searchbox,
  SearchInput,
  PrimaryButton,
  Acoes,
  Dropdown,
  DropdownItem,
} from '~/styles/dashboard';

export default function Destinatarios() {
  const [visible, setVisible] = useState(false);

  function handleSetVisible(key) {
    setVisible(key);
  }
  function handleSetInvisible() {
    setVisible(false);
  }

  return (
    <>
      <Header />
      <Content>
        <Title>Gerenciando Detinatários</Title>
        <ContentHeader>
          <Searchbox htmlFor="buscar">
            <FaSearch />
            <SearchInput id="buscar" placeholder="Buscar por Detinatários" />
          </Searchbox>
          <Link to="/cadastrar/destinatario">
            <PrimaryButton>
              <FaPlus />
              CADASTRAR
            </PrimaryButton>
          </Link>
        </ContentHeader>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#01</td>
              <td>Ludwig van Beethoven</td>
              <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
              <td>
                <Acoes
                  onMouseEnter={() => handleSetVisible(1)}
                  onMouseLeave={() => handleSetInvisible()}
                >
                  <FaEllipsisH />
                  <Dropdown visible={visible && visible === 1}>
                    <DropdownItem>
                      <Link to="/editar/destinatario">
                        <FaPen color="#4D85EE" />
                        <div>Editar</div>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/">
                        <FaTrash color="#DE3B3B" />
                        <div>Excluir</div>
                      </Link>
                    </DropdownItem>
                  </Dropdown>
                </Acoes>
              </td>
            </tr>
            <tr>
              <td>#02</td>
              <td>John Doe</td>
              <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
              <td>
                <Acoes
                  onMouseEnter={() => handleSetVisible(2)}
                  onMouseLeave={() => handleSetInvisible()}
                >
                  <FaEllipsisH />
                  <Dropdown visible={visible && visible === 2}>
                    <li>
                      <Link to="/editar/destinatario">
                        <FaPen color="#4D85EE" />
                        <div>Editar</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <FaTrash color="#DE3B3B" />
                        <div>Excluir</div>
                      </Link>
                    </li>
                  </Dropdown>
                </Acoes>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
    </>
  );
}
