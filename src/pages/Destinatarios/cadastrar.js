import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';

import { recipientPost } from '~/store/modules/recipient/actions';

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

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O campo nome é obrigatório')
    .min(6, 'Este campo precisa ter pelo menos 6 caracteres'),
  street: Yup.string().required('Este campo é obrigatório'),
  number: Yup.string().required('Este campo é obrigatório'),
  state: Yup.string().required('Este campo é obrigatório'),
  city: Yup.string().required('Este campo é obrigatório'),
  cep: Yup.string().required('Este campo é obrigatório'),
});

export default function Destinatarios() {
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    dispatch(recipientPost(data));
  }

  return (
    <>
      <Header />
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <ContentHeader>
            <Title>Cadastro de Destinatário</Title>
            <Col>
              <Link to="/destinatarios">
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
            <div className="full-width">
              <label htmlFor="name">Nome</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Ludwig van Beethoven"
              />
            </div>

            <div className="full-width">
              <label htmlFor="street">Rua</label>
              <Input
                type="text"
                id="street"
                name="street"
                placeholder="Rua Beethoven"
              />
            </div>

            <div className="full-width">
              <label htmlFor="number">Número</label>
              <Input type="text" id="number" name="number" placeholder="1729" />
            </div>

            <div className="full-width">
              <label htmlFor="complement">Complemento</label>
              <Input type="text" id="complement" name="complement" />
            </div>

            <div className="full-width">
              <label htmlFor="city">Cidade</label>
              <Input type="text" id="city" name="city" placeholder="Diadema" />
            </div>

            <div className="full-width">
              <label htmlFor="state">Estado</label>
              <Input
                type="text"
                id="state"
                name="state"
                placeholder="São Paulo"
              />
            </div>

            <div className="full-width">
              <label htmlFor="cep">CEP</label>
              <Input type="text" id="cep" name="cep" placeholder="09960-580" />
            </div>
          </Container>
        </Form>
      </Content>
    </>
  );
}
