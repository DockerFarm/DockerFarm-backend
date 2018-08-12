import * as ImageApi from 'lib/dockerApi/image';

const extractNameAndTag = (imageName, registry) => {
  /* imageName.image = post body value */
  const imageNameAndTag = imageName.image.split(':');
  let image = imageNameAndTag[0];
  const tag = imageNameAndTag[1] ? imageNameAndTag[1] : 'latest';
  if (registry) {
      image = registry + '/' + imageNameAndTag[0];
    }

    return {
      image: image,
      tag: tag
    };
}

const extractRepoAndTag = (tagName) => {
  const imageRepoAndTag = extractNameAndTag(tagName);

  return {
    repo: imageRepoAndTag.image,
    tag: imageRepoAndTag.tag
  };
}

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
  const { image, tag } = extractNameAndTag(ctx.request.body);

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
  const { repo, tag } = extractRepoAndTag(ctx.request.body);

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
