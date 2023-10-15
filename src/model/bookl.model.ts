export interface BookPage {
    content:          Book[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Book {
    idLibro:   number | null;
    titulo:      string;
    descripcion:    string| null;
    precio:    number | null;
    imagen:     string | null;
    stock:       number | null;
    autor:  string | null;
    tapa:         string| null;
    creadoEn:    Date;
    actualizadoEn:   Date | null;
    paginas:   number | null;
    anio:  number | null ;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}