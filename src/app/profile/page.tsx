export default function SidebarLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-lg font-bold">Sidebar</h2>
          <ul className="mt-4 space-y-2">
            <li className="p-6 hover:bg-gray-700 rounded">Dashboard</li>
            <li className="p-6 hover:bg-gray-700 rounded">Settings</li>
            <li className="p-6 hover:bg-gray-700 rounded">Profile</li>
            <li className="p-6 hover:bg-gray-700 rounded">Logout</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p className="mt-4">This is the main content area. You can add any content here.</p>
      </div>
    </div>
  );
}
