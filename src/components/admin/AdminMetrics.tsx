import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarLineIcon,
  GroupIcon,
  ListIcon,
  AlertHexaIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function AdminMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {/* Total Users */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Users</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">12,480</h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            4.2%
          </Badge>
        </div>
      </div>

      {/* Total Projects */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ListIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Projects</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">1,276</h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            1.8%
          </Badge>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">$123,540</h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            6.7%
          </Badge>
        </div>
      </div>

      {/* Disputes */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <AlertHexaIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Disputes</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">23</h4>
          </div>
          <Badge color="error">
            <ArrowDownIcon />
            0.6%
          </Badge>
        </div>
      </div>
    </div>
  );
}
