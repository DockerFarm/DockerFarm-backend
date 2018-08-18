import { getRepoList } from 'lib/dockerHub'

export const getLibraryList = async ctx => {
  const { page, page_size } = ctx.request.query;
  try {
      const data = await getRepoList(page, page_size);
      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}
