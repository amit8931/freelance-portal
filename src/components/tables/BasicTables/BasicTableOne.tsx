import { useState, useEffect } from "react";

type FeeRow = {
  id: number;
  name: string;
  rate: string;
  commission: string;
};

const initialData: FeeRow[] = [
  { id: 1, name: "Gold Membership", rate: "1200", commission: "10%" },
  { id: 2, name: "Silver Membership", rate: "800", commission: "8%" },
];

function EditModal({
  open,
  row,
  onSave,
  onClose,
}: {
  open: boolean;
  row: FeeRow | null;
  onSave: (updated: FeeRow) => void;
  onClose: () => void;
}) {
  const [rate, setRate] = useState("");
  const [commission, setCommission] = useState("");

  useEffect(() => {
    setRate(row?.rate ?? "");
    setCommission(row?.commission ?? "");
  }, [row]);

  if (!open || !row) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-8 min-w-[320px] w-full max-w-md animate-fade-in">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit {row.name}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Rate</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={rate}
            onChange={e => setRate(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Commission</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={commission}
            onChange={e => setCommission(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            onClick={() => onSave({ ...row, rate, commission })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BasicTableOne() {
  const [data, setData] = useState<FeeRow[]>(initialData);
  const [selected, setSelected] = useState<FeeRow | null>(null);

  const handleSave = (updated: FeeRow) => {
    setData(data.map(d => (d.id === updated.id ? updated : d)));
    setSelected(null);
  };

  return (
    <>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-50 text-gray-700 uppercase tracking-wider text-sm">
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Rate</th>
            <th className="px-6 py-3 text-left">Commission</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className="border-b hover:bg-blue-50 group">
              <td className="px-6 py-4">{row.name}</td>
              <td className="px-6 py-4">{row.rate}</td>
              <td className="px-6 py-4">{row.commission}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setSelected(row)}
                  className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-1 rounded-lg text-sm font-medium shadow group-hover:scale-105"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditModal
        open={!!selected}
        row={selected}
        onSave={handleSave}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
