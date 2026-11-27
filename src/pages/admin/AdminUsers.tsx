import { useState } from 'react';
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Phone,
  Mail,
  Calendar,
  Layers,
  X,
  Plus,
  Edit3,
} from 'lucide-react';
import { AdminUser, useAdmin } from '../../context/AdminContext';
import { CRM_PRODUCTS } from '../../data/content';

export function AdminUsers() {
  const { users, toggleUserStatus, deleteUser, addUser, updateUser, role } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked' | 'expired'>('all');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newBiz, setNewBiz] = useState('');
  const [newCrm, setNewCrm] = useState(CRM_PRODUCTS[0].id);
  const [newPlan, setNewPlan] = useState<'starter' | 'professional' | 'enterprise'>('professional');
  const [newBilling, setNewBilling] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');
  const [newRegion, setNewRegion] = useState('Hyderabad, Telangana');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.businessName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newBiz) return;
    const amount = newPlan === 'starter' ? 999 : newPlan === 'professional' ? 2499 : 4999;
    addUser({
      name: newName,
      email: newEmail,
      phone: newPhone || '+91 98000 00000',
      businessName: newBiz,
      crmId: newCrm,
      planId: newPlan,
      billingCycle: newBilling,
      status: 'active',
      expiresDate: '2027-02-28',
      amountPaid: newBilling === 'yearly' ? amount * 10 : amount,
      region: newRegion,
    });
    setAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewBiz('');
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1B4B]">User Management</h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Browse, manage, inspect activity logs, and control access for all CRM business accounts.
          </p>
        </div>

        {role !== 'support_staff' && (
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#4C1D95] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Business Account</span>
          </button>
        )}
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#EDE9FE] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, business, phone or email..."
            className="w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] py-2 pl-9.5 pr-4 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {(['all', 'active', 'blocked', 'expired'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#5B21B6] text-white shadow-xs'
                  : 'bg-[#F3EEFF] text-[#5B21B6] hover:bg-[#EDE9FE]'
              }`}
            >
              {st} {st !== 'all' && `(${users.filter((u) => u.status === st).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-[#EDE9FE] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EDE9FE] bg-[#FAF8FF] text-[#64748B]">
                <th className="px-5 py-3.5 font-bold">Business & Customer</th>
                <th className="px-5 py-3.5 font-bold">Subscribed CRM</th>
                <th className="px-5 py-3.5 font-bold">Plan & Billing</th>
                <th className="px-5 py-3.5 font-bold">Region</th>
                <th className="px-5 py-3.5 font-bold text-center">Status</th>
                <th className="px-5 py-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEFF]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-[#94A3B8]">
                    No accounts found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const crm = CRM_PRODUCTS.find((c) => c.id === user.crmId);
                  return (
                    <tr key={user.id} className="hover:bg-[#FAF8FF] transition">
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-[#1E1B4B]">{user.businessName}</p>
                        <p className="text-[11px] text-[#475569]">
                          {user.name} • <span className="tabular-nums">{user.phone}</span>
                        </p>
                        <p className="text-[10px] text-[#94A3B8]">{user.email}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 font-semibold text-[#5B21B6]">
                          {crm?.name || user.crmId}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-bold capitalize text-[#1E1B4B]">{user.planId} Plan</span>
                        <p className="text-[11px] text-[#64748B] capitalize">{user.billingCycle} billing</p>
                        <p className="text-[10px] text-green-700 font-semibold tabular-nums">Paid: ₹{user.amountPaid.toLocaleString('en-IN')}</p>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-[#475569]">
                        {user.region}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : user.status === 'blocked'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Profile */}
                          <button
                            type="button"
                            onClick={() => setSelectedUser(user)}
                            title="View Profile & Activity History"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#EDE9FE] bg-white text-[#5B21B6] hover:bg-[#F3EEFF] cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>

                          {/* Edit User Details */}
                          {role !== 'support_staff' && (
                            <button
                              type="button"
                              onClick={() => setEditingUser({ ...user })}
                              title="Edit Business Account Details"
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-purple-200 bg-purple-50 text-[#5B21B6] hover:bg-purple-100 cursor-pointer"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                          )}

                          {/* Block / Unblock (Super Admin and Sales only) */}
                          {role !== 'support_staff' && (
                            <button
                              type="button"
                              onClick={() => toggleUserStatus(user.id)}
                              title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                              className={`flex h-7 w-7 items-center justify-center rounded-lg border cursor-pointer ${
                                user.status === 'active'
                                  ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                                  : 'border-green-200 text-green-700 hover:bg-green-50'
                              }`}
                            >
                              {user.status === 'active' ? (
                                <UserX className="h-3.5 w-3.5" />
                              ) : (
                                <UserCheck className="h-3.5 w-3.5" />
                              )}
                            </button>
                          )}

                          {/* Delete (Super Admin only) */}
                          {role === 'super_admin' && (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete user ${user.name} (${user.businessName})?`)) {
                                  deleteUser(user.id);
                                }
                              }}
                              title="Delete User"
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile & Activity History Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-start justify-between border-b border-[#F3EEFF] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">
                  Customer Dossier #{selectedUser.id}
                </span>
                <h2 className="text-xl font-extrabold text-[#1E1B4B]">
                  {selectedUser.businessName}
                </h2>
                <p className="text-xs text-[#64748B]">
                  Account Owner: <strong>{selectedUser.name}</strong> • {selectedUser.region}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-1 text-[#94A3B8] hover:bg-[#F3EEFF] hover:text-[#1E1B4B]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Profile Overview Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-xl bg-[#FAF8FF] p-4 border border-[#EDE9FE] text-xs">
              <div>
                <span className="text-[#64748B]">Active Product:</span>
                <p className="font-bold text-[#5B21B6]">
                  {CRM_PRODUCTS.find((c) => c.id === selectedUser.crmId)?.name || selectedUser.crmId}
                </p>
              </div>
              <div>
                <span className="text-[#64748B]">Plan Tier:</span>
                <p className="font-bold text-[#1E1B4B] capitalize">{selectedUser.planId}</p>
              </div>
              <div>
                <span className="text-[#64748B]">Renewal Date:</span>
                <p className="font-bold text-[#1E1B4B]">{selectedUser.expiresDate}</p>
              </div>
              <div>
                <span className="text-[#64748B]">Account Status:</span>
                <p className={`font-bold capitalize ${selectedUser.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedUser.status}
                </p>
              </div>
            </div>

            {/* Activity History Log */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1B4B]">
                Recent In-App Activity & Audit History
              </h3>
              <div className="mt-2.5 max-h-48 overflow-y-auto space-y-2 rounded-xl border border-[#EDE9FE] p-3 text-xs">
                {selectedUser.activityHistory.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 pb-2 border-b border-[#F3EEFF] last:border-0">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[10px] font-bold text-[#5B21B6]">
                      ✓
                    </span>
                    <div className="flex-1">
                      <p className="text-[#1E1B4B]">{act.action}</p>
                      <span className="text-[10px] text-[#94A3B8]">{act.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between border-t border-[#F3EEFF] pt-4">
              <span className="text-xs text-[#64748B]">
                Direct Contacts: <a href={`tel:${selectedUser.phone}`} className="font-semibold text-[#5B21B6]">{selectedUser.phone}</a> • <a href={`mailto:${selectedUser.email}`} className="font-semibold text-[#5B21B6]">{selectedUser.email}</a>
              </span>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded-xl bg-[#5B21B6] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4C1D95]"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleCreateUser}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4 animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between border-b border-[#F3EEFF] pb-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">Add New Business CRM Account</h2>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#1E1B4B]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 text-xs">
              <div>
                <label className="font-semibold text-[#475569]">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ramesh Varma"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Business / Organization Name *</label>
                <input
                  type="text"
                  required
                  value={newBiz}
                  onChange={(e) => setNewBiz(e.target.value)}
                  placeholder="e.g. Varma Caterings & Events"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@business.com"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Phone / WhatsApp Number</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Industry CRM</label>
                <select
                  value={newCrm}
                  onChange={(e) => setNewCrm(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                >
                  {CRM_PRODUCTS.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Plan Tier</label>
                <select
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                >
                  <option value="starter">Starter Plan (₹999/mo)</option>
                  <option value="professional">Professional Plan (₹2,499/mo)</option>
                  <option value="enterprise">Enterprise Plan (Custom)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Billing Cadence</label>
                <select
                  value={newBilling}
                  onChange={(e) => setNewBilling(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly (Save 20%)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Region / City</label>
                <input
                  type="text"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  placeholder="e.g. Hyderabad, Telangana"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 border-t border-[#F3EEFF] pt-4">
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="rounded-xl border border-[#EDE9FE] px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-[#FAF8FF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#5B21B6] px-5 py-2 text-xs font-semibold text-white hover:bg-[#4C1D95]"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser(editingUser.id, editingUser);
              setEditingUser(null);
            }}
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#F3EEFF] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">Edit Account</span>
                <h2 className="text-base font-bold text-[#1E1B4B]">Edit {editingUser.businessName}</h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="rounded-lg p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div>
                <label className="font-semibold text-[#475569]">Business / Enterprise Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.businessName}
                  onChange={(e) => setEditingUser({ ...editingUser, businessName: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Contact Person Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Email Address</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Subscribed CRM Product</label>
                <select
                  value={editingUser.crmId}
                  onChange={(e) => setEditingUser({ ...editingUser, crmId: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  {CRM_PRODUCTS.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Subscription Plan</label>
                <select
                  value={editingUser.planId}
                  onChange={(e) => setEditingUser({ ...editingUser, planId: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="starter">Starter Plan</option>
                  <option value="professional">Professional Plan</option>
                  <option value="enterprise">Enterprise Plan</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Billing Cycle</label>
                <select
                  value={editingUser.billingCycle}
                  onChange={(e) => setEditingUser({ ...editingUser, billingCycle: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly (Save 20%)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Account Status</label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-[#475569]">Region / City</label>
                <input
                  type="text"
                  value={editingUser.region}
                  onChange={(e) => setEditingUser({ ...editingUser, region: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 border-t border-[#F3EEFF] pt-4">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="rounded-xl border border-[#EDE9FE] px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-[#FAF8FF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#5B21B6] px-5 py-2 text-xs font-semibold text-white hover:bg-[#4C1D95]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
