import * as chai from "chai";
import {expect} from "chai";
import * as sinon from "sinon";
import {Field} from "../../../src/annotation/Field";
import {defaultMetadataStorage} from "../../../src/metadata-builder/MetadataStorage";
import {WrongAnnotationUsageException} from "../../../src/annotation/exception/WrongAnnotationUsageException";
import {WrongFieldTypeException} from "../../../src/annotation/exception/WrongFieldTypeException";

chai.should();
chai.use(require("sinon-chai"));

describe('Field Annotation', function() {

    class TestClass {
        someProperty: string;
    }

    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------

    it('should throw exception if annotation is set to non-property', function () {
        expect(() => Field()(null, 'abc')).to.throw(WrongAnnotationUsageException);
        expect(() => Field()(new TestClass(), null)).to.throw(WrongAnnotationUsageException);
    });

    it('should throw exception if type in function is not given or is not correct', sinon.test(function () {
        let object = new TestClass();
        let nullInFunction = (type: any): any => null;
        let somethingInFunction = (type: any) => 'not-number';
        expect(() => Field(nullInFunction)(object, 'someProperty')).to.throw(WrongFieldTypeException);
        expect(() => Field(somethingInFunction)(object, 'someProperty')).to.throw(WrongFieldTypeException);
    }));

    it('should add a new field metadata to the metadata storage', sinon.test(function () {
        var addFieldMetadata = this.mock(defaultMetadataStorage).expects('addFieldMetadata');
        let object = new TestClass();

        Field()(object, 'someProperty');
        addFieldMetadata.should.have.been.calledWithMatch({
            object: object,
            name: undefined,
            isId: false,
            isArray: false,
            isAutoGenerated: false,
            isCreateDate: false,
            isUpdateDate: false,
            propertyName: 'someProperty'
        });
    }));

    it('should add a new metadata with specific name if name is given', sinon.test(function () {
        var addFieldMetadata = this.mock(defaultMetadataStorage).expects('addFieldMetadata');
        let object = new TestClass();

        Field('my_property')(object, 'someProperty');
        addFieldMetadata.should.have.been.calledWithMatch({
            object: object,
            name: 'my_property',
            isId: false,
            isArray: false,
            isAutoGenerated: false,
            isCreateDate: false,
            isUpdateDate: false,
            propertyName: 'someProperty'
        });
    }));

    it('should add a new metadata with specific type if type is given', sinon.test(function () {
        var addFieldMetadata = this.mock(defaultMetadataStorage).expects('addFieldMetadata');
        let object = new TestClass();
        let typeInFunction = (type: any) => TestClass;

        Field(null, typeInFunction)(object, 'someProperty');
        addFieldMetadata.should.have.been.calledWithMatch({
            object: object,
            name: undefined,
            type: typeInFunction,
            isId: false,
            isArray: false,
            isAutoGenerated: false,
            isCreateDate: false,
            isUpdateDate: false,
            propertyName: 'someProperty'
        });
    }));

    it('should add a new metadata with specific type in the function if its given', sinon.test(function () {
        var addFieldMetadata = this.mock(defaultMetadataStorage).expects('addFieldMetadata');
        let object = new TestClass();
        let typeInFunction = (type: any) => TestClass;

        Field(typeInFunction)(object, 'someProperty');
        addFieldMetadata.should.have.been.calledWithMatch({
            object: object,
            name: undefined,
            type: typeInFunction,
            isId: false,
            isArray: false,
            isAutoGenerated: false,
            isCreateDate: false,
            isUpdateDate: false,
            propertyName: 'someProperty'
        });
    }));

});
