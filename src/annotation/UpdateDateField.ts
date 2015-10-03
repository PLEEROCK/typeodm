import {defaultMetadataStorage} from "../metadata-builder/MetadataStorage";
import {WrongAnnotationUsageException} from "./exception/WrongAnnotationUsageException";

/**
 * For the fields that has this annotation will be generated a date and it will be updated every time document is updated.
 * Please note that "update" will work only in the case if repository#persist method is used to save document.
 */
export function UpdateDateField(name?: string) {
    return function (object: Object, propertyName: string) {

        if (!object || !propertyName || !object.constructor)
            throw new WrongAnnotationUsageException('UpdateDate', 'class property', object);

        defaultMetadataStorage.addFieldMetadata({
            object: object,
            name: name ? <string> name : undefined,
            type: type => 'date',
            isId: false,
            isAutoGenerated: false,
            isCreateDate: false,
            isUpdateDate: true,
            isArray: false,
            propertyName: propertyName
        });
    };
}