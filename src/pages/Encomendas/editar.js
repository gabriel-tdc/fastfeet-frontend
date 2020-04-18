import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import AsyncSelect from 'react-select/async';

import { Form, Input } from '@rocketseat/unform';

import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { deliveryUpdate } from '~/store/modules/delivery/actions';

import api from '~/services/api';

import Header from '~/components/Header/';

import {
  Content,
  Title,
  Container,
  ContentHeader,
  PrimaryButton,
  SecondaryButton,
  Col,
} from '~/styles/dashboard';

export default function EditarEncomenda() {
  const [tableData, setData] = useState([]);
  const [deliverymanData, setDeliverymanData] = useState([]);
  const [recipientData, setRecipientData] = useState([]);
  const [recipientSelected, setRecipientSelected] = useState({});
  const [deliveryManSelected, setDeliveryManSelected] = useState({});
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get(`/recipients`);

      setRecipientData(response.data);
    }
    loadRecipient();
  }, []);

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get(`/deliveryman`);

      setDeliverymanData(response.data);
    }
    loadDeliveryman();
  }, []);

  useEffect(() => {
    async function loadEncomendas() {
      const response = await api.get(`/delivery/${id}`);

      setData(response.data);

      setRecipientSelected({
        label: `${response.data.recipients.name} (${response.data.recipients.city}, ${response.data.recipients.state})`,
        value: response.data.recipients.id,
      });
      setDeliveryManSelected({
        label: response.data.deliveryman.name,
        value: response.data.deliveryman.id,
      });
    }
    loadEncomendas();
  }, [id]);

  function handleSubmit(data) {
    // console.log(data);
    dispatch(deliveryUpdate(id, data));
  }

  const optionsRecipient = recipientData.map(data => {
    return {
      value: data.id,
      label: `${data.name} (${data.city} - ${data.state})`,
    };
  });

  const optionsDeliveryman = deliverymanData.map(data => {
    return { value: data.id, label: data.name };
  });

  const filterRecipient = useCallback(
    inputValue => {
      return optionsRecipient.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    },
    [optionsRecipient]
  );

  const filterDeliveryman = useCallback(
    inputValue => {
      return optionsDeliveryman.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    },
    [optionsDeliveryman]
  );

  const loadOptionsRecipient = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterRecipient(inputValue));
      }, 300);
    });

  const loadOptionsDeliveryman = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterDeliveryman(inputValue));
      }, 300);
    });

  function setValue(value, name) {
    if (name === 'recipient_id') {
      setRecipientSelected();
    } else {
      setDeliveryManSelected();
    }
    document.getElementById(name).value = value;
  }

  return (
    <>
      <Header />
      <Content>
        <Form onSubmit={handleSubmit} initialData={tableData}>
          <ContentHeader>
            <Title>Edição de Encomenda</Title>
            <Col>
              <Link to="/encomendas">
                <SecondaryButton>
                  <FaChevronLeft />
                  Voltar
                </SecondaryButton>
              </Link>
              <PrimaryButton type="submit">
                <FaCheck />
                Salvar
              </PrimaryButton>
            </Col>
          </ContentHeader>
          <Container>
            <div>
              <label htmlFor="recipient">Destinatário</label>
              <AsyncSelect
                value={recipientSelected}
                loadOptions={loadOptionsRecipient}
                defaultOptions={optionsRecipient}
                onChange={inputValue =>
                  setValue(inputValue.value, 'recipient_id')
                }
              />
              <Input
                type="text"
                name="recipient_id"
                id="recipient_id"
                class="hide"
              />
            </div>

            <div>
              <label htmlFor="deliveryman">Entregador</label>
              <AsyncSelect
                value={deliveryManSelected}
                loadOptions={loadOptionsDeliveryman}
                defaultOptions={optionsDeliveryman}
                onChange={inputValue =>
                  setValue(inputValue.value, 'deliveryman_id')
                }
              />
              <Input
                type="text"
                name="deliveryman_id"
                id="deliveryman_id"
                class="hide"
              />
            </div>

            <div className="full-width">
              <label htmlFor="nome_produto">Nome do produto</label>
              <Input
                type="text"
                id="product"
                name="product"
                placeholder="Yamaha SX7"
              />
            </div>
          </Container>
        </Form>
      </Content>
    </>
  );
}
