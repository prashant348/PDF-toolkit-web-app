import { useShowPopUp } from "../store/ShowPopUp"
import { useAuth } from "../contexts/authContext";
export function DeleteAccountPopUpBox() {
    
    const { setShow } = useShowPopUp();
    const { deleteAccount } = useAuth();

    return (
        <div 
            className="pop-up-box-wrapper w-full h-full fixed top-0 left-0 bg-transparent flex justify-center items-center"
            onClick={() => setShow(false)}
        >   
            <div 
                className="pop-up-box w-60 h-40 border flex flex-col justify-center items-center gap-4 bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <p>Are you sure you want to delete your account?</p>
                <div className="flex justify-between">
                    <button 
                        className="border cursor-pointer"
                        onClick={() => setShow(false)}
                    >   
                        Cancel
                    </button>
                    <button 
                        className="border bg-red-500 text-white cursor-pointer"
                        onClick={deleteAccount}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}