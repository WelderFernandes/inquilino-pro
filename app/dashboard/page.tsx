export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Total Users</h2>
            <p className="text-4xl font-bold text-blue-600">1,234</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Revenue</h2>
            <p className="text-4xl font-bold text-green-600">$5,678</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Active Projects</h2>
            <p className="text-4xl font-bold text-purple-600">42</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">Activity {item}</p>
                  <p className="text-sm text-gray-500">
                    Description of activity {item}
                  </p>
                </div>
                <span className="text-sm text-gray-400">2h ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
