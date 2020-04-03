import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import {
  FaPlus,
  FaEllipsisH,
  FaEye,
  FaPen,
  FaTrash,
  FaSearch,
  FaTimes,
} from 'react-icons/fa';

import Img from '~/assets/avatar.jpg';
import Assinatura from '~/assets/assinatura.png';

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
  Modal,
} from '~/styles/dashboard';

export default function Encomendas() {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Dropdowns
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
        <Title>Gerenciando Encomendas</Title>
        <ContentHeader>
          <Searchbox htmlFor="buscar">
            <FaSearch />
            <SearchInput id="buscar" placeholder="Buscar por Encomendas" />
          </Searchbox>
          <Link to="/cadastrar/encomenda">
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
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#01</td>
              <td>Ludwig van Beethoven</td>
              <td>
                <img src={Img} className="avatar" alt="JD" />
                John Doe
              </td>
              <td>Rio do Sul</td>
              <td>Santa Catarina</td>
              <td>
                <div className="badge success">ENTREGUE</div>
              </td>
              <td>
                <Acoes
                  onMouseEnter={() => handleSetVisible(1)}
                  onMouseLeave={() => handleSetInvisible()}
                >
                  <FaEllipsisH />
                  <Dropdown visible={visible && visible === 1}>
                    <DropdownItem onClick={() => handleSetModalVisible(1)}>
                      <span>
                        <FaEye color="#8E5BE8" />
                        <div>Visualizar</div>
                      </span>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/editar/encomenda">
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
              <td>Ludwig van Beethoven</td>
              <td>
                <img src={Img} className="avatar" alt="JD" />
                John Doe
              </td>
              <td>Rio do Sul</td>
              <td>Santa Catarina</td>
              <td>
                <div className="badge warning">PENDENTE</div>
              </td>
              <td>
                <Acoes
                  onMouseEnter={() => handleSetVisible(2)}
                  onMouseLeave={() => handleSetInvisible()}
                >
                  <FaEllipsisH />
                  <Dropdown visible={visible && visible === 2}>
                    <DropdownItem onClick={() => handleSetModalVisible(2)}>
                      <span>
                        <FaEye color="#8E5BE8" />
                        <div>Visualizar</div>
                      </span>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/editar/encomenda">
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
              <td>#03</td>
              <td>Ludwig van Beethoven</td>
              <td>
                <img src={Img} className="avatar" alt="JD" />
                John Doe
              </td>
              <td>Rio do Sul</td>
              <td>Santa Catarina</td>
              <td>
                <div className="badge info">RETIRADA</div>
              </td>
              <td>
                <FaEllipsisH />
              </td>
            </tr>
            <tr>
              <td>#04</td>
              <td>Ludwig van Beethoven</td>
              <td>
                <img src={Img} className="avatar" alt="JD" />
                John Doe
              </td>
              <td>Rio do Sul</td>
              <td>Santa Catarina</td>
              <td>
                <div className="badge danger">CANCELADA</div>
              </td>
              <td>
                <FaEllipsisH />
              </td>
            </tr>
            <tr>
              <td>#01</td>
              <td>Ludwig van Beethoven</td>
              <td>
                <img src={Img} className="avatar" alt="JD" />
                John Doe
              </td>
              <td>Rio do Sul</td>
              <td>Santa Catarina</td>
              <td>
                <div className="badge success">ENTREGUE</div>
              </td>
              <td>
                <FaEllipsisH />
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
          <h2>Informações da encomenda1</h2>
          <p>
            Rua Beethoven, 1729 <br />
            Diadema - SP <br />
            09960-580
          </p>

          <hr />

          <h2>Datas</h2>
          <p>
            <b>Retirada:</b> 25/01/2020 <br />
            <b>Entrega:</b> 25/01/2020
          </p>

          <hr />

          <h2>Assinatura do destinatário</h2>
          <div className="center">
            <img src={Assinatura} alt="Assintura" />
          </div>
        </div>
      </Modal>

      <Modal id="2" visible={modalVisible && modalVisible === 2}>
        <div className="modal-body">
          <div className="modal-header">
            <FaTimes onClick={() => handleSetModalInvisible()} />
          </div>
          <h2>Informações da encomenda 2</h2>
          <p>
            Rua Beethoven, 1729 <br />
            Diadema - SP <br />
            09960-580
          </p>

          <hr />

          <h2>Datas</h2>
          <p>
            <b>Retirada:</b> 25/01/2020 <br />
            <b>Entrega:</b> 25/01/2020
          </p>

          <hr />

          <h2>Assinatura do destinatário</h2>
          <div className="center">
            <img src={Assinatura} alt="Assintura" />
          </div>
        </div>
      </Modal>
    </>
  );
}
