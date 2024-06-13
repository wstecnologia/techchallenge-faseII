import Pagination from "./Pagination";

export default class PageResponse <T> {
    public items: T[]
    public pagination: Pagination
   
}