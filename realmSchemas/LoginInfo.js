import {Realm} from '@realm/react';

export default class LoginInfo extends Realm.Object {
    static schema = {
        name: 'LoginInfo',
        properties: {
            username: 'string',
            password: 'string'
        },
        primaryKey: 'username'
    }
}