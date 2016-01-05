import {Document} from "../../../src/decorator/Document";
import {Field} from "../../../src/decorator/Field";
import {RelationWithMany} from "../../../src/decorator/RelationWithMany";
import {ObjectIdField} from "../../../src/decorator/ObjectIdField";
import {ArrayField} from "../../../src/decorator/ArrayField";
import {Post} from "./Post";
import {ObjectID} from "mongodb";

@Document('sample7-post-category')
export class PostCategory {

    @ObjectIdField()
    id: ObjectID;

    @Field()
    name: string;

    @RelationWithMany(type => Post)
    posts: Post[] = [];

}