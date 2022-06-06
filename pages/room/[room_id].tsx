import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";

const Room: NextPage = () => {
    const router: NextRouter = useRouter()
    const { room_id } = router.query

    return (
        <div>In room {room_id}</div>
    )

}
  
export default Room