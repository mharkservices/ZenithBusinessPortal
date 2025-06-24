import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'user', label: 'User' },
];
const STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'inactive', label: 'Inactive' },
];

export default function UserFormDialog({ open, onOpenChange, mode = 'add', initialData = {}, onSubmit, loading }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [status, setStatus] = useState('active');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFullName(`${initialData.firstName || ''} ${initialData.lastName || ''}`.trim());
      setEmail(initialData.email || '');
      setRole(initialData.role || 'user');
      setStatus(initialData.status || 'active');
      setPassword('');
    } else if (mode === 'add') {
      setFullName('');
      setEmail('');
      setRole('user');
      setStatus('active');
      setPassword('');
    }
  }, [mode, initialData, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [firstName, ...rest] = fullName.trim().split(' ');
    const lastName = rest.join(' ');
    const data = {
      firstName,
      lastName,
      email,
      role,
      status,
    };
    if (mode === 'add') {
      data.password = password;
    }
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{mode === 'add' ? 'Add New User' : 'Edit User'}</DialogTitle>
            <DialogDescription>
              {mode === 'add'
                ? 'Create a new user account with appropriate role and permissions.'
                : 'Update user details and permissions.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email address"
                required
                disabled={mode === 'edit'}
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map(r => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map(s => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {mode === 'add' && (
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {mode === 'add' ? 'Add User' : 'Save Changes'}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 