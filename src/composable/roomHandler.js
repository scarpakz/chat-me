import axios from 'axios'
import { reactive } from 'vue'
import { useRoom } from '@/store/room';
import { useSessionStore } from '@/store/sessionStore';

export default function roomHandler() {

    const checkAndCreateRoom = async (room_name) => {
        let responseMessage = reactive({})

        await axios.get('http://localhost:3000/api/v1/room')
        .then(async (response) => {
            const rooms = response.data
            const getCurrentRoom = rooms.find(item => item.name === room_name.value)

            if (!getCurrentRoom) { // create room if not existing
                await axios.post('http://localhost:3000/api/v1/create/room', {room_name: room_name.value})
                .then(async () => {
                    responseMessage = await checkAndCreateActiveRoom(room_name)
                })
                .catch((e) => console.log(e))
            } else {
                checkAndCreateActiveRoom(room_name)
            }
        })
        return responseMessage
    }

    const checkAndCreateActiveRoom = async (room_name) => {
        const ur = useRoom()
        const uss = useSessionStore()
        let data = reactive({})

        await axios.get('http://localhost:3000/api/v1/room')
        .then(async (response) => {
            const rooms = response.data
            const getCurrentRoom = rooms.find(item => item.name === room_name.value)

            if (getCurrentRoom) {
                await axios.post('http://localhost:3000/api/v1/create/active_room', { user_id: uss.user.id, room_id: getCurrentRoom.id })
                .then(() => {
                    ur.room.id = getCurrentRoom.id
                    ur.room.name = getCurrentRoom.name
                    data = { room_id: getCurrentRoom.id, status: 200 }
                })
                .catch((e) => {
                    console.log(e)
                    return 404
                })
            }
        })

        return data
    }

    return {
        checkAndCreateRoom,
        checkAndCreateActiveRoom
    }
}