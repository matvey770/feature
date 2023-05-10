import AdminEntry from "./adminEntry/AdminEntry"
import AdminConsole from "./adminConsole/AdminConsole"

import { useState } from "react"


const AdminPanel = () => {
    const [entry, setEntry] = useState(false)

    return (
        !entry ? <AdminEntry entry={entry} setEntry={setEntry}/> : <AdminConsole entry={entry}/>
    )
}

export default AdminPanel