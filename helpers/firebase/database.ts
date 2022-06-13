import { child, Database, DatabaseReference, get, getDatabase, ref } from 'firebase/database'
import { DatabaseRoomData } from '../../@types/api'
import app from './app'

class RealTDB{
    db: Database = getDatabase(app)
    dbRef: DatabaseReference = ref(this.db)

    async getRoomOnce(room_id: string): Promise<DatabaseRoomData | ErrorOnCode>{
        var result: DatabaseRoomData | ErrorOnCode;

        try {
            var snapshot = await get(child(this.dbRef, `rooms/${room_id}`))
            if (snapshot.exists()){
                result = snapshot.val();
            }
            else{
                result = {
                    error: true, errorCod: -255,
                    errorDesc: `No data or no room with code ${room_id} 👻`
                }
            }
            
        } catch (err) {
            result = {
                error: true, errorCod: -64,
                errorDesc: `${err}`
            }
        }

        return result;
    }
}

export default RealTDB;
