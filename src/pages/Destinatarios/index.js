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

import { recipientDelete } from '~/store/modules/recipient/actions';

import api from '~/services/api';

import Header from '~/pages/Template/Header/';

import {
  Content,
  Title,
  PageWarn,
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

export default function Destinatarios() {
  const [tableData, setTableData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadRemetentes() {
      setLoading(true);

      let params = null;
      if (search) {
        params = {
          q: search,
        };
      } else {
        params = {};
      }

      const response = await api.get('/recipients', { params });

      const data = response.data.map(recipient => {
        return {
          id: recipient.id,
          name: recipient.name,
          street: recipient.street,
          number: recipient.number,
          complement: recipient.complement,
          state: recipient.state,
          city: recipient.city,
          cep: recipient.cep,
        };
      });

      setTableData(data);
      setLoading(false);
    }
    loadRemetentes();
  }, [search]);

  async function handleDelete(id) {
    dispatch(recipientDelete(id));
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
        <Title>Gerenciando Detinatários</Title>
        <ContentHeader>
          <Searchbox
            htmlFor="buscar"
            onChange={e => handleSearch(e.target.value)}
          >
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

        {tableData.length ? (
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
              {tableData.map(destinatario => (
                <tr key={destinatario.id.toString()}>
                  <td>#{destinatario.id}</td>
                  <td>{destinatario.name}</td>
                  <td>
                    {destinatario.street}, {destinatario.number} -{' '}
                    {destinatario.city} - {destinatario.state}
                  </td>
                  <td>
                    <Acoes
                      onMouseEnter={() => handleSetVisible(destinatario.id)}
                      onMouseLeave={() => handleSetInvisible()}
                    >
                      <FaEllipsisH />
                      <Dropdown
                        visible={visible && visible === destinatario.id}
                      >
                        <DropdownItem>
                          <Link to={`/editar/destinatario/${destinatario.id}`}>
                            <FaPen color="#4D85EE" />
                            <div>Editar</div>
                          </Link>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleSetModalVisible(destinatario.id)}
                        >
                          <span>
                            <FaTrash color="#DE3B3B" />
                            <div>Excluir</div>
                          </span>
                        </DropdownItem>
                      </Dropdown>
                    </Acoes>

                    <Modal
                      id={destinatario.id}
                      visible={modalVisible && modalVisible === destinatario.id}
                    >
                      <div className="modal-body">
                        <div className="modal-header">
                          <FaTimes onClick={() => handleSetModalInvisible()} />
                        </div>
                        <h2>Aviso</h2>
                        Você tem certeza que quer apagar o destinatario{' '}
                        <b>{destinatario.name}</b>?
                        <div className="modal-footer">
                          <PrimaryButton
                            onClick={() => handleDelete(destinatario.id)}
                          >
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
        ) : (
          <PageWarn>
            {loading ? 'Carregando' : 'Nenhum dado encontrado'}
          </PageWarn>
        )}
      </Content>
    </>
  );
}
