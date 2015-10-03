import {FieldMetadata} from "../metadata-builder/metadata/FieldMetadata";
import {IndexSchema} from "./IndexSchema";

/**
 * Field schema represents a document's field structure and properties.
 */
export class FieldSchema {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private _name: string;
    private _propertyName: string;
    private _type: string|Function;
    private _isId: boolean;
    private _isArray: boolean;
    private _isCreateDate: boolean;
    private _isUpdateDate: boolean;
    private _index: IndexSchema;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(name: string,
                type: string|Function,
                propertyName: string,
                isId: boolean,
                isArray: boolean,
                isCreateDate: boolean,
                isUpdateDate: boolean,
                index: IndexSchema) {

        this._name = name;
        this._type = type;
        this._propertyName = propertyName;
        this._isId = isId;
        this._isArray = isArray;
        this._isCreateDate = isCreateDate;
        this._isUpdateDate = isUpdateDate;
        this._index = index;
    }

    // -------------------------------------------------------------------------
    // Getter Methods
    // -------------------------------------------------------------------------

    get name(): string {
        return this._name;
    }

    get propertyName(): string {
        return this._propertyName;
    }

    get type(): string|Function {
        return this._type;
    }

    get isId(): boolean {
        return this._isId;
    }

    get isArray(): boolean {
        return this._isArray;
    }

    get isCreateDate(): boolean {
        return this._isCreateDate;
    }

    get isUpdateDate(): boolean {
        return this._isUpdateDate;
    }

    get index(): IndexSchema {
        return this._index;
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    isTypePrimitive(): boolean {
        return typeof this._type === 'string';
    }

    isTypeDocument(): boolean {
        return this._type instanceof Function;
    }


}