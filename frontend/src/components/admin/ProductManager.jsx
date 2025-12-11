import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';

const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

export default function ProductManager({ activeSubTab }) {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(activeSubTab === 'products-add');
    const [formData, setFormData] = useState({ name: '', price: '', category: '', brand: '', stock: '', imageUrl: '', description: '', status: 'Active' });

    useEffect(() => {
        if (activeSubTab === 'products-add') setShowForm(true);
        else setShowForm(false);
        loadProducts();
    }, [activeSubTab]);

    const loadProducts = async () => {
        // Mock load
        setProducts([
            { id: 1, name: 'Wireless Earbuds', category: 'Electronics', price: 2499, stock: 45, status: 'Active' },
            { id: 2, name: 'Smart Watch', category: 'Electronics', price: 4999, stock: 12, status: 'Active' },
            { id: 3, name: 'Office Chair', category: 'Furniture', price: 8500, stock: 5, status: 'Low Stock' },
        ]);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    {showForm ? 'Add New Product' : 'Products Management'}
                </h2>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>+ Add Product</button>
                )}
            </div>

            {showForm ? (
                <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', maxWidth: '800px' }}>
                    <div style={{ display: 'grid', gap: '24px' }}>
                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={labelStyle}>Product Title</label>
                            <input style={inputStyle} placeholder="Enter product name" />
                        </div>

                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={labelStyle}>Description</label>
                            <textarea style={{ ...inputStyle, minHeight: '120px' }} placeholder="Enter product description" />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={labelStyle}>Price</label>
                                <input style={inputStyle} type="number" placeholder="0.00" />
                            </div>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={labelStyle}>Stock Quantity</label>
                                <input style={inputStyle} type="number" placeholder="0" />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={labelStyle}>Category</label>
                                <select style={inputStyle}>
                                    <option>Select Category</option>
                                    <option>Electronics</option>
                                    <option>Furniture</option>
                                    <option>Fashion</option>
                                </select>
                            </div>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={labelStyle}>Status</label>
                                <select style={inputStyle}>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={labelStyle}>Product Images</label>
                            <div style={{ border: '2px dashed #e2e8f0', borderRadius: '12px', padding: '32px', textAlign: 'center', color: '#64748b', cursor: 'pointer' }}>
                                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖼️</div>
                                <div>Click to upload or drag and drop</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                            <button onClick={() => setShowForm(false)} style={{ padding: '12px 24px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                            <button style={{ padding: '12px 24px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Save Product</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                                <th style={thStyle}>Product ID</th>
                                <th style={thStyle}>Title</th>
                                <th style={thStyle}>Category</th>
                                <th style={thStyle}>Price</th>
                                <th style={thStyle}>Stock</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={tdStyle}>#{product.id}</td>
                                    <td style={tdStyle}>
                                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{product.name}</div>
                                    </td>
                                    <td style={tdStyle}>{product.category}</td>
                                    <td style={tdStyle}>{formatINR(product.price)}</td>
                                    <td style={tdStyle}>{product.stock}</td>
                                    <td style={tdStyle}>
                                        <span style={{ padding: '4px 10px', borderRadius: '20px', background: product.status === 'Active' ? '#ecfdf5' : '#fffbeb', color: product.status === 'Active' ? '#047857' : '#b45309', fontWeight: '600', fontSize: '12px' }}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>✏️</button>
                                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

const labelStyle = { fontSize: '14px', fontWeight: '600', color: '#334155' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box', color: '#0f172a', background: '#fff' };
const thStyle = { padding: '16px', color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' };
const tdStyle = { padding: '16px', color: '#334155', fontSize: '14px' };
