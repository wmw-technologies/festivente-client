import { Pager } from '@/src/types';

type Order = 'ASC' | 'DESC';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
const DEFAULT_SORT = '_id';
const DEFAULT_ORDER: Order = 'ASC';

export const ALLOWED_PER_PAGE = [10, 20, 50, 100];

export function getPager(searchParams: { [key: string]: string | string[] | undefined }, _sort?: string): Pager {
  const page = parseInt(searchParams.page as string) || DEFAULT_PAGE;
  let perPage = parseInt(searchParams.perPage as string) || DEFAULT_PER_PAGE;
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : (_sort ?? DEFAULT_SORT);
  const order: Order =
    searchParams.order === 'ASC' || searchParams.order === 'DESC' ? searchParams.order : DEFAULT_ORDER;

  if (!ALLOWED_PER_PAGE.includes(perPage)) perPage = DEFAULT_PER_PAGE;

  return {
    page,
    perPage,
    total: 0,
    sort,
    order
  };
}
