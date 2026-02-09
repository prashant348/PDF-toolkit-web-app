import { DashboardButton } from "../../components/ui/DashboardButton"
import { RegisterButton } from "../../components/ui/RegisterButton"
import { useAuth } from "../../contexts/authContext"

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">PDFTools</h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2 sm:gap-3">
              {user ? (
                <DashboardButton />
              ) : (
                <RegisterButton />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Your PDF Tools
            <span className="block text-blue-600 mt-2">All in One Place</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Convert images to PDF, merge multiple PDFs, and more. Simple, fast, and free.
          </p>

          {/* CTA Button */}
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <RegisterButton />
              <a
                href="#features"
                className="px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Learn More →
              </a>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Images to PDF</h3>
            <p className="text-gray-600 text-sm">
              Convert multiple images into a single PDF document with just a few clicks.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Merge PDFs</h3>
            <p className="text-gray-600 text-sm">
              Combine multiple PDF files into one organized document effortlessly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Split PDF</h3>
            <p className="text-gray-600 text-sm">
              Split a PDF file into multiple PDF files with ease.
            </p>
          </div>

          {/* feature 4 */}
          <div className="bg-white col-2 rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
            <p className="text-gray-600 text-sm">
              Your files are processed securely. We respect your privacy and data.
            </p>
          </div>

        </div>

        {/* How It Works Section */}
        <div className="mt-16 sm:mt-24">
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Upload Files</h4>
              <p className="text-gray-600 text-sm">
                Select the files you want to convert or merge or split
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Process</h4>
              <p className="text-gray-600 text-sm">
                We process your files quickly and securely
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Download</h4>
              <p className="text-gray-600 text-sm">
                Get your converted or merged or splitted PDF instantly
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="mt-16 sm:mt-24 bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-blue-100 mb-6 text-sm sm:text-base">
              Create your free account and start using our PDF tools today
            </p>
            <RegisterButton variant="white" />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 mt-16 sm:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; 2025 PDFTools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
