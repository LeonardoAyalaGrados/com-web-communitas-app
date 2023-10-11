export interface UserPage {
    content:          User[];
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

export interface User {
    idUsuario:   number | null;
    nombre:      string;
    apellido:    string;
    fullName:    null | string;
    celular:     number;
    email:       string | null;
    contraseña:  string | null;
    rol:         string;
    direccion:   string;
    creadoEn:   Date;
    actualizadoEn:   Date | null;
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