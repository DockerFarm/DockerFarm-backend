import { getRepoList } from 'lib/dockerHub'

export const getLibraryList = async ctx => {
  const { page } = ctx.params;
  try {
      const data = await getRepoList(page);
      ctx.status = 200;
      ctx.body = { result: data };
  } catch(e) {
      ctx.throw(e, 500);
  }
}
