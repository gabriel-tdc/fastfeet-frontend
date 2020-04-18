import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  FaPlus,
  FaEllipsisH,
  FaEye,
  FaPen,
  FaTrash,
  FaSearch,
  FaTimes,
  FaSpinner,
} from 'react-icons/fa';

import { deliveryDelete } from '~/store/modules/delivery/actions';

import api from '~/services/api';

import Header from '~/components/Header/';

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

export default function Encomendas() {
  const [tableData, setTableData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDelVisible, setModalDelVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadEncomendas() {
      setLoading(true);

      let params = null;
      if (search) {
        params = {
          q: search,
        };
      } else {
        params = {};
      }

      const response = await api.get('/delivery', { params });

      const data = response.data.map(delivery => {
        let status = 1;
        if (delivery.canceled_at) {
          status = 4;
        } else if (delivery.end_date) {
          status = 3;
        } else if (delivery.start_date) {
          status = 2;
        }

        return {
          id: delivery.id,
          product: delivery.product,
          name: delivery.recipients.name,
          deliveryman: delivery.deliveryman.name,
          avatar:
            delivery.deliveryman.avatar && delivery.deliveryman.avatar.path,
          status,
          signature: delivery.signatures && delivery.signatures.path,

          street: delivery.recipients.street,
          number: delivery.recipients.number,
          complement: delivery.recipients.complement,
          state: delivery.recipients.state,
          city: delivery.recipients.city,
          cep: delivery.recipients.cep,

          retirada: delivery.start_date,
          entrega: delivery.end_date,
        };
      });

      setTableData(data);
      setLoading(false);
    }
    loadEncomendas();
  }, [search]);

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

  function handleSetModalDelVisible(key) {
    setModalDelVisible(key);
  }
  function handleSetModalDelInvisible() {
    setModalDelVisible(false);
  }

  function setStatusDelivery(status, type) {
    let data = [];
    switch (status) {
      case 2:
        data = ['RETIRADA', 'info'];
        break;
      case 3:
        data = ['ENTREGUE', 'success'];
        break;
      case 4:
        data = ['CANCELADA', 'danger'];
        break;
      default:
        data = ['PENDENTE', 'warning'];
    }
    return data[type];
  }

  // Search
  function handleSearch(e) {
    setSearch(e);
  }

  async function handleDelete(id) {
    dispatch(deliveryDelete(id));
    setTableData(tableData.filter(del => del.id !== id));
  }

  return (
    <>
      <Loading inLoad={loading}>
        <FaSpinner className="fa-spin" />
      </Loading>
      <Header />
      <Content>
        <Title>Gerenciando Encomendas</Title>
        <ContentHeader>
          <Searchbox
            htmlFor="buscar"
            onChange={e => handleSearch(e.target.value)}
          >
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

        {tableData.length ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Destinatário</th>
                <th>Entregador</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map(encomenda => (
                <tr key={encomenda.id.toString()}>
                  <td>#{encomenda.id}</td>
                  <td>{encomenda.product}</td>
                  <td>{encomenda.name}</td>
                  <td>
                    <img
                      src={
                        encomenda.avatar
                          ? `http://localhost:3333/files/${encomenda.avatar}`
                          : `https://ui-avatars.com/api/?name=${encomenda.deliveryman}`
                      }
                      className="avatar"
                      alt="Avatar"
                    />
                    {encomenda.deliveryman}
                  </td>
                  <td>{encomenda.city}</td>
                  <td>{encomenda.state}</td>
                  <td>
                    <div
                      className={`badge ${setStatusDelivery(
                        encomenda.status,
                        1
                      )}`}
                    >
                      {setStatusDelivery(encomenda.status, 0)}
                    </div>
                  </td>
                  <td>
                    <Acoes
                      onMouseEnter={() => handleSetVisible(encomenda.id)}
                      onMouseLeave={() => handleSetInvisible()}
                    >
                      <FaEllipsisH />
                      <Dropdown visible={visible && visible === encomenda.id}>
                        {encomenda.status === 3 && (
                          <DropdownItem
                            onClick={() => handleSetModalVisible(encomenda.id)}
                          >
                            <span>
                              <FaEye color="#8E5BE8" />
                              <div>Visualizar</div>
                            </span>
                          </DropdownItem>
                        )}
                        <DropdownItem>
                          <Link to={`/editar/encomenda/${encomenda.id}`}>
                            <FaPen color="#4D85EE" />
                            <div>Editar</div>
                          </Link>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleSetModalDelVisible(encomenda.id)}
                        >
                          <span>
                            <FaTrash color="#DE3B3B" />
                            <div>Excluir</div>
                          </span>
                        </DropdownItem>
                      </Dropdown>
                    </Acoes>

                    <Modal
                      id={encomenda.id}
                      visible={
                        modalDelVisible && modalDelVisible === encomenda.id
                      }
                    >
                      <div className="modal-body">
                        <div className="modal-header">
                          <FaTimes
                            onClick={() => handleSetModalDelInvisible()}
                          />
                        </div>
                        <h2>Aviso</h2>
                        Você tem certeza que quer apagar o a encomenda de{' '}
                        <b>{encomenda.name}</b>?
                        <div className="modal-footer">
                          <PrimaryButton
                            onClick={() => handleDelete(encomenda.id)}
                          >
                            Apagar
                          </PrimaryButton>
                          <SecondaryButton onClick={handleSetModalDelInvisible}>
                            Cancelar
                          </SecondaryButton>
                        </div>
                      </div>
                    </Modal>

                    <Modal
                      id={encomenda.id}
                      visible={modalVisible && modalVisible === encomenda.id}
                    >
                      <div className="modal-body">
                        <div className="modal-header">
                          <FaTimes onClick={() => handleSetModalInvisible()} />
                        </div>
                        <h2>Informações da encomenda</h2>
                        <p>
                          {encomenda.street}, {encomenda.number} <br />
                          {encomenda.city} - {encomenda.state} <br />
                          {encomenda.complement} <br />
                          {encomenda.cep}
                        </p>

                        <hr />

                        <h2>Datas</h2>
                        <p>
                          <b>Retirada:</b>{' '}
                          {format(
                            new Date(encomenda.retirada),
                            "d'/'MM'/'yyyy",
                            {
                              locale: pt,
                            }
                          )}{' '}
                          <br />
                          <b>Entrega:</b>{' '}
                          {format(
                            new Date(encomenda.entrega),
                            "d'/'MM'/'yyyy",
                            {
                              locale: pt,
                            }
                          )}{' '}
                        </p>

                        <hr />

                        <h2>Assinatura do destinatário</h2>
                        <div className="center">
                          <img
                            src={`http://localhost:3333/files/${encomenda.signature}`}
                            alt="Assinatura"
                            className="assinatura"
                          />
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
