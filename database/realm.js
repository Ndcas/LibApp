import realm from 'realm';
import SearchDataSchema from '../realmSchemas/realm/SearchData';

export default new realm.Realm({
    schema: [SearchDataSchema]
});