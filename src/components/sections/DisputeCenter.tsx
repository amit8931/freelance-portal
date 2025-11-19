import { useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import PageMeta from "../common/PageMeta";

type DisputeCase = {
  id: number;
  type: string;
  user: string;
  amount: number;
  status: "Open" | "Resolved" | "Refunded";
  description: string;
  date: string;
};

const initialCases: DisputeCase[] = [
  {
    id: 12011,
    type: "Non-delivery",
    user: "Amit K.",
    amount: 4000,
    status: "Open",
    description: "Freelancer did not deliver project files after payment.",
    date: "2025-11-12",
  },
  {
    id: 12012,
    type: "Quality issue",
    user: "Priya S.",
    amount: 7000,
    status: "Resolved",
    description: "Work did not match agreed specifications.",
    date: "2025-11-11",
  },
];

export default function DisputeCenter() {
  const [cases, setCases] = useState<DisputeCase[]>(initialCases);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCase, setActiveCase] = useState<DisputeCase | null>(null);

  const handleReview = (dcase: DisputeCase) => {
    setActiveCase(dcase);
    setModalOpen(true);
  };

  const handleRefund = (id: number) => {
    setCases(cases =>
      cases.map(d =>
        d.id === id ? { ...d, status: "Refunded" } : d
      )
    );
    setModalOpen(false);
  };

  const handleResolve = (id: number) => {
    setCases(cases =>
      cases.map(d =>
        d.id === id ? { ...d, status: "Resolved" } : d
      )
    );
    setModalOpen(false);
  };

  return (
    <div>
      <PageMeta
        title="Dispute Center | Admin Dashboard"
        description="Resolve user disputes and issue refunds."
      />
      <PageBreadcrumb pageTitle="Dispute Center" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Case Management
        </h2>
        {/* Cases Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800 shadow mb-8">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Amount (₹)</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {cases.length === 0 ? (
                <tr>
                  <td className="px-4 py-5 text-gray-500 dark:text-gray-400" colSpan={7}>
                    No dispute cases found.
                  </td>
                </tr>
              ) : (
                cases.map(dcase => (
                  <tr key={dcase.id} className="bg-white even:bg-gray-50 dark:bg-gray-900 dark:even:bg-gray-800">
                    <td className="px-4 py-3 font-semibold">{dcase.id}</td>
                    <td className="px-4 py-3">{dcase.type}</td>
                    <td className="px-4 py-3">{dcase.user}</td>
                    <td className="px-4 py-3">{dcase.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        dcase.status === "Open"
                          ? "bg-yellow-100 text-yellow-800"
                          : dcase.status === "Refunded"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        {dcase.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{dcase.date}</td>
                    <td className="px-4 py-3">
                      <button
                        className="text-blue-600 hover:underline font-medium"
                        onClick={() => handleReview(dcase)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Review Modal */}
        {modalOpen && activeCase && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-6">Review Dispute Case</h3>
              <dl className="mb-4">
                <dt className="font-semibold text-gray-700 dark:text-gray-200">Case ID:</dt>
                <dd className="mb-3">{activeCase.id}</dd>
                <dt className="font-semibold text-gray-700 dark:text-gray-200">User:</dt>
                <dd className="mb-3">{activeCase.user}</dd>
                <dt className="font-semibold text-gray-700 dark:text-gray-200">Type:</dt>
                <dd className="mb-3">{activeCase.type}</dd>
                <dt className="font-semibold text-gray-700 dark:text-gray-200">Amount:</dt>
                <dd className="mb-3">₹{activeCase.amount}</dd>
                <dt className="font-semibold text-gray-700 dark:text-gray-200">Description:</dt>
                <dd className="mb-3">{activeCase.description}</dd>
                <dt className="font-semibold text-gray-700 dark:text-gray-200">Status:</dt>
                <dd>{activeCase.status}</dd>
              </dl>
              <div className="flex justify-end gap-4 mt-6">
                {activeCase.status === "Open" && (
                  <>
                    <button
                      className="px-5 py-2 bg-blue-600 text-white rounded font-semibold"
                      onClick={() => handleRefund(activeCase.id)}
                    >
                      Issue Refund
                    </button>
                    <button
                      className="px-5 py-2 bg-green-600 text-white rounded font-semibold"
                      onClick={() => handleResolve(activeCase.id)}
                    >
                      Mark Resolved
                    </button>
                  </>
                )}
                <button
                  className="px-5 py-2 bg-gray-200 dark:bg-gray-800 rounded font-semibold"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="text-gray-500 dark:text-gray-400">
          Review and resolve user disputes. Issue refunds as necessary.
        </div>
      </div>
    </div>
  );
}
