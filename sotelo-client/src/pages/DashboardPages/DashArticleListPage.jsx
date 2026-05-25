import React, { useState, useEffect } from 'react';
import {
  Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel, MenuItem, Paper, Stack, Switch, TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { fetchArticles, createArticle, updateArticle } from '../../services/ArticleService';

const blankForm = {
  title: '', slug: '', paragraphs: '', preview: '', isActive: true,
};

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [articles, setArticles] = useState([]);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const loadArticles = async () => {
    try {
      const res = await fetchArticles();
      const dbArticles = res.data.articles.map(a => ({ ...a, id: a._id }));
      setArticles(dbArticles);
    } catch (err) {
      setApiError('Unable to load articles from the database.');
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (article) => {
    setModal({ open: true, id: article?.id ?? null });
    setForm(article ? { ...blankForm, ...article } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
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
    
    ['title', 'slug', 'paragraphs', 'preview'].forEach((key) => {
      if (!String(form[key]).trim()) nextErrors[key] = 'This field is required.';
    });

    if (!nextErrors.paragraphs && form.paragraphs && !/^\d+$/.test(form.paragraphs)) {
      nextErrors.paragraphs = 'Paragraphs must be a valid number.';
    }

    if (!nextErrors.slug && form.slug && /\s/.test(form.slug)) {
      nextErrors.slug = 'Slug cannot contain spaces.';
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

    const nextArticle = {
      title: form.title.trim(),
      slug: form.slug.trim().toLowerCase(),
      paragraphs: Number(form.paragraphs),
      preview: form.preview.trim(),
      isActive: form.isActive,
    };

    try {
      if (modal.id) {
        await updateArticle(modal.id, nextArticle);
      } else {
        await createArticle(nextArticle);
      }
      await loadArticles();
      closeModal();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Error saving article.');
    }
  };

  const toggleStatus = async (id) => {
    try {
      const article = articles.find((a) => a.id === id);
      await updateArticle(id, { isActive: !article.isActive });
      await loadArticles();
    } catch (err) {
      setApiError('Error updating status.');
    }
  };

  const filteredArticles = articles.filter((article) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      article.title?.toLowerCase().includes(query) ||
      article.slug?.toLowerCase().includes(query) ||
      article.preview?.toLowerCase().includes(query);

    let matchesStatus = true;
    if (filterStatus === 'active') matchesStatus = article.isActive === true;
    if (filterStatus === 'inactive') matchesStatus = article.isActive === false;

    return matchesSearch && matchesStatus;
  });

  const fieldProps = (name, label, extra = {}) => ({
    name, label, value: form[name], onChange: handleChange,
    error: Boolean(errors[name]), helperText: errors[name], fullWidth: true, ...extra,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'slug', headerName: 'Slug', minWidth: 150 },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
    { field: 'paragraphs', headerName: 'Paragraphs', width: 100 },
    { field: 'preview', headerName: 'Preview', flex: 1.5, minWidth: 250 },
    {
      field: 'status', headerName: 'Status', minWidth: 120, sortable: false,
      renderCell: ({ row }) => (
        <Chip size="small" label={row.isActive ? 'Active' : 'Inactive'} color={row.isActive ? 'success' : 'default'} variant={row.isActive ? 'filled' : 'outlined'} />
      ),
    },
    {
      field: 'actions', headerName: 'Actions', minWidth: 180, sortable: false, filterable: false,
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
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#aa3bff' }}>Articles</Typography>
        <Button variant="contained" onClick={() => openModal()} sx={{ width: { xs: '100%', sm: 'auto' }, backgroundColor: '#aa3bff', '&:hover': { backgroundColor: '#8a2be2' } }}>
          Add Article
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <TextField label="Search Articles" variant="outlined" size="small" placeholder="Title, slug, preview..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ flex: 1, minWidth: '200px' }} />
        <TextField select label="Status Filter" size="small" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ minWidth: '150px' }}>
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Paper>

      {apiError ? <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert> : null}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden', borderRadius: '15px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
        <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
            sx={{
              border: 'none',
              minWidth: 0,
              '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f4f3ec', color: '#6b6375', fontWeight: 'bold' },
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' },
              '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(170, 59, 255, 0.04)' },
            }}
          />
        </Box>
      </Paper>

      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 'bold', color: '#aa3bff' }}>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField {...fieldProps('title', 'Title')} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('slug', 'Slug (e.g., my-article-title)')} />
                <TextField {...fieldProps('paragraphs', 'Number of Paragraphs')} />
              </Stack>
              <TextField {...fieldProps('preview', 'Preview Text', { multiline: true, rows: 3 })} />
              <FormControlLabel control={<Switch name="isActive" checked={form.isActive} onChange={handleChange} color="secondary" />} label={form.isActive ? 'Status: Active' : 'Status: Inactive'} />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal} sx={{ color: '#6b6375' }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#aa3bff', '&:hover': { backgroundColor: '#8a2be2' } }}>
              {modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;