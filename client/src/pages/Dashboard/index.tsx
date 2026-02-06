import { useAuth } from "../../contexts/authContext"
import LogOutButton from "../../components/LogOutButton"
import ImagesToPdfPageButton from "../../components/ImagesToPdfPageButton"
import DeleteAccountButton from "../../components/DeleteAccount"
import { MergePdfsButton } from "../../components/MergePdfsButton"
import { DeleteAccountPopUpBox } from "../../components/DeleteAccountPopUpBox"
import { useShowPopUp } from "../../store/ShowPopUp"
export default function Dashboard() {

    const { user } = useAuth()
    const { show } = useShowPopUp();

    return (

        <div>
            {!user?.is_verified && (
                <p className="text-amber-600 text-sm bg-yellow-100 p-3 rounded-2xl">
                    Please verify your account otherwise you won't be able to access all the features of app
                </p>
            )}
            <div> 
                Protected Route Dashboard
            </div>
            <div>
                Welcome, {user?.email}
            </div>
            <LogOutButton />
            <DeleteAccountButton />
            <ImagesToPdfPageButton />
            <MergePdfsButton />

            {show && (
                <DeleteAccountPopUpBox />
            )}
        </div>

    )
}
