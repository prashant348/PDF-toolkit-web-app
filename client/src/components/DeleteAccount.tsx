import { useShowPopUp } from "../store/ShowPopUp"

export default function DeleteAccountButton(

) {

    const { setShow } = useShowPopUp();

    return (
        <button
            onClick={() => setShow(true)}
            className="border cursor-pointer"
        >
            Delete Account
        </button>
    )
}
