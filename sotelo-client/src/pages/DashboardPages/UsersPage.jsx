import React, { useState, useEffect } from 'react';
import {
  Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel, IconButton, InputAdornment, MenuItem, Paper, Stack, Switch,
  TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '', lastName: '', age: '', gender: '', contactNumber: '',
  email: '', role: 'editor', username: '', password: '', address: '', isActive: true,
};

const labelize = (value) => value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      const dbUsers = res.data.users.map(u => ({ ...u, id: u._id }));
      setUsers(dbUsers);
    } catch (err) {
      setApiError('Unable to load users from the database.');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user, password: '' } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ['firstName', 'First name'], ['lastName', 'Last name'], ['age', 'Age'],
      ['gender', 'Gender'], ['contactNumber', 'Contact number'], ['email', 'Email'],
      ['role', 'Role'], ['username', 'Username'], ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) nextErrors[key] = `${label} is required.`;
    });

    if (!modal.id && !form.password) {
       nextErrors.password = 'Password is required for new users.';
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextErrors.password && form.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }
    if (!nextErrors.contactNumber && form.contactNumber && !/^\d{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }
    if (!nextErrors.age && form.age && !/^\d+$/.test(form.age)) {
      nextErrors.age = 'Age must be a valid number.';
    }
    if (!nextErrors.username && form.username && /\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
      isActive: form.isActive,
    };

    if (form.password) {
      nextUser.password = form.password;
    }

    try {
      if (modal.id) {
        await updateUser(modal.id, nextUser);
      } else {
        await createUser(nextUser);
      }
      await loadUsers();
      closeModal();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Error saving user.');
    }
  };

  const toggleStatus = async (id) => {
    try {
      const user = users.find((u) => u.id === id);
      await updateUser(id, { isActive: !user.isActive });
      await loadUsers();
    } catch (err) {
      setApiError('Error updating status.');
    }
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      user.firstName?.toLowerCase().includes(query) ||
      user.lastName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query);

    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesGender = filterGender === 'all' || user.gender === filterGender;
    let matchesStatus = true;
    if (filterStatus === 'active') matchesStatus = user.isActive === true;
    if (filterStatus === 'inactive') matchesStatus = user.isActive === false;

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const fieldProps = (name, label, extra = {}) => ({
    name, label, value: form[name], onChange: handleChange,
    error: Boolean(errors[name]), helperText: errors[name], fullWidth: true, ...extra,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'fullName', headerName: 'Full Name', flex: 1, minWidth: 170, valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim() },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    { field: 'gender', headerName: 'Gender', minWidth: 110, valueGetter: (_, row) => labelize(row.gender) },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    { field: 'role', headerName: 'Role', minWidth: 120, valueGetter: (_, row) => labelize(row.role) },
    {
      field: 'status', headerName: 'Status', minWidth: 120, sortable: false,
      renderCell: ({ row }) => (
        <Chip size="small" label={row.isActive ? 'Active' : 'Inactive'} color={row.isActive ? 'success' : 'default'} variant={row.isActive ? 'filled' : 'outlined'} />
      ),
    },
    {
      field: 'actions', headerName: 'Actions', minWidth: 220, sortable: false, filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>Edit</Button>
          <Button size="small" variant="contained" color={row.isActive ? 'warning' : 'success'} onClick={() => toggleStatus(row.id)}>
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#aa3bff' }}>Artist Database</Typography>
        <Button variant="contained" onClick={() => openModal()} sx={{ width: { xs: '100%', sm: 'auto' }, backgroundColor: '#aa3bff', '&:hover': { backgroundColor: '#8a2be2' } }}>
          Add Artist
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <TextField label="Search Artists" variant="outlined" size="small" placeholder="Name, email, username..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ flex: 1, minWidth: '200px' }} />
        <TextField select label="Role" size="small" value={filterRole} onChange={(e) => setFilterRole(e.target.value)} sx={{ minWidth: '120px' }}>
          <MenuItem value="all">All Roles</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="viewer">Viewer</MenuItem>
        </TextField>
        <TextField select label="Gender" size="small" value={filterGender} onChange={(e) => setFilterGender(e.target.value)} sx={{ minWidth: '120px' }}>
          <MenuItem value="all">All Genders</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField select label="Status" size="small" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ minWidth: '120px' }}>
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Paper>

      {apiError ? <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert> : null}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden', borderRadius: '15px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
        {filteredUsers.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
              sx={{
                border: 'none',
                minWidth: 0,
                '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f4f3ec', color: '#6b6375', fontWeight: 'bold' },
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' },
                '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(170, 59, 255, 0.04)' },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">No artists match your criteria.</Alert>
        )}
      </Paper>

      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 'bold', color: '#aa3bff' }}>{modal.id ? 'Edit Artist' : 'Add Artist'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((gender) => <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>)}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>)}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', modal.id ? 'New Password (leave blank to keep current)' : 'Password', {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(event) => event.preventDefault()}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />
              <FormControlLabel control={<Switch name="isActive" checked={form.isActive} onChange={handleChange} color="secondary" />} label={form.isActive ? 'Artist status: Active' : 'Artist status: Inactive'} />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal} sx={{ color: '#6b6375' }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#aa3bff', '&:hover': { backgroundColor: '#8a2be2' } }}>
              {modal.id ? 'Update Artist' : 'Save Artist'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;