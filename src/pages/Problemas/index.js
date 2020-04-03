import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FaEllipsisH, FaEye, FaTrash, FaTimes } from 'react-icons/fa';

import Header from '~/pages/Template/Header/';

import {
  Content,
  Title,
  Acoes,
  Dropdown,
  DropdownItem,
  Modal,
} from '~/styles/dashboard';

export default function Problemas() {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Dropdown
  function handleSetVisible(key) {
    setVisible(key);
  }
  function handleSetInvisible() {
    setVisible(false);
  }

  // Modals
  function handleSetModalVisible(key) {
    setModalVisible(key);
  }
  function handleSetModalInvisible() {
    setModalVisible(false);
  }
  return (
    <>
      <Header />
      <Content>
        <Title>Problemas na entrega</Title>

        <table>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#01</td>
              <td>Destinatário ausente</td>
              <td>
                <Acoes
                  onMouseEnter={() => handleSetVisible(1)}
                  onMouseLeave={() => handleSetInvisible()}
                >
                  <FaEllipsisH />
                  <Dropdown visible={visible && visible === 1}>
                    <DropdownItem onClick={() => handleSetModalVisible(1)}>
                      <span>
                        <FaEye color="#4D85EE" />
                        <div>Visualizar</div>
                      </span>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/">
                        <FaTrash color="#DE3B3B" />
                        <div>Cancelar</div>
                      </Link>
                    </DropdownItem>
                  </Dropdown>
                </Acoes>
              </td>
            </tr>
            <tr>
              <td>#02</td>
              <td>Carga roubada</td>
              <td>
                <Acoes
                  onMouseEnter={() => handleSetVisible(2)}
                  onMouseLeave={() => handleSetInvisible()}
                >
                  <FaEllipsisH />
                  <Dropdown visible={visible && visible === 2}>
                    <li>
                      <Link to="/editar/destinatario">
                        <FaEye color="#4D85EE" />
                        <div>Visualizar</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <FaTrash color="#DE3B3B" />
                        <div>Cancelar</div>
                      </Link>
                    </li>
                  </Dropdown>
                </Acoes>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>

      <Modal id="1" visible={modalVisible && modalVisible === 1}>
        <div className="modal-body">
          <div className="modal-header">
            <FaTimes onClick={() => handleSetModalInvisible()} />
          </div>
          <h2>VISUALIZAR PROBLEMA</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
            mauris et felis eleifend elementum vel quis lectus. Vivamus dapibus
            nisi augue, vitae ultrices ligula elementum at. Proin ut metus in mi
            tincidunt vestibulum a a felis. Aenean dictum libero eu urna
            tristique vestibulum. Fusce feugiat justo et augue facilisis, sit
            amet ornare eros consequat. Suspendisse semper risus feugiat nisl
            commodo, sed mollis neque auctor. Nullam eu fringilla lectus.
            Phasellus sed sapien sed turpis imperdiet maximus. Aenean ante
            nulla, bibendum non facilisis at, facilisis eget ex. In ut quam et
            tellus aliquet tincidunt.
          </p>
        </div>
      </Modal>
    </>
  );
}
