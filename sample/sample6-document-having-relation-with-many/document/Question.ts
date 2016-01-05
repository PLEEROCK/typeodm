import {Document} from "../../../src/decorator/Document";
import {Field} from "../../../src/decorator/Field";
import {RelationWithMany} from "../../../src/decorator/RelationWithMany";
import {ObjectIdField} from "../../../src/decorator/ObjectIdField";
import {Category} from "./Category";
import {ObjectID} from "mongodb";

@Document('sample6-question')
export class Question {

    @ObjectIdField()
    id: ObjectID;

    @Field()
    title: string;

    @Field()
    text: string;

    @RelationWithMany(type => Category, null, {
        cascadeInsert: true
    })
    categories: Category[] = [];

    constructor(title: string, text: string) {
        this.title = title;
        this.text  = text;
    }

}