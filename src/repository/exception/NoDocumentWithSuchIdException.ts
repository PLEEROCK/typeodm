export class NoDocumentWithSuchIdException extends Error {

    constructor(id: any, collection: string) {
        super();
        this.message = 'Cannot find a ' + collection + ' document with given document id (' + id + '), has it been already removed?';
    }

}