import router from './router';
import getQueryStringParams from '../shared/getQueryStringParams';
import seserializeParam from '../shared/serializeParam';
import serializeSearch from '../shared/serializeSearch';
import segments, {resetSegments} from './segments';

const paramsProxyHandler = {
  set(target, name, value) {
    const serializedValue = seserializeParam(value);
    target[name] = serializedValue;
    const search = serializeSearch(target);
    router.url = router.path + (search ? '?' : '') + search;
    return true;
  },
  get(target, name) {
    return target[name] || segments[name] || '';
  }
}

const params = {};

const proxy = new Proxy(params, paramsProxyHandler);

export function updateParams(query) {
  resetSegments();
  const delta = getQueryStringParams(query);
  for(const key of Object.keys({...delta, ...params})) {
    params[key] = delta[key];
  }
  return proxy;
}

export default proxy;