import * as VolumeApi from 'lib/dockerApi/volume';
import Joi from 'joi';


export const getVolumeList = async ctx => {
  const { endpoint: { url } } = ctx.state.user;
  try {
      const data  = await VolumeApi.getVolumeList(url);
      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}

export const getVolumeInfo = async ctx => {
  const { endpoint: { url } } = ctx.state.user;
  const { id } = ctx.params;
  try {
      const data  = await VolumeApi.getVolumeInfo(url,id);
      const  container  = await VolumeApi.getVolumeRelateContainer(url,id);
      ctx.status = 200;
      ctx.body = { result: {data, container} };
  } catch(e) {
      ctx.throw(e, 500);
  }
}

export const getVolumeInspectRaw = async ctx => {
  const { endpoint: { url } } = ctx.state.user;
  const { id } = ctx.params;
  try {
      const { data } = await VolumeApi.getVolumeInspectRaw(url,id);

      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}

export const deleteVolume = async ctx => {
  const { endpoint: { url } } = ctx.state.user;
  const { id } = ctx.params;
  try {
      const { data } = await VolumeApi.deleteVolume(url,id);
      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}

export const createVolume = async ctx => {
  const { endpoint: { url } } = ctx.state.user;
  const form  = ctx.request.body;
  try {
      const { data } = await VolumeApi.createVolume(url, form);
      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}

export const getVolumeDriver = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
        try {
            const data = await VolumeApi.getVolumeDriver(url);
            ctx.status = 200;
            ctx.body = { result: data };
        } catch(e) {
            ctx.throw(e, 500);
        }
}
