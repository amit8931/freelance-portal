import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import {
  GroupIcon,
  CheckCircleIcon,
  CloseIcon,
  EyeIcon,
  CheckLineIcon,
  CloseLineIcon,
} from "../../icons";

type User = {
  id: number;
  name: string;
  email: string;
  status: "active" | "banned";
  kycStatus: "verified" | "pending" | "rejected";
  joinDate: string;
  avatar: string;
};

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    status: "active",
    kycStatus: "verified",
    joinDate: "2024-01-15",
    avatar: "/images/user/user-01.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "active",
    kycStatus: "pending",
    joinDate: "2024-02-20",
    avatar: "/images/user/user-02.png",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    status: "banned",
    kycStatus: "verified",
    joinDate: "2023-11-10",
    avatar: "/images/user/user-03.png",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    status: "active",
    kycStatus: "rejected",
    joinDate: "2024-03-05",
    avatar: "/images/user/user-04.png",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    status: "active",
    kycStatus: "pending",
    joinDate: "2024-01-28",
    avatar: "/images/user/user-05.png",
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "active" | "banned" | "kycPending">("all");

  const handleBanUser = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "banned" : "active" }
          : user
      )
    );
  };

  const handleKYCAction = (userId: number, action: "verified" | "rejected") => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, kycStatus: action } : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "active") return user.status === "active";
    if (selectedFilter === "banned") return user.status === "banned";
    if (selectedFilter === "kycPending") return user.kycStatus === "pending";
    return true;
  });

  const getKYCBadgeColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  };

  return (
    <>
      <PageMeta
        title="User Management | Admin Dashboard"
        description="Manage users, ban/unban users, and verify KYC"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {/* Total Users */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900/30">
            <GroupIcon className="text-blue-600 size-6 dark:text-blue-400" />
          </div>
          <div className="mt-5">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Users</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {users.length}
            </h4>
          </div>
        </div>

        {/* Active Users */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl dark:bg-green-900/30">
            <CheckCircleIcon className="text-green-600 size-6 dark:text-green-400" />
          </div>
          <div className="mt-5">
            <span className="text-sm text-gray-500 dark:text-gray-400">Active Users</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {users.filter((u) => u.status === "active").length}
            </h4>
          </div>
        </div>

        {/* KYC Pending */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl dark:bg-yellow-900/30">
            <EyeIcon className="text-yellow-600 size-6 dark:text-yellow-400" />
          </div>
          <div className="mt-5">
            <span className="text-sm text-gray-500 dark:text-gray-400">KYC Pending</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {users.filter((u) => u.kycStatus === "pending").length}
            </h4>
          </div>
        </div>

        {/* Banned Users */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl dark:bg-red-900/30">
            <CloseIcon className="text-red-600 size-6 dark:text-red-400" />
          </div>
          <div className="mt-5">
            <span className="text-sm text-gray-500 dark:text-gray-400">Banned Users</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {users.filter((u) => u.status === "banned").length}
            </h4>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedFilter("all")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            selectedFilter === "all"
              ? "bg-brand-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          All Users
        </button>
        <button
          onClick={() => setSelectedFilter("active")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            selectedFilter === "active"
              ? "bg-brand-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setSelectedFilter("banned")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            selectedFilter === "banned"
              ? "bg-brand-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Banned
        </button>
        <button
          onClick={() => setSelectedFilter("kycPending")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            selectedFilter === "kycPending"
              ? "bg-brand-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          KYC Pending
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="p-5 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            User Management
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View, ban/unban users, and verify KYC documents
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  User
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  KYC Status
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Join Date
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getKYCBadgeColor(
                        user.kycStatus
                      )}`}
                    >
                      {user.kycStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {/* Ban/Unban Button */}
                      <button
                        onClick={() => handleBanUser(user.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          user.status === "active"
                            ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                            : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                        }`}
                      >
                        {user.status === "active" ? "Ban" : "Unban"}
                      </button>

                      {/* KYC Actions */}
                      {user.kycStatus === "pending" && (
                        <>
                          <button
                            onClick={() => handleKYCAction(user.id, "verified")}
                            className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors dark:text-green-400 dark:hover:bg-green-900/30"
                            title="Verify KYC"
                          >
                            <CheckLineIcon className="size-4" />
                          </button>
                          <button
                            onClick={() => handleKYCAction(user.id, "rejected")}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors dark:text-red-400 dark:hover:bg-red-900/30"
                            title="Reject KYC"
                          >
                            <CloseLineIcon className="size-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No users found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
