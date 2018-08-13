import * as NetworkApi from 'lib/dockerApi/network';
import Joi from 'joi';

export const getNetworkList = async ctx => {
  const { endpoint: { url } } = ctx.state.user;
  try {
      const data = await NetworkApi.getNetworkList(url);
      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}

export const getNetworkInfo = async ctx => {
  const { endpoint: { url } } = ctx.state.user;
  const { id } = ctx.params;
  try {
      const data = await NetworkApi.getNetworkInfo(url, id);
      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}

export const getNetworkInspectRaw = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;
    try {
        const { data } = await NetworkApi.getNetworkInspectRaw({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const deleteNetwork = async ctx => {
  const { endpoint: {url} } = ctx.state.user;
  const { id } = ctx.params;

  try {
      const { data } = await NetworkApi.deleteNetwork({url, id});
      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}


// need to fix
export const addNetwork = async ctx => {
  const { endpoint: {url} } = ctx.state.user;
  const body = ctx.request.body;

  try {
    const { data }  = await NetworkApi.addNetwork(url);
    ctx.status = 201;
    ctx.body = { result: data };
  } catch(e) {
    ctx.throw(e, 500);
  }
}
