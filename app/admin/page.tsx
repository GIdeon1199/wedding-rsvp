"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, RSVPEntry } from "@/lib/supabase";
import { Users, CheckCircle, XCircle, UserPlus, Download, RefreshCw, Lock } from "lucide-react";

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-champagne-200 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
        <span className="font-sans text-sm text-charcoal/60">{label}</span>
      </div>
      <p className="font-serif text-5xl font-light text-charcoal">{value}</p>
    </div>
  );
}

function downloadCSV(data: RSVPEntry[]) {
  const headers = ["Name", "Email", "Phone", "Attending", "Plus One", "Guests", "Dietary", "Message", "Submitted"];
  const rows = data.map((r) => [
    r.full_name,
    r.email || "",
    r.phone || "",
    r.attending ? "Yes" : "No",
    r.plus_one ? "Yes" : "No",
    r.guest_count,
    r.dietary_restrictions || "",
    r.message || "",
    r.created_at ? new Date(r.created_at).toLocaleDateString() : "",
  ]);
  const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `rsvps-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PW = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "wedding2026";

  const fetchRSVPs = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setRsvps(data as RSVPEntry[]);
    } catch {
      // Supabase not configured — show empty state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchRSVPs();
  }, [authed, fetchRSVPs]);

  const handleLogin = () => {
    if (password === ADMIN_PW) {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const attending   = rsvps.filter((r) => r.attending);
  const declined    = rsvps.filter((r) => !r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + (r.guest_count || 1), 0);
  const plusOnes    = attending.filter((r) => r.plus_one).length;

  // ── PASSWORD GATE ──────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <Lock size={40} className="text-orange-500 mx-auto mb-4" />
            <h1 className="font-serif text-3xl font-light text-charcoal">Admin Dashboard</h1>
            <p className="font-sans text-sm text-charcoal/50 mt-2">RSVP Management</p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-champagne-200 shadow-sm">
            <label className="block font-sans text-sm font-medium text-charcoal mb-2">
              Password
            </label>
            <input
              type="password"
              className="form-input mb-4"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {error && <p className="text-red-500 text-xs mb-3 font-sans">{error}</p>}
            <button
              onClick={handleLogin}
              className="btn-accent w-full py-3 rounded-xl text-white font-sans font-medium"
            >
              Access Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-ivory py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-serif text-4xl font-light text-charcoal">RSVP Dashboard</h1>
            <p className="font-sans text-sm text-charcoal/50 mt-1">
              {rsvps.length} total submissions
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchRSVPs}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-champagne-200 text-charcoal text-sm font-sans hover:border-orange-400 transition-colors"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={() => downloadCSV(rsvps)}
              className="btn-accent flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-sans"
            >
              <Download size={15} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={<Users size={18} className="text-blue-600" />}
            label="Total RSVPs"
            value={rsvps.length}
            color="bg-blue-50"
          />
          <StatCard
            icon={<CheckCircle size={18} className="text-green-600" />}
            label="Attending"
            value={attending.length}
            color="bg-green-50"
          />
          <StatCard
            icon={<XCircle size={18} className="text-red-400" />}
            label="Declined"
            value={declined.length}
            color="bg-red-50"
          />
          <StatCard
            icon={<UserPlus size={18} className="text-orange-600" />}
            label="Total Guests"
            value={totalGuests}
            color="bg-orange-50"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-champagne-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="bg-champagne-50 border-b border-champagne-200">
                  <th className="text-left px-5 py-4 font-medium text-charcoal/70 whitespace-nowrap">Name</th>
                  <th className="text-left px-5 py-4 font-medium text-charcoal/70 whitespace-nowrap">Contact</th>
                  <th className="text-left px-5 py-4 font-medium text-charcoal/70 whitespace-nowrap">Attending</th>
                  <th className="text-left px-5 py-4 font-medium text-charcoal/70 whitespace-nowrap">+1</th>
                  <th className="text-left px-5 py-4 font-medium text-charcoal/70 whitespace-nowrap">Guests</th>
                  <th className="text-left px-5 py-4 font-medium text-charcoal/70 whitespace-nowrap">Dietary</th>
                  <th className="text-left px-5 py-4 font-medium text-charcoal/70 whitespace-nowrap">Message</th>
                  <th className="text-left px-5 py-4 font-medium text-charcoal/70 whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-charcoal/40">
                      Loading RSVPs...
                    </td>
                  </tr>
                ) : rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center">
                      <div className="text-4xl mb-3">📭</div>
                      <p className="text-charcoal/40 text-sm">
                        No RSVPs yet — or Supabase isn&apos;t connected.
                      </p>
                    </td>
                  </tr>
                ) : (
                  rsvps.map((r, i) => (
                    <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-ivory/50"}>
                      <td className="px-5 py-4 font-medium text-charcoal whitespace-nowrap">{r.full_name}</td>
                      <td className="px-5 py-4 text-charcoal/60 whitespace-nowrap max-w-[160px] truncate">
                        {r.email || r.phone || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            r.attending
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {r.attending ? "✓ Yes" : "✕ No"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-charcoal/60">{r.plus_one ? "Yes" : "No"}</td>
                      <td className="px-5 py-4 text-charcoal/60">{r.guest_count}</td>
                      <td className="px-5 py-4 text-charcoal/60 max-w-[140px] truncate">{r.dietary_restrictions || "—"}</td>
                      <td className="px-5 py-4 text-charcoal/60 max-w-[200px] truncate">{r.message || "—"}</td>
                      <td className="px-5 py-4 text-charcoal/40 whitespace-nowrap text-xs">
                        {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Plus one breakdown */}
        <div className="mt-6 text-center text-xs font-sans text-charcoal/40">
          Plus ones: {plusOnes} guests · Total expected attendees: {totalGuests}
        </div>
      </div>
    </div>
  );
}
