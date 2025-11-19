import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

// Types
type EscrowStatus = "pending" | "released" | "disputed";
type WithdrawalStatus = "pending" | "approved";

type EscrowTransaction = {
  id: number;
  project: string;
  amount: number;
  status: EscrowStatus;
};

type WithdrawalRequest = {
  id: number;
  user: string;
  amount: number;
  status: WithdrawalStatus;
};

// Data
const escrowTransactionsSample: EscrowTransaction[] = [
  { id: 1, project: "Website Redesign", amount: 10000, status: "pending" },
  { id: 2, project: "Backend API", amount: 7500, status: "released" },
  { id: 3, project: "Logo Design", amount: 2500, status: "disputed" },
];

const withdrawalRequestsSample: WithdrawalRequest[] = [
  { id: 101, user: "Amit K.", amount: 5000, status: "pending" },
  { id: 102, user: "Priya S.", amount: 8000, status: "approved" },
];

// Helper for status colors
const statusBadge = (status: string) => {
  if (status === "pending") return "bg-yellow-100 text-yellow-800";
  if (status === "released" || status === "approved") return "bg-green-100 text-green-800";
  if (status === "disputed") return "bg-red-100 text-red-800";
  return "";
};

export default function EscrowManager() {
  const [escrowTransactions, setEscrowTransactions] = useState<EscrowTransaction[]>(escrowTransactionsSample);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(withdrawalRequestsSample);

  // Track which dropdown is open
  const [editEscrowId, setEditEscrowId] = useState<number | null>(null);
  const [editWithdrawalId, setEditWithdrawalId] = useState<number | null>(null);

  // Options
  const escrowStatusOptions: EscrowStatus[] = ["pending", "released", "disputed"];
  const withdrawalStatusOptions: WithdrawalStatus[] = ["pending", "approved"];

  // Actions
  const updateEscrowStatus = (id: number, status: EscrowStatus) => {
    setEscrowTransactions((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    setEditEscrowId(null);
  };

  const updateWithdrawalStatus = (id: number, status: WithdrawalStatus) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status } : w))
    );
    setEditWithdrawalId(null);
  };

  return (
    <div>
      <PageMeta
        title="Escrow Manager | Admin Dashboard"
        description="Track escrow funds and approve withdrawal requests."
      />
      <PageBreadcrumb pageTitle="Escrow Manager" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="flex flex-col gap-12">
          {/* Escrow Transactions */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 w-full">
            <h3 className="mb-6 font-semibold text-gray-800 text-xl dark:text-white">
              Escrow Transactions
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">ID</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Project</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Amount</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {escrowTransactions.map((e) => (
                    <tr key={e.id} className="even:bg-white odd:bg-gray-100 dark:bg-gray-900 dark:odd:bg-gray-800 group relative">
                      <td className="px-4 py-2">{e.id}</td>
                      <td className="px-4 py-2">{e.project}</td>
                      <td className="px-4 py-2">₹{e.amount}</td>
                      <td className="px-4 py-2">
                        <span
                          className={
                            `inline-block px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${statusBadge(e.status)}`
                          }
                        >
                          {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="relative inline-block">
                          <button
                            className="ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-2 transition"
                            aria-label="Edit status"
                            onClick={() => setEditEscrowId(editEscrowId === e.id ? null : e.id)}
                          >
                            <FaPencilAlt className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                          </button>
                          {editEscrowId === e.id && (
                            <div className="absolute z-10 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-lg">
                              <ul>
                                {escrowStatusOptions.map((status) => (
                                  <li key={status}>
                                    <button
                                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${e.status === status ? "font-bold text-blue-600" : ""}`}
                                      onClick={() => updateEscrowStatus(e.id, status)}
                                    >
                                      {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Withdrawal Requests */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 w-full">
            <h3 className="mb-6 font-semibold text-gray-800 text-xl dark:text-white">
              Withdrawal Requests
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">ID</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">User</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Amount</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((w) => (
                    <tr key={w.id} className="even:bg-white odd:bg-gray-100 dark:bg-gray-900 dark:odd:bg-gray-800 group relative">
                      <td className="px-4 py-2">{w.id}</td>
                      <td className="px-4 py-2">{w.user}</td>
                      <td className="px-4 py-2">₹{w.amount}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${statusBadge(w.status)}`}
                        >
                          {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="relative inline-block">
                          <button
                            className="ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-2 transition"
                            aria-label="Edit status"
                            onClick={() => setEditWithdrawalId(editWithdrawalId === w.id ? null : w.id)}
                          >
                            <FaPencilAlt className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                          </button>
                          {editWithdrawalId === w.id && (
                            <div className="absolute z-10 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-lg">
                              <ul>
                                {withdrawalStatusOptions.map((status) => (
                                  <li key={status}>
                                    <button
                                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${w.status === status ? "font-bold text-blue-600" : ""}`}
                                      onClick={() => updateWithdrawalStatus(w.id, status)}
                                    >
                                      {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
