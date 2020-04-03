import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Encomendas from '~/pages/Encomendas';
import CadastroEncomendas from '~/pages/Encomendas/cadastrar';
import EditarEncomendas from '~/pages/Encomendas/editar';

import Entregadores from '~/pages/Entregadores';
import CadastroEntregadores from '~/pages/Entregadores/cadastrar';
import EditarEntregadores from '~/pages/Entregadores/editar';

import Destinatarios from '~/pages/Destinatarios';
import CadastrarDestinatarios from '~/pages/Destinatarios/cadastrar';
import EditarDestinatarios from '~/pages/Destinatarios/editar';

import Problemas from '~/pages/Problemas';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/encomendas" component={Encomendas} isPrivate />
      <Route
        path="/cadastrar/encomenda"
        component={CadastroEncomendas}
        isPrivate
      />
      <Route path="/editar/encomenda" component={EditarEncomendas} isPrivate />

      <Route path="/entregadores" component={Entregadores} isPrivate />
      <Route
        path="/cadastrar/entregador"
        component={CadastroEntregadores}
        isPrivate
      />
      <Route
        path="/editar/entregador/:id"
        component={EditarEntregadores}
        isPrivate
      />

      <Route path="/destinatarios" component={Destinatarios} isPrivate />
      <Route
        path="/cadastrar/destinatario"
        component={CadastrarDestinatarios}
      />
      <Route path="/editar/destinatario" component={EditarDestinatarios} />

      <Route path="/problemas" component={Problemas} isPrivate />
    </Switch>
  );
}
