import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import {
  FaPlus,
  FaSearch,
  FaEllipsisH,
  FaPen,
  FaTrash,
  FaTimes,
  FaSpinner,
} from 'react-icons/fa';

import { deliverymanDelete } from '~/store/modules/deliveryman/actions';

import api from '~/services/api';

import Header from '~/pages/Template/Header/';

import {
  Content,
  Title,
  ContentHeader,
  Searchbox,
  SearchInput,
  PrimaryButton,
  SecondaryButton,
  Acoes,
  Dropdown,
  DropdownItem,
  Modal,
  Loading,
} from '~/styles/dashboard';

export default function Entregadores() {
  const [visible, setVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadEntregadores() {
      setLoading(true);

      let params = null;
      if (search) {
        params = {
          q: search,
        };
      } else {
        params = {};
      }

      const response = await api.get('/deliveryman', { params });

      const data = response.data.map(deliveryman => {
        return {
          id: deliveryman.id,
          name: deliveryman.name,
          email: deliveryman.email,
          avatar: deliveryman.avatar,
        };
      });

      setTableData(data);
      setLoading(false);
    }
    loadEntregadores();
  }, [search]);

  async function handleDelete(id) {
    dispatch(deliverymanDelete(id));
    setTableData(tableData.filter(del => del.id !== id));
  }

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

  // Search
  function handleSearch(e) {
    setSearch(e);
  }

  return (
    <>
      <Loading inLoad={loading}>
        <FaSpinner className="fa-spin" />
      </Loading>
      <Header />
      <Content>
        <Title>Gerenciando Entregadores</Title>
        <ContentHeader>
          <Searchbox
            htmlFor="buscar"
            onChange={e => handleSearch(e.target.value)}
          >
            <FaSearch />
            <SearchInput id="buscar" placeholder="Buscar por Entregadores" />
          </Searchbox>
          <Link to="/cadastrar/entregador">
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
              <th>Foto</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map(entregador => (
              <tr key={entregador.id}>
                <td>#{entregador.id}</td>
                <td>
                  <img
                    src={
                      entregador.avatar
                        ? `http://localhost:3333/files/${entregador.avatar.path}`
                        : `https://ui-avatars.com/api/?name=${entregador.name}`
                    }
                    className="avatar"
                    alt="Avatar"
                  />
                </td>
                <td>{entregador.name}</td>
                <td>{entregador.email}</td>
                <td>
                  <Acoes
                    onMouseEnter={() => handleSetVisible(entregador.id)}
                    onMouseLeave={() => handleSetInvisible()}
                  >
                    <FaEllipsisH />
                    <Dropdown visible={visible && visible === entregador.id}>
                      <DropdownItem>
                        <Link to={`/editar/entregador/${entregador.id}`}>
                          <FaPen color="#4D85EE" />
                          <div>Editar</div>
                        </Link>
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleSetModalVisible(entregador.id)}
                      >
                        <span>
                          <FaTrash color="#DE3B3B" />
                          <div>Excluir</div>
                        </span>
                      </DropdownItem>
                    </Dropdown>
                  </Acoes>

                  <Modal
                    id={entregador.id}
                    visible={modalVisible && modalVisible === entregador.id}
                  >
                    <div className="modal-body">
                      <div className="modal-header">
                        <FaTimes onClick={() => handleSetModalInvisible()} />
                      </div>
                      <h2>Aviso</h2>
                      Você tem certeza que quer apagar o entregador{' '}
                      <b>{entregador.name}</b>?
                      <div className="modal-footer">
                        <PrimaryButton onClick={handleDelete}>
                          Apagar
                        </PrimaryButton>
                        <SecondaryButton onClick={handleSetModalInvisible}>
                          Cancelar
                        </SecondaryButton>
                      </div>
                    </div>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </>
  );
}
