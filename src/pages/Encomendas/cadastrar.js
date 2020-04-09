import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import AsyncSelect from 'react-select/async';

import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { deliveryPost } from '~/store/modules/delivery/actions';

import Header from '~/pages/Template/Header/';

import {
  Content,
  Title,
  Container,
  ContentHeader,
  PrimaryButton,
  SecondaryButton,
  Col,
} from '~/styles/dashboard';

import api from '~/services/api';

const schema = Yup.object().shape({
  product: Yup.string()
    .required('Este campo é obrigatório')
    .min(6, 'O nome precisa ter pelo menos 6 caracteres'),
  recipient_id: Yup.string().required('Este campo é obrigatório'),
  deliveryman_id: Yup.string().required('Este campo é obrigatório'),
});

export default function CadastrarDestinatarios() {
  const [deliverymanData, setDeliverymanData] = useState([]);
  const [recipientData, setRecipientData] = useState([]);

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

  async function handleSubmit(data) {
    dispatch(deliveryPost(data));
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
    document.getElementById(name).value = value;
  }

  return (
    <>
      <Header />
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <ContentHeader>
            <Title>Cadastro de encomendas</Title>
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
                cacheOptions
                loadOptions={loadOptionsRecipient}
                defaultOptions={optionsRecipient}
                onChange={inputValue =>
                  setValue(inputValue.value, 'recipient_id')
                }
              />
              <Input type="hidden" name="recipient_id" id="recipient_id" />
            </div>

            <div>
              <label htmlFor="deliveryman">Entregador</label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptionsDeliveryman}
                defaultOptions={optionsDeliveryman}
                onChange={inputValue =>
                  setValue(inputValue.value, 'deliveryman_id')
                }
              />
              <Input type="hidden" name="deliveryman_id" id="deliveryman_id" />
            </div>

            <div className="full-width">
              <label htmlFor="product">Nome do produto</label>
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
