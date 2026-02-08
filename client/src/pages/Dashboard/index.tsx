import { useAuth } from "../../contexts/authContext"
import LogOutButton from "../../components/ui/LogOutButton"
import ImagesToPdfPageButton from "../../components/ui/ImagesToPdfPageButton"
import DeleteAccountButton from "../../components/ui/DeleteAccount"
import { MergePdfsButton } from "../../components/ui/MergePdfsButton"
import { DeleteAccountPopUpBox } from "../../components/ui/DeleteAccountPopUpBox"
import { useShowPopUp } from "../../store/ShowPopUp"

export default function Dashboard() {
    const { user } = useAuth()
    const { show } = useShowPopUp();

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-white">
            {/* Main Container */}
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                        Dashboard
                    </h1>
                    <p className="text-gray-600">Welcome back, {user?.email}</p>
                </div>

                {/* Verification Alert */}
                {!user?.is_verified && (
                    <div className="mb-6 bg-linear-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <svg 
                                className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                            >
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h3 className="text-amber-800 font-semibold text-sm mb-1">
                                    Verification Required
                                </h3>
                                <p className="text-amber-700 text-sm">
                                    Please verify your account to access all features of the app.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tools Grid */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Quick Tools
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ImagesToPdfPageButton />
                        <MergePdfsButton />
                    </div>
                </div>

                {/* Account Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Account Settings
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <LogOutButton />
                        <DeleteAccountButton />
                    </div>
                </div>
            </div>

            {/* Delete Account Popup */}
            {show && <DeleteAccountPopUpBox />}
        </div>
    )
}