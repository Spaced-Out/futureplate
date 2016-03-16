import * as api from 'src/utils/api';
import parsers from 'src/api-parsers/index';


export function getIds(store) {
  const cacheKey = 'ids';
  const cacheTtl = 10 * 1000;
  if (!store.cache.expired(cacheKey, cacheTtl)) {
    return Promise.resolve();
  }

  const promise = api.get('things').then((response) => {
    response = parsers['things'](response);

    store.stores.ids.setState(response.ids);
    store.cache.set(cacheKey);
  });

  return promise;
}

export function getThing(store, params) {
  const { id = null } = params;

  const cacheKey = 'things' + id;
  const cacheTtl = 30 * 1000;
  if (!store.cache.expired(cacheKey, cacheTtl)) {
    return Promise.resolve();
  }

  const promise = api.get(`things/${id}`).then((response) => {
    response = parsers['things/<id>'](response);

    store.stores.things.setState({ [id]: response });
    store.cache.set(cacheKey);
  });

  return promise;
}

