export class Project {

/*
{"_id":{"$oid":"61f0136b0461ea71eca36773"},
"name":"Blog",
"description":"Blog Personal",
"category":"Informàtica",
"langs":["html"],
"year":2020,
"image":"GSJ5t22BCOXqcJDXBO9GaGZ_.png"}
*/

    //propietats idem BBDD
    constructor (
        public _id: string,
        public name: string,
        public description: string,
        public category: string,
        public langs: [String],
        public year: number,
        public image: string,
    ) {}

}