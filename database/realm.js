import realm from 'realm';
import SearchDataSchema from '../realmSchemas/SearchData';

export default new realm.Realm({
    schema: [SearchDataSchema]
});