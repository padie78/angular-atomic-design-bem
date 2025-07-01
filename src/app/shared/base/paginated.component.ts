export abstract class PaginatedComponent<T> {
  currentPage: number = 1;
  pageSize: number = 10;

  abstract getItems(): T[];

  get paginated(): T[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.getItems().slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}