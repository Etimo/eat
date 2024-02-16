import {Activity} from 'shared/types';
import {db} from '../firebase';

export const activityTypeList = async () => {
    
    const activityTypesDb = db.collection('activity-types');

    const activityTypeCollection = await activityTypesDb.get();

    const activities = activityTypeCollection.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, ...data} as Activity
    });

    return activities;
}

export const activityTypeData = async (id:string) => {

    const activityTypesDb = db.collection('activity-types');

    const activityTypeDoc = await activityTypesDb.doc(id).get();

    if(!activityTypeDoc.exists)
    {
        return null;
    }

    const data = activityTypeDoc.data();
    return { id, ...data} as Activity    
}