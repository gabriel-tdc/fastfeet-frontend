import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  deliveryPostSuccess,
  deliveryPostFailure,
  deliveryUpdateSuccess,
  deliveryUpdateFailure,
  deliveryDeleteSuccess,
  deliveryDeleteFailure,
} from './actions';

export function* deliveryPost({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, '/delivery', data);

    toast.success('Encomenda cadastrada com sucesso!');

    yield put(deliveryPostSuccess());

    history.push('/encomendas');
  } catch (err) {
    toast.error('Erro ao cadastrar encomenda ');
    yield put(deliveryPostFailure());
  }
}

export function* deliveryUpdate({ payload }) {
  try {
    const { data, id } = payload;

    yield call(api.put, `delivery/${id}`, data);

    toast.success('Encomenda atualizado com sucesso!');

    yield put(deliveryUpdateSuccess());

    history.push('/encomendas');
  } catch (err) {
    toast.error('Erro ao alterar encomenda');
    yield put(deliveryUpdateFailure());
  }
}

export function* deliveryDelete({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `delivery/${id}`);

    const data = yield call(api.get, 'delivery');

    toast.success('Encomenda removida com sucesso!');

    yield put(deliveryDeleteSuccess(data));

    history.push('/encomendas');
  } catch (err) {
    toast.error('Erro ao remover encomenda!');
    yield put(deliveryDeleteFailure());
  }
}

export default all([
  takeLatest('@delivery/DELIVERY_POST', deliveryPost),
  takeLatest('@delivery/DELIVERY_UPDATE', deliveryUpdate),
  takeLatest('@delivery/DELIVERY_DELETE', deliveryDelete),
]);
