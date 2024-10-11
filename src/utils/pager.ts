type Order = 'ASC' | 'DESC';

export default class Pager {
  private page: number;
  private perPage: number;
  private total: number = 0;
  private sort: string;
  private order: Order;

  constructor(page: number, perPage: number = 10, sort = '', order: Order = 'ASC') {
    this.page = page;
    this.perPage = perPage;
    this.sort = sort;
    this.order = order;
  }

  public getPage() {
    return this.page;
  }

  public getPerPage() {
    return this.perPage;
  }

  public getTotal() {
    return this.total;
  }

  public getSort() {
    return this.sort;
  }

  public getOrder() {
    return this.order;
  }

  public setPage(page: number) {
    this.page = page;
  }

  public setPerPage(perPage: number) {
    this.perPage = perPage;
  }

  public setTotal(total: number) {
    this.total = total;
  }

  public setSort(sort: string) {
    this.sort = sort;
  }

  public setOrder(order: Order) {
    this.order = order;
  }
}
