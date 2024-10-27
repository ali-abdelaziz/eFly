export interface Pagenator {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
  pageSizeOptions: number[];
  totalPages: number;
}
