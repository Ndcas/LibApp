import {Realm} from '@realm/react';

export default class SearchData extends Realm.Object {
    static schema = {
        name: 'SearchData',
        properties: {
            searchValue: 'string',
            times: {
                type: 'int',
                default: 1
            }
        },
        primaryKey: 'searchValue'
    }
}