import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaUsers, FaEye, FaChartLine, FaDollarSign } from "react-icons/fa";

const dateRanges = [
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
  "Last year",
];

const statCards = [
  {
    label: "Total Visitors",
    value: "24,567",
    change: "+12.5% from last period",
    icon: <FaUsers className="text-blue-500 text-2xl" />,
  },
  {
    label: "Page Views",
    value: "89,234",
    change: "+8.2% from last period",
    icon: <FaEye className="text-green-500 text-2xl" />,
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "+0.5% from last period",
    icon: <FaChartLine className="text-purple-500 text-2xl" />,
  },
  {
    label: "Revenue",
    value: "₹4,56,789",
    change: "+15.3% from last period",
    icon: <FaDollarSign className="text-emerald-500 text-2xl" />,
  },
];

const Analytics = () => {
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard | Zenithfilings</title>
        <meta name="description" content="Analytics dashboard for Zenithfilings." />
      </Helmet>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Analytics Dashboard</h1>
            <p className="text-gray-500">Real-time insights and performance metrics</p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRange}
              onChange={e => setSelectedRange(e.target.value)}
            >
              {dateRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statCards.map(card => (
            <div
              key={card.label}
              className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow flex flex-col gap-3 cursor-pointer"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-gray-500 text-sm font-medium">{card.label}</span>
                {card.icon}
              </div>
              <div className="text-2xl font-bold mb-1">{card.value}</div>
              <div className="text-green-600 text-xs font-medium">{card.change}</div>
            </div>
          ))}
        </div>
        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Pages */}
          <div className="bg-white rounded-lg p-8 shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>🌐</span> Top Pages
            </h2>
            <p className="text-gray-500 text-sm mb-6">Most visited pages on your website</p>
            <div className="space-y-5">
              {["/services/company-registration", "/services/gst-registration", "/services/trademark-registration", "/blog/business-compliance-guide", "/about-us"].map((page, i) => (
                <div key={page} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{page}</span>
                    <span className="text-xs text-gray-500">{[12543, 8934, 6789, 4567, 3456][i]}</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded h-2">
                    <div className="bg-blue-900 h-2 rounded" style={{ width: `${80 - i * 15}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Device Statistics */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="text-purple-500">&#8594;</span> Device Statistics
            </h2>
            <p className="text-gray-500 text-sm mb-4">User device breakdown</p>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-700 inline-block"></span>Desktop</span>
                <span className="text-xs text-gray-500">15,678 (64%)</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Mobile</span>
                <span className="text-xs text-gray-500">7,890 (32%)</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-300 inline-block"></span>Tablet</span>
                <span className="text-xs text-gray-500">999 (4%)</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Service Performance */}
        <div className="bg-white rounded-lg p-8 shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-600">📊</span> Service Performance
          </h2>
          <p className="text-gray-500 text-sm mb-6">Conversion rates and performance metrics for each service</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Service</th>
                  <th className="py-2">Inquiries</th>
                  <th className="py-2">Conversions</th>
                  <th className="py-2">Rate</th>
                  <th className="py-2">Performance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Company Registration", inquiries: 456, conversions: 87, rate: "19.1%", perf: 70 },
                  { name: "GST Registration", inquiries: 334, conversions: 78, rate: "23.4%", perf: 80 },
                  { name: "Trademark Registration", inquiries: 289, conversions: 45, rate: "15.6%", perf: 50 },
                  { name: "Annual Compliance", inquiries: 198, conversions: 56, rate: "28.3%", perf: 90 },
                ].map(service => (
                  <tr key={service.name} className="border-t">
                    <td className="py-4 font-medium">{service.name}</td>
                    <td className="py-4">{service.inquiries}</td>
                    <td className="py-4">{service.conversions}</td>
                    <td className="py-4">{service.rate}</td>
                    <td className="py-4">
                      <div className="bg-gray-200 rounded h-2 w-24">
                        <div className="bg-green-600 h-2 rounded" style={{ width: `${service.perf}%` }}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* User Activity Timeline */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="text-orange-500">⏰</span> User Activity Timeline
          </h2>
          <p className="text-gray-500 text-sm mb-4">Hourly user activity throughout the day</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { time: "00:00", users: 245 },
              { time: "04:00", users: 178 },
              { time: "08:00", users: 567 },
              { time: "12:00", users: 892 },
              { time: "16:00", users: 1234 },
              { time: "20:00", users: 678 },
            ].map(slot => (
              <div key={slot.time} className="bg-blue-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-lg font-bold text-blue-700">{slot.users}</div>
                <div className="text-xs text-gray-500">users</div>
                <div className="text-xs mt-2">{slot.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics; 