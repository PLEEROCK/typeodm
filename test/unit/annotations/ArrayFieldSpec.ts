import * as chai from "chai";
import {expect} from "chai";
import * as sinon from "sinon";
import {ArrayField} from "../../../src/decorator/Field";
import {defaultMetadataStorage} from "../../../src/metadata-builder/MetadataStorage";
import {WrongAnnotationUsageError} from "../../../src/decorator/error/WrongAnnotationUsageError";
import {WrongFieldTypeError} from "../../../src/decorator/error/WrongFieldTypeError";

chai.should();
chai.use(require("sinon-chai"));

describe('ArrayField Annotation', function() {

    class TestClass {
        someProperty: string;
    }

    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------

    it('should throw exception if annotation is set to non-property', function () {
        expect(() => ArrayField(type => 'string')(null, 'abc')).to.throw(WrongAnnotationUsageError);
        expect(() => ArrayField(type => 'number')(new TestClass(), null)).to.throw(WrongAnnotationUsageError);
    });

    it('should throw exception if type in function is not given or is not correct', sinon.test(function () {
        let object = new TestClass();
        let nullInFunction = (type: any): any => null;
        let somethingInFunction = (type: any) => 'not-number';
        expect(() => ArrayField(null)(object, 'someProperty')).to.throw(WrongFieldTypeError);
        expect(() => ArrayField(nullInFunction)(object, 'someProperty')).to.throw(WrongFieldTypeError);
        expect(() => ArrayField(somethingInFunction)(object, 'someProperty')).to.throw(WrongFieldTypeError);
    }));

    it('should add a new field metadata to the metadata storage', sinon.test(function () {
        var addFieldMetadata = this.mock(defaultMetadataStorage).expects('addFieldMetadata');
        let object = new TestClass();

        ArrayField(type => 'string')(object, 'someProperty');
        addFieldMetadata.should.have.been.calledWithMatch({
            object: object,
            name: undefined,
            isId: false,
            isObjectId: false,
            isArray: true,
            isAutoGenerated: false,
            isCreateDate: false,
            isUpdateDate: false,
            propertyName: 'someProperty'
        });
    }));

    it('should add a new metadata with specific name if name is given', sinon.test(function () {
        var addFieldMetadata = this.mock(defaultMetadataStorage).expects('addFieldMetadata');
        let object = new TestClass();
        let typeInFunction = (type: any) => 'string';

        ArrayField('my_property', typeInFunction)(object, 'someProperty');

        addFieldMetadata.should.have.been.calledWith({
            object: object,
            name: 'my_property',
            type: typeInFunction,
            isId: false,
            isObjectId: false,
            isArray: true,
            isAutoGenerated: false,
            isCreateDate: false,
            isUpdateDate: false,
            propertyName: 'someProperty'
        });
    }));

});
