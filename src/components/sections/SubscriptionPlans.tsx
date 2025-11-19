import { useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import PageMeta from "../common/PageMeta";

// Sample plan data type
type Plan = {
  id: number;
  name: string;
  price: number; // monthly in ₹
  features: string[];
  active: boolean;
};

const samplePlans: Plan[] = [
  {
    id: 1,
    name: "Starter",
    price: 499,
    features: ["Unlimited listing", "Basic analytics"],
    active: true,
  },
  {
    id: 2,
    name: "Business",
    price: 1299,
    features: ["Priority Support", "Custom branding", "Advanced analytics"],
    active: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: 2999,
    features: ["Dedicated manager", "API access", "Custom features"],
    active: false,
  },
];

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<Plan[]>(samplePlans);
  const [modalOpen, setModalOpen] = useState(false);

  // New plan states
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newFeatures, setNewFeatures] = useState<string>("");
  const [newActive, setNewActive] = useState<boolean>(true);

  // Add new plan
  const handleAddPlan = () => {
    if (!newName || !newPrice || !newFeatures) return;
    setPlans([
      ...plans,
      {
        id: Date.now(),
        name: newName,
        price: newPrice,
        features: newFeatures.split(",").map(f => f.trim()),
        active: newActive,
      },
    ]);
    setModalOpen(false);
    setNewName("");
    setNewPrice(0);
    setNewFeatures("");
    setNewActive(true);
  };

  // Edit/Delete actions (templates only, expand with real logic)
  const handleDelete = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <div>
      <PageMeta
        title="Subscription Plans | Admin Dashboard"
        description="Create and manage subscription plans."
      />
      <PageBreadcrumb pageTitle="Subscription Plans" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Manage Subscription Plans</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-sm"
            onClick={() => setModalOpen(true)}
          >
            + New Plan
          </button>
        </div>
        {/* Plans Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800 shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Price (₹/mo)</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Features</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id} className="bg-white even:bg-gray-50 dark:bg-gray-900 dark:even:bg-gray-800">
                  <td className="px-4 py-3 font-semibold">{plan.name}</td>
                  <td className="px-4 py-3">₹{plan.price}</td>
                  <td className="px-4 py-3 text-sm">
                    <ul className="list-disc pl-4 space-y-1">
                      {plan.features.map((f, idx) => <li key={idx}>{f}</li>)}
                    </ul>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${plan.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {plan.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-bold"
                      title="Edit"
                      // onClick={} // fill in edit logic if needed
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 font-bold"
                      title="Delete"
                      onClick={() => handleDelete(plan.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* New Plan Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Create New Plan</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Plan Name"
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Price (₹/month)"
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
                  value={newPrice || ""}
                  onChange={e => setNewPrice(Number(e.target.value))}
                />
                <input
                  type="text"
                  placeholder="Features (comma separated)"
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
                  value={newFeatures}
                  onChange={e => setNewFeatures(e.target.value)}
                />
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    className="accent-blue-600 w-5 h-5"
                    checked={newActive}
                    onChange={e => setNewActive(e.target.checked)}
                  />
                  <span className="text-gray-700 dark:text-gray-200">Active</span>
                </label>
                <div className="flex justify-end gap-4 mt-7">
                  <button
                    className="px-5 py-2 bg-gray-200 dark:bg-gray-800 rounded font-semibold"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-5 py-2 bg-blue-600 text-white rounded font-semibold"
                    onClick={handleAddPlan}
                  >
                    Create Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
