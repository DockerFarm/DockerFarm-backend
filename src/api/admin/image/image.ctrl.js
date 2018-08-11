import * as ImageApi from 'lib/dockerApi/image';
import * as utility from 'lib/utility/utility';

export const getImageList = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    try {
        const data = await ImageApi.getImageList(url);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getImageInfo = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const data = await ImageApi.getImageInfo({url, id});
        const history = await ImageApi.getImageHistory({url, id});
        ctx.status = 200;
        ctx.body = { result: { data, history } };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getImageInspectRaw = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const { data } = await ImageApi.getImageInspectRaw({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const pullImage = async ctx => {
  const { endpoint: {url} } = ctx.state.user;
  const { image, tag } = utility.extractNameAndTag(ctx.request.body);

  try {
      const { data } = await ImageApi.pullImage({url, image, tag});
      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}

export const tagImage = async ctx => {
  const { endpoint: {url} } = ctx.state.user;
  const { id } = ctx.params;
  const { repo, tag } = utility.extractRepoAndTag(ctx.request.body);

  try {
    const { data } = await ImageApi.tagImage({url, id, repo, tag});
    ctx.status = 200;
    ctx.body = { result: data };
  } catch(e) {
    ctx.throw(e, 500);
  }
}

export const deleteImage = async ctx => {
  const { endpoint: {url} } = ctx.state.user;
  const { id } = ctx.params;

  try {
      const { data } = await ImageApi.deleteImage({url, id});
      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}
