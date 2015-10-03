import {defaultMetadataStorage} from "../../metadata-builder/MetadataStorage";
import {RelationTypeInFunction, PropertyTypeInFunction} from "../../metadata-builder/metadata/RelationMetadata";
import {BothJoinTypesUsedException} from "./../exception/BothJoinTypesUsedException";
import {WrongFieldTypeException} from "./../exception/WrongFieldTypeException";
import {WrongAnnotationUsageException} from "./../exception/WrongAnnotationUsageException";

/**
 * Options that can be used with RelationWithMany annotation.
 */
export interface RelationOptions {
    /**
     * If set to true then it means that related object can be allowed to be inserted to the db.
     */
    cascadeInsert?: boolean;

    /**
     * If set to true then it means that related object can be allowed to be updated in the db.
     */
    cascadeUpdate?: boolean;

    /**
     * If set to true then it means that related object can be allowed to be remove from the db.
     */
    cascadeRemove?: boolean;

    /**
     * If set to true then it means that related object always will be left-joined when this object is being loaded.
     */
    alwaysLeftJoin?: boolean;

    /**
     * If set to true then it means that related object always will be inner-joined when this object is being loaded.
     */
    alwaysInnerJoin?: boolean;
}