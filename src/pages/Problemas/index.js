import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  FaEllipsisH,
  FaEye,
  FaTrash,
  FaTimes,
  FaSpinner,
} from 'react-icons/fa';

import { problemCancel } from '~/store/modules/problem/actions';

import api from '~/services/api';

import Header from '~/components/Header/';

import {
  Content,
  Title,
  PageWarn,
  Acoes,
  Dropdown,
  DropdownItem,
  Modal,
  Loading,
} from '~/styles/dashboard';

export default function Problemas() {
  const [tableData, setTableData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProblemas() {
      setLoading(true);

      const response = await api.get('/delivery/problems');

      const data = response.data.map(recipient => {
        return {
          id: recipient.id,
          id_encomenda: recipient.delivery_id,
          description: recipient.description,
        };
      });

      setTableData(data);
      setLoading(false);
    }
    loadProblemas();
  }, []);

  async function handleDelete(id) {
    dispatch(problemCancel(id));
    setTableData(tableData.filter(del => del.id !== id));
  }

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
      <Loading inLoad={loading}>
        <FaSpinner className="fa-spin" />
      </Loading>
      <Header />
      <Content>
        <Title>Problemas na entrega</Title>

        {tableData.length ? (
          <table>
            <thead>
              <tr>
                <th>Encomenda</th>
                <th>Problema</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map(problema => (
                <tr>
                  <td>#{problema.id_encomenda}</td>
                  <td>{problema.description}</td>
                  <td>
                    <Acoes
                      onMouseEnter={() => handleSetVisible(problema.id)}
                      onMouseLeave={() => handleSetInvisible()}
                    >
                      <FaEllipsisH />
                      <Dropdown visible={visible && visible === problema.id}>
                        <DropdownItem
                          onClick={() => handleSetModalVisible(problema.id)}
                        >
                          <span>
                            <FaEye color="#4D85EE" />
                            <div>Visualizar</div>
                          </span>
                        </DropdownItem>
                        <DropdownItem onClick={() => handleDelete(problema.id)}>
                          <span>
                            <FaTrash color="#DE3B3B" />
                            <div>Cancelar</div>
                          </span>
                        </DropdownItem>
                      </Dropdown>
                    </Acoes>
                    <Modal
                      id={problema.id}
                      visible={modalVisible && modalVisible === problema.id}
                    >
                      <div className="modal-body">
                        <div className="modal-header">
                          <FaTimes onClick={() => handleSetModalInvisible()} />
                        </div>
                        <h2>VISUALIZAR PROBLEMA</h2>
                        <p>{problema.description}</p>
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
