create database sistema_matricula_db;

use sistema_matricula_db;

create table administrador
(
    id_administrador int auto_increment
        primary key,
    nombres          varchar(40)  not null,
    apellidos        varchar(40)  not null,
    username         varchar(40)  not null,
    password         varchar(100) not null
);

create table alumno
(
    id_alumno int auto_increment
        primary key,
    nombres   varchar(40)  not null,
    apellidos varchar(40)  not null,
    username  varchar(40)  not null,
    password  varchar(100) not null
);

create table curso
(
    id_curso         int auto_increment
        primary key,
    codigo_curso     varchar(10) not null,
    nombre           varchar(40) not null,
    nivel            int         not null,
    requisito        varchar(10) null,
    id_creador_curso int         not null,
    constraint id_creador_curso
        foreign key (id_creador_curso) references administrador (id_administrador)
);

create table profesor
(
    id_profesor    int auto_increment
        primary key,
    nombres        varchar(40) not null,
    apellidos      varchar(40) not null,
    username       varchar(40) not null,
    password       varchar(40) not null,
    estado         tinyint(1)  not null,
    id_autorizante int         null,
    constraint id_autorizante
        foreign key (id_autorizante) references administrador (id_administrador)
);

create table horario
(
    id_horario        int auto_increment
        primary key,
    dia_semana        varchar(15) not null,
    hora_inicio       time        not null,
    hora_final        time        not null,
    id_profesor_cargo int         not null,
    id_curso          int         not null,
    constraint id_curso
        foreign key (id_curso) references curso (id_curso),
    constraint id_profesor_cargo
        foreign key (id_profesor_cargo) references profesor (id_profesor)
);

create table alumno_horario
(
    id_alumno_horario int auto_increment
        primary key,
    id_alumn          int not null,
    id_hora           int not null,
    constraint id_alumn
        foreign key (id_alumn) references alumno (id_alumno),
    constraint id_hora
        foreign key (id_hora) references horario (id_horario)
);

create table tema
(
    id_tema            int auto_increment
        primary key,
    nombre             varchar(40) not null,
    descripcion        text        not null,
    id_curso_pertenece int         not null,
    constraint id_curso_pertenece
        foreign key (id_curso_pertenece) references curso (id_curso)
);

create table ficha_nota
(
    id_ficha_nota    int auto_increment
        primary key,
    nota_final       int null,
    nota_eva_oral    int null,
    nota_eva_escrita int null,
    id_tema          int not null,
    id_alumno        int not null,
    constraint id_alumno
        foreign key (id_alumno) references alumno (id_alumno),
    constraint id_tema
        foreign key (id_tema) references tema (id_tema)
);

create table nota_exposicion
(
    id_nota_exposicion int auto_increment
        primary key,
    puntos_tiempo      int null,
    puntos_hab_comu    int null,
    puntos_estructura  int null,
    puntos_contenido   int null,
    id_ficha_nota      int null,
    constraint id_ficha_nota
        foreign key (id_ficha_nota) references ficha_nota (id_ficha_nota)
);

