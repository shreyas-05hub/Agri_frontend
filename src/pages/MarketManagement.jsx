// // // import React, { useEffect, useState } from "react";
// // // import AdminLayout from "../components/AdminLayout";

// // // const MarketManagement = () => {
// // //   const [requests, setRequests] = useState([]);
// // //   const [showRejectModal, setShowRejectModal] = useState(false);
// // //   const [rejectForId, setRejectForId] = useState(null);
// // //   const [rejectReason, setRejectReason] = useState("");

// // //   useEffect(() => {
// // //     const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
// // //     setRequests(stored);
// // //   }, []);

// // //   const refresh = () => {
// // //     const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
// // //     setRequests(stored);
// // //   };

// // //   const acceptRequest = (reqId) => {
// // //     const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
// // //     const updated = stored.map((r) =>
// // //       r.id === reqId ? { ...r, status: "Accepted", timestamp: Date.now() } : r
// // //     );
// // //     localStorage.setItem("cropRequests", JSON.stringify(updated));

// // //     const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
// // //     const reconciled = storedCrops.map((c) =>
// // //       c.id === stored.find((s) => s.id === reqId)?.cropId
// // //         ? { ...c, status: "Accepted", reason: "" }
// // //         : c
// // //     );
// // //     localStorage.setItem("crops", JSON.stringify(reconciled));

// // //     refresh();
// // //     alert("Request accepted.");
// // //   };

// // //   const openRejectModal = (reqId) => {
// // //     setRejectForId(reqId);
// // //     setRejectReason("");
// // //     setShowRejectModal(true);
// // //   };

// // //   const submitReject = () => {
// // //     if (!rejectReason.trim()) {
// // //       alert("Please enter a reason for rejection.");
// // //       return;
// // //     }

// // //     const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
// // //     const updated = stored.map((r) =>
// // //       r.id === rejectForId
// // //         ? {
// // //             ...r,
// // //             status: "Rejected",
// // //             reason: rejectReason,
// // //             timestamp: Date.now(),
// // //           }
// // //         : r
// // //     );
// // //     localStorage.setItem("cropRequests", JSON.stringify(updated));

// // //     const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
// // //     const targetReq = updated.find((u) => u.id === rejectForId);

// // //     const reconciled = storedCrops.map((c) =>
// // //       c.id === targetReq.cropId
// // //         ? { ...c, status: "Rejected", reason: rejectReason }
// // //         : c
// // //     );
// // //     localStorage.setItem("crops", JSON.stringify(reconciled));

// // //     setShowRejectModal(false);
// // //     setRejectForId(null);
// // //     setRejectReason("");
// // //     refresh();
// // //     alert("Request rejected.");
// // //   };

// // //   const removeRequest = (reqId) => {
// // //     const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
// // //     const updated = stored.filter((r) => r.id !== reqId);
// // //     localStorage.setItem("cropRequests", JSON.stringify(updated));
// // //     refresh();
// // //   };

// // //   return (
// // //     <AdminLayout>
// // //       <div
// // //         className="container-fluid p-4"
// // //         style={{
// // //           height: "100vh",
// // //           background: "linear-gradient(90deg, #b3e6b1 0%, #b3e6b1 88%)",
// // //         }}
// // //       >
// // //         <h2>Crop Requests</h2>

// // //         <div className="user-table mt-3">
// // //           <div className="table-responsive">
// // //             <table className="table table-striped table-bordered">
// // //               <thead>
// // //                 <tr>
// // //                   <th>#</th>
// // //                   <th>Farmer</th>
// // //                   <th>Crop</th>
// // //                   <th>Qty (kg)</th>
// // //                   <th>Price (₹)</th>
// // //                   <th>Location</th>
// // //                   <th>Status</th>
// // //                   <th>Reason</th>
// // //                   <th>Action</th>
// // //                 </tr>
// // //               </thead>

// // //               <tbody>
// // //                 {requests.length > 0 ? (
// // //                   requests.map((r, idx) => (
// // //                     <tr key={r.id}>
// // //                       <td>{idx + 1}</td>
// // //                       <td>{r.farmerName}</td>
// // //                       <td>{r.cropName}</td>
// // //                       <td>{r.quantity}</td>
// // //                       <td>{r.price}</td>
// // //                       <td>{r.location || "—"}</td>
// // //                       <td>{r.status}</td>

// // //                       <td style={{ maxWidth: "200px", wordBreak: "break-word" }}>
// // //                         {r.status === "Rejected" ? r.reason : "—"}
// // //                       </td>

// // //                       <td>
// // //                         {r.status === "Pending" && (
// // //                           <>
// // //                             <button
// // //                               className="btn btn-success btn-sm me-2"
// // //                               onClick={() => acceptRequest(r.id)}
// // //                             >
// // //                               Accept
// // //                             </button>

// // //                             <button
// // //                               className="btn btn-danger btn-sm"
// // //                               onClick={() => openRejectModal(r.id)}
// // //                             >
// // //                               Reject
// // //                             </button>
// // //                           </>
// // //                         )}

// // //                         {r.status === "Accepted" && (
// // //                           <span className="badge bg-success">Accepted</span>
// // //                         )}

// // //                         {r.status === "Rejected" && (
// // //                           <>
// // //                             <span className="badge bg-danger me-2">
// // //                               Rejected
// // //                             </span>
// // //                             <button
// // //                               className="btn btn-outline-danger btn-sm"
// // //                               onClick={() => removeRequest(r.id)}
// // //                             >
// // //                               Remove
// // //                             </button>
// // //                           </>
// // //                         )}
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //                 ) : (
// // //                   <tr>
// // //                     <td colSpan="9" className="text-center">
// // //                       No requests found.
// // //                     </td>
// // //                   </tr>
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>

// // //         {/* Reject Modal */}
// // //         {showRejectModal && (
// // //           <div
// // //             className="modal fade show d-block"
// // //             style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
// // //           >
// // //             <div className="modal-dialog">
// // //               <div className="modal-content p-3">
// // //                 <div className="modal-header">
// // //                   <h5 className="modal-title">Reject Request</h5>
// // //                   <button
// // //                     className="btn-close"
// // //                     onClick={() => {
// // //                       setShowRejectModal(false);
// // //                       setRejectForId(null);
// // //                       setRejectReason("");
// // //                     }}
// // //                   />
// // //                 </div>

// // //                 <div className="modal-body">
// // //                   <textarea
// // //                     className="form-control"
// // //                     placeholder="Enter reason for rejection"
// // //                     value={rejectReason}
// // //                     onChange={(e) => setRejectReason(e.target.value)}
// // //                   />
// // //                 </div>

// // //                 <div className="modal-footer">
// // //                   <button className="btn btn-danger" onClick={submitReject}>
// // //                     Submit Reject
// // //                   </button>
// // //                   <button
// // //                     className="btn btn-secondary"
// // //                     onClick={() => {
// // //                       setShowRejectModal(false);
// // //                       setRejectForId(null);
// // //                       setRejectReason("");
// // //                     }}
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </AdminLayout>
// // //   );
// // // };

// // // export default MarketManagement;

// // import React, { useEffect, useState } from "react";
// // import AdminLayout from "../components/AdminLayout";

// // const MarketManagement = () => {
// //   const [requests, setRequests] = useState([]);
// //   const [showRejectModal, setShowRejectModal] = useState(false);
// //   const [rejectForId, setRejectForId] = useState(null);
// //   const [rejectReason, setRejectReason] = useState("");
// //   const [products, setProducts] = useState([]);
// //   const [showProductForm, setShowProductForm] = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     description: '',
// //     price: '',
// //     original_price: '',
// //     category: 'Grains',
// //     location: '',
// //     stock: '',
// //     organic: false,
// //     image: '🌾',
// //     image_url: '',
// //     rating: 4.5,
// //     reviews: 0
// //   });

// //   // Load data on component mount
// //   useEffect(() => {
// //     const storedRequests = JSON.parse(localStorage.getItem("cropRequests")) || [];
// //     setRequests(storedRequests);
    
// //     const storedProducts = JSON.parse(localStorage.getItem("marketplaceProducts")) || [];
// //     setProducts(storedProducts);
// //   }, []);

// //   const refreshData = () => {
// //     const storedRequests = JSON.parse(localStorage.getItem("cropRequests")) || [];
// //     setRequests(storedRequests);
    
// //     const storedProducts = JSON.parse(localStorage.getItem("marketplaceProducts")) || [];
// //     setProducts(storedProducts);
// //   };

// //   // Request Management Functions
// //   const acceptRequest = (reqId) => {
// //     const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
// //     const updated = stored.map((r) =>
// //       r.id === reqId ? { ...r, status: "Accepted", timestamp: Date.now() } : r
// //     );
// //     localStorage.setItem("cropRequests", JSON.stringify(updated));

// //     const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
// //     const reconciled = storedCrops.map((c) =>
// //       c.id === stored.find((s) => s.id === reqId)?.cropId
// //         ? { ...c, status: "Accepted", reason: "" }
// //         : c
// //     );
// //     localStorage.setItem("crops", JSON.stringify(reconciled));

// //     refreshData();
// //     alert("Request accepted.");
// //   };

// //   const openRejectModal = (reqId) => {
// //     setRejectForId(reqId);
// //     setRejectReason("");
// //     setShowRejectModal(true);
// //   };

// //   const submitReject = () => {
// //     if (!rejectReason.trim()) {
// //       alert("Please enter a reason for rejection.");
// //       return;
// //     }

// //     const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
// //     const updated = stored.map((r) =>
// //       r.id === rejectForId
// //         ? {
// //             ...r,
// //             status: "Rejected",
// //             reason: rejectReason,
// //             timestamp: Date.now(),
// //           }
// //         : r
// //     );
// //     localStorage.setItem("cropRequests", JSON.stringify(updated));

// //     const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
// //     const targetReq = updated.find((u) => u.id === rejectForId);

// //     const reconciled = storedCrops.map((c) =>
// //       c.id === targetReq.cropId
// //         ? { ...c, status: "Rejected", reason: rejectReason }
// //         : c
// //     );
// //     localStorage.setItem("crops", JSON.stringify(reconciled));

// //     setShowRejectModal(false);
// //     setRejectForId(null);
// //     setRejectReason("");
// //     refreshData();
// //     alert("Request rejected.");
// //   };

// //   const removeRequest = (reqId) => {
// //     const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
// //     const updated = stored.filter((r) => r.id !== reqId);
// //     localStorage.setItem("cropRequests", JSON.stringify(updated));
// //     refreshData();
// //   };

// //   // Product Management Functions
// //   const handleProductSubmit = (e) => {
// //     e.preventDefault();
    
// //     const newProduct = {
// //       id: editingProduct ? editingProduct.id : Date.now(),
// //       name: formData.name,
// //       description: formData.description,
// //       price: parseFloat(formData.price),
// //       originalPrice: formData.original_price ? parseFloat(formData.original_price) : parseFloat(formData.price),
// //       category: formData.category,
// //       location: formData.location,
// //       rating: parseFloat(formData.rating),
// //       reviews: parseInt(formData.reviews),
// //       stock: parseInt(formData.stock),
// //       organic: formData.organic,
// //       discount: formData.original_price ? 
// //         Math.round(((parseFloat(formData.original_price) - parseFloat(formData.price)) / parseFloat(formData.original_price)) * 100) : 0,
// //       image: formData.image,
// //       image_url: formData.image_url,
// //       isActive: true,
// //       createdAt: new Date().toISOString()
// //     };

// //     const updatedProducts = editingProduct 
// //       ? products.map(p => p.id === editingProduct.id ? newProduct : p)
// //       : [...products, newProduct];

// //     localStorage.setItem("marketplaceProducts", JSON.stringify(updatedProducts));
// //     setProducts(updatedProducts);
// //     setShowProductForm(false);
// //     setEditingProduct(null);
// //     resetForm();
    
// //     alert(editingProduct ? "Product updated successfully!" : "Product added to marketplace!");
// //   };

// //   const editProduct = (product) => {
// //     setEditingProduct(product);
// //     setFormData({
// //       name: product.name,
// //       description: product.description || '',
// //       price: product.price,
// //       original_price: product.originalPrice || '',
// //       category: product.category,
// //       location: product.location,
// //       stock: product.stock,
// //       organic: product.organic || false,
// //       image: product.image,
// //       image_url: product.image_url || '',
// //       rating: product.rating,
// //       reviews: product.reviews
// //     });
// //     setShowProductForm(true);
// //   };

// //   const toggleProductStatus = (productId) => {
// //     const updatedProducts = products.map(product =>
// //       product.id === productId 
// //         ? { ...product, isActive: !product.isActive }
// //         : product
// //     );
// //     localStorage.setItem("marketplaceProducts", JSON.stringify(updatedProducts));
// //     setProducts(updatedProducts);
// //   };

// //   const deleteProduct = (productId) => {
// //     if (window.confirm("Are you sure you want to delete this product?")) {
// //       const updatedProducts = products.filter(product => product.id !== productId);
// //       localStorage.setItem("marketplaceProducts", JSON.stringify(updatedProducts));
// //       setProducts(updatedProducts);
// //       alert("Product deleted successfully!");
// //     }
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       name: '',
// //       description: '',
// //       price: '',
// //       original_price: '',
// //       category: 'Grains',
// //       location: '',
// //       stock: '',
// //       organic: false,
// //       image: '🌾',
// //       image_url: '',
// //       rating: 4.5,
// //       reviews: 0
// //     });
// //   };

// //   const openAddProductForm = () => {
// //     setEditingProduct(null);
// //     resetForm();
// //     setShowProductForm(true);
// //   };

// //   // Filter requests and products
// //   const pendingRequests = requests.filter(req => req.status === "Pending");
// //   const activeProducts = products.filter(product => product.isActive);
// //   const inactiveProducts = products.filter(product => !product.isActive);

// //   return (
// //     <AdminLayout>
// //       <div
// //         className="container-fluid p-4"
// //         style={{
// //           minHeight: "100vh",
// //           background: "linear-gradient(90deg, #b3e6b1 0%, #b3e6b1 88%)",
// //         }}
// //       >
// //         <div className="row">
// //           {/* Header */}
// //           <div className="col-12">
// //             <div className="d-flex justify-content-between align-items-center mb-4">
// //               <h1 className="h3 text-dark fw-bold">Market Management</h1>
// //               <button 
// //                 className="btn btn-success"
// //                 onClick={openAddProductForm}
// //               >
// //                 <i className="bi bi-plus-circle me-2"></i>
// //                 Add New Product
// //               </button>
// //             </div>
// //           </div>

// //           {/* Stats Cards */}
// //           <div className="col-12 mb-4">
// //             <div className="row">
// //               <div className="col-md-3 mb-3">
// //                 <div className="card bg-primary text-white">
// //                   <div className="card-body">
// //                     <h5 className="card-title">Pending Requests</h5>
// //                     <h2 className="mb-0">{pendingRequests.length}</h2>
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="col-md-3 mb-3">
// //                 <div className="card bg-success text-white">
// //                   <div className="card-body">
// //                     <h5 className="card-title">Active Products</h5>
// //                     <h2 className="mb-0">{activeProducts.length}</h2>
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="col-md-3 mb-3">
// //                 <div className="card bg-warning text-white">
// //                   <div className="card-body">
// //                     <h5 className="card-title">Inactive Products</h5>
// //                     <h2 className="mb-0">{inactiveProducts.length}</h2>
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="col-md-3 mb-3">
// //                 <div className="card bg-info text-white">
// //                   <div className="card-body">
// //                     <h5 className="card-title">Total Products</h5>
// //                     <h2 className="mb-0">{products.length}</h2>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Pending Requests Section */}
// //           <div className="col-12 mb-5">
// //             <div className="card">
// //               <div className="card-header bg-warning">
// //                 <h5 className="card-title mb-0 text-white">
// //                   <i className="bi bi-clock-history me-2"></i>
// //                   Pending Crop Requests
// //                 </h5>
// //               </div>
// //               <div className="card-body">
// //                 {pendingRequests.length === 0 ? (
// //                   <div className="text-center py-4">
// //                     <i className="bi bi-check-circle display-4 text-muted"></i>
// //                     <p className="text-muted mt-2">No pending requests</p>
// //                   </div>
// //                 ) : (
// //                   <div className="table-responsive">
// //                     <table className="table table-striped">
// //                       <thead>
// //                         <tr>
// //                           <th>Crop Name</th>
// //                           <th>Farmer</th>
// //                           <th>Quantity</th>
// //                           <th>Price</th>
// //                           <th>Location</th>
// //                           <th>Actions</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {pendingRequests.map((request) => (
// //                           <tr key={request.id}>
// //                             <td>
// //                               <strong>{request.cropName}</strong>
// //                             </td>
// //                             <td>{request.farmerName}</td>
// //                             <td>{request.quantity} kg</td>
// //                             <td>₹{request.price}/kg</td>
// //                             <td>{request.location}</td>
// //                             <td>
// //                               <div className="btn-group">
// //                                 <button
// //                                   className="btn btn-success btn-sm"
// //                                   onClick={() => acceptRequest(request.id)}
// //                                 >
// //                                   <i className="bi bi-check-lg"></i> Accept
// //                                 </button>
// //                                 <button
// //                                   className="btn btn-danger btn-sm"
// //                                   onClick={() => openRejectModal(request.id)}
// //                                 >
// //                                   <i className="bi bi-x-lg"></i> Reject
// //                                 </button>
// //                               </div>
// //                             </td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Active Products Section */}
// //           <div className="col-12 mb-5">
// //             <div className="card">
// //               <div className="card-header bg-success text-white">
// //                 <h5 className="card-title mb-0">
// //                   <i className="bi bi-check-circle me-2"></i>
// //                   Active Marketplace Products ({activeProducts.length})
// //                 </h5>
// //               </div>
// //               <div className="card-body">
// //                 {activeProducts.length === 0 ? (
// //                   <div className="text-center py-4">
// //                     <i className="bi bi-grid display-4 text-muted"></i>
// //                     <p className="text-muted mt-2">No active products in marketplace</p>
// //                     <button className="btn btn-primary" onClick={openAddProductForm}>
// //                       Add Your First Product
// //                     </button>
// //                   </div>
// //                 ) : (
// //                   <div className="row">
// //                     {activeProducts.map((product) => (
// //                       <div key={product.id} className="col-md-6 col-lg-4 mb-4">
// //                         <div className="card h-100">
// //                           <div className="card-body">
// //                             <div className="d-flex justify-content-between align-items-start mb-3">
// //                               <span className="fs-1">{product.image}</span>
// //                               <div className="dropdown">
// //                                 <button className="btn btn-sm btn-outline-secondary dropdown-toggle" 
// //                                         type="button" data-bs-toggle="dropdown">
// //                                   <i className="bi bi-three-dots"></i>
// //                                 </button>
// //                                 <ul className="dropdown-menu">
// //                                   <li>
// //                                     <button className="dropdown-item" onClick={() => editProduct(product)}>
// //                                       <i className="bi bi-pencil me-2"></i>Edit
// //                                     </button>
// //                                   </li>
// //                                   <li>
// //                                     <button className="dropdown-item" onClick={() => toggleProductStatus(product.id)}>
// //                                       <i className="bi bi-pause-circle me-2"></i>Deactivate
// //                                     </button>
// //                                   </li>
// //                                   <li>
// //                                     <button className="dropdown-item text-danger" onClick={() => deleteProduct(product.id)}>
// //                                       <i className="bi bi-trash me-2"></i>Delete
// //                                     </button>
// //                                   </li>
// //                                 </ul>
// //                               </div>
// //                             </div>
// //                             <h6 className="card-title">{product.name}</h6>
// //                             <div className="mb-2">
// //                               <span className="fw-bold text-success">₹{product.price}</span>
// //                               {product.originalPrice > product.price && (
// //                                 <span className="text-muted text-decoration-line-through ms-2">
// //                                   ₹{product.originalPrice}
// //                                 </span>
// //                               )}
// //                               {product.discount > 0 && (
// //                                 <span className="badge bg-danger ms-2">{product.discount}% OFF</span>
// //                               )}
// //                             </div>
// //                             <div className="d-flex justify-content-between text-muted small mb-2">
// //                               <span>
// //                                 <i className="bi bi-geo-alt"></i> {product.location}
// //                               </span>
// //                               <span>
// //                                 <i className="bi bi-star-fill text-warning"></i> {product.rating}
// //                               </span>
// //                             </div>
// //                             <div className="d-flex justify-content-between align-items-center">
// //                               <span className={`badge ${
// //                                 product.stock > 50 ? 'bg-success' : 
// //                                 product.stock > 20 ? 'bg-warning' : 'bg-danger'
// //                               }`}>
// //                                 Stock: {product.stock} kg
// //                               </span>
// //                               {product.organic && (
// //                                 <span className="badge bg-success">🌿 Organic</span>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Inactive Products Section */}
// //           {inactiveProducts.length > 0 && (
// //             <div className="col-12">
// //               <div className="card">
// //                 <div className="card-header bg-secondary text-white">
// //                   <h5 className="card-title mb-0">
// //                     <i className="bi bi-pause-circle me-2"></i>
// //                     Inactive Products ({inactiveProducts.length})
// //                   </h5>
// //                 </div>
// //                 <div className="card-body">
// //                   <div className="table-responsive">
// //                     <table className="table table-striped">
// //                       <thead>
// //                         <tr>
// //                           <th>Product</th>
// //                           <th>Category</th>
// //                           <th>Price</th>
// //                           <th>Stock</th>
// //                           <th>Status</th>
// //                           <th>Actions</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {inactiveProducts.map((product) => (
// //                           <tr key={product.id}>
// //                             <td>
// //                               <div className="d-flex align-items-center">
// //                                 <span className="me-2 fs-5">{product.image}</span>
// //                                 <div>
// //                                   <strong>{product.name}</strong>
// //                                   <br />
// //                                   <small className="text-muted">{product.location}</small>
// //                                 </div>
// //                               </div>
// //                             </td>
// //                             <td>{product.category}</td>
// //                             <td>₹{product.price}</td>
// //                             <td>{product.stock} kg</td>
// //                             <td>
// //                               <span className="badge bg-secondary">Inactive</span>
// //                             </td>
// //                             <td>
// //                               <button
// //                                 className="btn btn-success btn-sm me-2"
// //                                 onClick={() => toggleProductStatus(product.id)}
// //                               >
// //                                 <i className="bi bi-play-circle"></i> Activate
// //                               </button>
// //                               <button
// //                                 className="btn btn-danger btn-sm"
// //                                 onClick={() => deleteProduct(product.id)}
// //                               >
// //                                 <i className="bi bi-trash"></i>
// //                               </button>
// //                             </td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Add/Edit Product Modal */}
// //         {showProductForm && (
// //           <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
// //             <div className="modal-dialog modal-lg">
// //               <div className="modal-content">
// //                 <div className="modal-header">
// //                   <h5 className="modal-title">
// //                     {editingProduct ? 'Edit Product' : 'Add New Product to Marketplace'}
// //                   </h5>
// //                   <button 
// //                     type="button" 
// //                     className="btn-close"
// //                     onClick={() => setShowProductForm(false)}
// //                   ></button>
// //                 </div>
// //                 <form onSubmit={handleProductSubmit}>
// //                   <div className="modal-body">
// //                     <div className="row">
// //                       <div className="col-md-6">
// //                         <div className="mb-3">
// //                           <label className="form-label">Product Name *</label>
// //                           <input
// //                             type="text"
// //                             className="form-control"
// //                             value={formData.name}
// //                             onChange={(e) => setFormData({...formData, name: e.target.value})}
// //                             required
// //                           />
// //                         </div>
// //                         <div className="mb-3">
// //                           <label className="form-label">Description</label>
// //                           <textarea
// //                             className="form-control"
// //                             rows="3"
// //                             value={formData.description}
// //                             onChange={(e) => setFormData({...formData, description: e.target.value})}
// //                             placeholder="Product description..."
// //                           />
// //                         </div>
// //                         <div className="row">
// //                           <div className="col-6">
// //                             <div className="mb-3">
// //                               <label className="form-label">Selling Price (₹) *</label>
// //                               <input
// //                                 type="number"
// //                                 step="0.01"
// //                                 className="form-control"
// //                                 value={formData.price}
// //                                 onChange={(e) => setFormData({...formData, price: e.target.value})}
// //                                 required
// //                               />
// //                             </div>
// //                           </div>
// //                           <div className="col-6">
// //                             <div className="mb-3">
// //                               <label className="form-label">Original Price (₹)</label>
// //                               <input
// //                                 type="number"
// //                                 step="0.01"
// //                                 className="form-control"
// //                                 value={formData.original_price}
// //                                 onChange={(e) => setFormData({...formData, original_price: e.target.value})}
// //                                 placeholder="For discount calculation"
// //                               />
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <div className="mb-3">
// //                           <label className="form-label">Stock Quantity (kg) *</label>
// //                           <input
// //                             type="number"
// //                             className="form-control"
// //                             value={formData.stock}
// //                             onChange={(e) => setFormData({...formData, stock: e.target.value})}
// //                             required
// //                           />
// //                         </div>
// //                       </div>
// //                       <div className="col-md-6">
// //                         <div className="mb-3">
// //                           <label className="form-label">Category *</label>
// //                           <select
// //                             className="form-select"
// //                             value={formData.category}
// //                             onChange={(e) => setFormData({...formData, category: e.target.value})}
// //                           >
// //                             <option value="Grains">Grains</option>
// //                             <option value="Vegetables">Vegetables</option>
// //                             <option value="Fruits">Fruits</option>
// //                             <option value="Dairy">Dairy</option>
// //                             <option value="Spices">Spices</option>
// //                           </select>
// //                         </div>
// //                         <div className="mb-3">
// //                           <label className="form-label">Location *</label>
// //                           <input
// //                             type="text"
// //                             className="form-control"
// //                             value={formData.location}
// //                             onChange={(e) => setFormData({...formData, location: e.target.value})}
// //                             required
// //                           />
// //                         </div>
// //                         <div className="row">
// //                           <div className="col-6">
// //                             <div className="mb-3">
// //                               <label className="form-label">Rating</label>
// //                               <input
// //                                 type="number"
// //                                 step="0.1"
// //                                 min="0"
// //                                 max="5"
// //                                 className="form-control"
// //                                 value={formData.rating}
// //                                 onChange={(e) => setFormData({...formData, rating: e.target.value})}
// //                               />
// //                             </div>
// //                           </div>
// //                           <div className="col-6">
// //                             <div className="mb-3">
// //                               <label className="form-label">Reviews Count</label>
// //                               <input
// //                                 type="number"
// //                                 className="form-control"
// //                                 value={formData.reviews}
// //                                 onChange={(e) => setFormData({...formData, reviews: e.target.value})}
// //                               />
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <div className="mb-3">
// //                           <label className="form-label">Image (Emoji or URL)</label>
// //                           <input
// //                             type="text"
// //                             className="form-control"
// //                             value={formData.image}
// //                             onChange={(e) => setFormData({...formData, image: e.target.value})}
// //                             placeholder="🌾 or image URL"
// //                           />
// //                         </div>
// //                         <div className="form-check mb-3">
// //                           <input
// //                             type="checkbox"
// //                             className="form-check-input"
// //                             checked={formData.organic}
// //                             onChange={(e) => setFormData({...formData, organic: e.target.checked})}
// //                           />
// //                           <label className="form-check-label">Mark as Organic Product</label>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="modal-footer">
// //                     <button 
// //                       type="button" 
// //                       className="btn btn-secondary"
// //                       onClick={() => setShowProductForm(false)}
// //                     >
// //                       Cancel
// //                     </button>
// //                     <button type="submit" className="btn btn-success">
// //                       {editingProduct ? 'Update Product' : 'Add to Marketplace'}
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Reject Modal */}
// //         {showRejectModal && (
// //           <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
// //             <div className="modal-dialog">
// //               <div className="modal-content">
// //                 <div className="modal-header">
// //                   <h5 className="modal-title">Reject Crop Request</h5>
// //                   <button 
// //                     type="button" 
// //                     className="btn-close"
// //                     onClick={() => setShowRejectModal(false)}
// //                   ></button>
// //                 </div>
// //                 <div className="modal-body">
// //                   <div className="mb-3">
// //                     <label className="form-label">Reason for Rejection *</label>
// //                     <textarea
// //                       className="form-control"
// //                       rows="3"
// //                       value={rejectReason}
// //                       onChange={(e) => setRejectReason(e.target.value)}
// //                       placeholder="Please provide a reason for rejecting this request..."
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="modal-footer">
// //                   <button 
// //                     type="button" 
// //                     className="btn btn-secondary"
// //                     onClick={() => setShowRejectModal(false)}
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button 
// //                     type="button" 
// //                     className="btn btn-danger"
// //                     onClick={submitReject}
// //                   >
// //                     Reject Request
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Bootstrap Icons */}
// //       <link
// //         rel="stylesheet"
// //         href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
// //       />
// //     </AdminLayout>
// //   );
// // };

// // export default MarketManagement;



// import React, { useEffect, useState } from "react";
// import AdminLayout from "../components/AdminLayout";

// const MarketManagement = () => {
//   const [requests, setRequests] = useState([]);
//   const [backendCrops, setBackendCrops] = useState([]);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [rejectForId, setRejectForId] = useState(null);
//   const [rejectReason, setRejectReason] = useState("");
//   const [products, setProducts] = useState([]);
//   const [showProductForm, setShowProductForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     original_price: '',
//     category: 'Grains',
//     location: '',
//     stock: '',
//     organic: false,
//     image: '🌾',
//     image_url: '',
//     rating: 4.5,
//     reviews: 0
//   });

//   // Load data on component mount
//   useEffect(() => {
//     loadAllData();
//   }, []);

//   const loadAllData = async () => {
//     try {
//       setLoading(true);
      
//       // Load local storage data
//       const storedRequests = JSON.parse(localStorage.getItem("cropRequests")) || [];
//       setRequests(storedRequests);
      
//       const storedProducts = JSON.parse(localStorage.getItem("marketplaceProducts")) || [];
//       setProducts(storedProducts);

//       // Load backend crops
//       await fetchBackendCrops();
//     } catch (error) {
//       console.error("Error loading data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch crops from backend
//   const fetchBackendCrops = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/crops/all/");
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log("Backend crops data:", data);
      
//       if (data && data.crops && Array.isArray(data.crops)) {
//         setBackendCrops(data.crops);
//       } else {
//         setBackendCrops([]);
//       }
//     } catch (error) {
//       console.error("Error fetching backend crops:", error);
//       setBackendCrops([]);
//     }
//   };

//   const refreshData = () => {
//     loadAllData();
//   };

//   // Combine local requests and backend crops for display
//   const getPendingRequests = () => {
//     // Local storage requests with status "Pending"
//     const localPending = requests.filter(req => req.status === "Pending");
    
//     // Backend crops with status "PendingAdmin" or "FarmerAccepted"
//     const backendPending = backendCrops
//       .filter(crop => crop.status === "PendingAdmin" || crop.status === "FarmerAccepted")
//       .map(crop => ({
//         id: `backend-${crop.id}`, // Prefix to avoid ID conflicts
//         cropId: crop.id,
//         cropName: crop.cropName,
//         farmerName: crop.farmerName || "Farmer",
//         quantity: crop.quantity,
//         price: crop.priceByAI || crop.mlResult?.predictedPrice || 0,
//         location: crop.location,
//         description: crop.description,
//         status: "Pending",
//         isBackend: true, // Flag to identify backend crops
//         backendData: crop // Keep original backend data
//       }));

//     return [...localPending, ...backendPending];
//   };

//   // Request Management Functions
//   const acceptRequest = async (requestId) => {
//     // Check if it's a backend crop
//     if (requestId.startsWith('backend-')) {
//       const cropId = requestId.replace('backend-', '');
//       await updateBackendCropStatus(cropId, "AdminApproved");
//     } else {
//       // Local storage handling
//       const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
//       const updated = stored.map((r) =>
//         r.id === requestId ? { ...r, status: "Accepted", timestamp: Date.now() } : r
//       );
//       localStorage.setItem("cropRequests", JSON.stringify(updated));

//       const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
//       const reconciled = storedCrops.map((c) =>
//         c.id === stored.find((s) => s.id === requestId)?.cropId
//           ? { ...c, status: "Accepted", reason: "" }
//           : c
//       );
//       localStorage.setItem("crops", JSON.stringify(reconciled));
//     }

//     refreshData();
//     alert("Request accepted.");
//   };

//   const updateBackendCropStatus = async (cropId, newStatus) => {
//     try {
//       const response = await fetch(`http://localhost:8000/crops/${cropId}/update-status/`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           status: newStatus
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error("Error updating backend crop status:", error);
//       throw error;
//     }
//   };

//   const openRejectModal = (requestId) => {
//     setRejectForId(requestId);
//     setRejectReason("");
//     setShowRejectModal(true);
//   };

//   const submitReject = async () => {
//     if (!rejectReason.trim()) {
//       alert("Please enter a reason for rejection.");
//       return;
//     }

//     // Check if it's a backend crop
//     if (rejectForId.startsWith('backend-')) {
//       const cropId = rejectForId.replace('backend-', '');
//       try {
//         await updateBackendCropStatus(cropId, "Rejected");
//         alert("Request rejected.");
//       } catch (error) {
//         alert("Failed to reject request. Please try again.");
//       }
//     } else {
//       // Local storage handling
//       const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
//       const updated = stored.map((r) =>
//         r.id === rejectForId
//           ? {
//               ...r,
//               status: "Rejected",
//               reason: rejectReason,
//               timestamp: Date.now(),
//             }
//           : r
//       );
//       localStorage.setItem("cropRequests", JSON.stringify(updated));

//       const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
//       const targetReq = updated.find((u) => u.id === rejectForId);

//       const reconciled = storedCrops.map((c) =>
//         c.id === targetReq.cropId
//           ? { ...c, status: "Rejected", reason: rejectReason }
//           : c
//       );
//       localStorage.setItem("crops", JSON.stringify(reconciled));
//       alert("Request rejected.");
//     }

//     setShowRejectModal(false);
//     setRejectForId(null);
//     setRejectReason("");
//     refreshData();
//   };

//   const removeRequest = (requestId) => {
//     if (requestId.startsWith('backend-')) {
//       alert("Backend crops cannot be removed from this panel.");
//       return;
//     }
    
//     const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
//     const updated = stored.filter((r) => r.id !== requestId);
//     localStorage.setItem("cropRequests", JSON.stringify(updated));
//     refreshData();
//   };

//   // Product Management Functions
//   const handleProductSubmit = (e) => {
//     e.preventDefault();
    
//     const newProduct = {
//       id: editingProduct ? editingProduct.id : Date.now(),
//       name: formData.name,
//       description: formData.description,
//       price: parseFloat(formData.price),
//       originalPrice: formData.original_price ? parseFloat(formData.original_price) : parseFloat(formData.price),
//       category: formData.category,
//       location: formData.location,
//       rating: parseFloat(formData.rating),
//       reviews: parseInt(formData.reviews),
//       stock: parseInt(formData.stock),
//       organic: formData.organic,
//       discount: formData.original_price ? 
//         Math.round(((parseFloat(formData.original_price) - parseFloat(formData.price)) / parseFloat(formData.original_price)) * 100) : 0,
//       image: formData.image,
//       image_url: formData.image_url,
//       isActive: true,
//       createdAt: new Date().toISOString()
//     };

//     const updatedProducts = editingProduct 
//       ? products.map(p => p.id === editingProduct.id ? newProduct : p)
//       : [...products, newProduct];

//     localStorage.setItem("marketplaceProducts", JSON.stringify(updatedProducts));
//     setProducts(updatedProducts);
//     setShowProductForm(false);
//     setEditingProduct(null);
//     resetForm();
    
//     alert(editingProduct ? "Product updated successfully!" : "Product added to marketplace!");
//   };

//   const editProduct = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       description: product.description || '',
//       price: product.price,
//       original_price: product.originalPrice || '',
//       category: product.category,
//       location: product.location,
//       stock: product.stock,
//       organic: product.organic || false,
//       image: product.image,
//       image_url: product.image_url || '',
//       rating: product.rating,
//       reviews: product.reviews
//     });
//     setShowProductForm(true);
//   };

//   const toggleProductStatus = (productId) => {
//     const updatedProducts = products.map(product =>
//       product.id === productId 
//         ? { ...product, isActive: !product.isActive }
//         : product
//     );
//     localStorage.setItem("marketplaceProducts", JSON.stringify(updatedProducts));
//     setProducts(updatedProducts);
//   };

//   const deleteProduct = (productId) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       const updatedProducts = products.filter(product => product.id !== productId);
//       localStorage.setItem("marketplaceProducts", JSON.stringify(updatedProducts));
//       setProducts(updatedProducts);
//       alert("Product deleted successfully!");
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       description: '',
//       price: '',
//       original_price: '',
//       category: 'Grains',
//       location: '',
//       stock: '',
//       organic: false,
//       image: '🌾',
//       image_url: '',
//       rating: 4.5,
//       reviews: 0
//     });
//   };

//   const openAddProductForm = () => {
//     setEditingProduct(null);
//     resetForm();
//     setShowProductForm(true);
//   };

//   // Filter requests and products
//   const pendingRequests = getPendingRequests();
//   const activeProducts = products.filter(product => product.isActive);
//   const inactiveProducts = products.filter(product => !product.isActive);

//   if (loading) {
//     return (
//       <AdminLayout>
//         <div className="container-fluid p-4 text-center">
//           <div className="spinner-border text-success" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-3">Loading market data...</p>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <AdminLayout>
//       <div
//         className="container-fluid p-4"
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(90deg, #b3e6b1 0%, #b3e6b1 88%)",
//         }}
//       >
//         <div className="row">
//           {/* Header */}
//           <div className="col-12">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <h1 className="h3 text-dark fw-bold">Market Management</h1>
//               <div>
//                 <button 
//                   className="btn btn-outline-primary me-2"
//                   onClick={refreshData}
//                 >
//                   <i className="bi bi-arrow-clockwise me-2"></i>
//                   Refresh
//                 </button>
//                 <button 
//                   className="btn btn-success"
//                   onClick={openAddProductForm}
//                 >
//                   <i className="bi bi-plus-circle me-2"></i>
//                   Add New Product
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="col-12 mb-4">
//             <div className="row">
//               <div className="col-md-3 mb-3">
//                 <div className="card bg-primary text-white">
//                   <div className="card-body">
//                     <h5 className="card-title">Pending Requests</h5>
//                     <h2 className="mb-0">{pendingRequests.length}</h2>
//                     <small>
//                       {pendingRequests.filter(r => !r.isBackend).length} Local + 
//                       {pendingRequests.filter(r => r.isBackend).length} Backend
//                     </small>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-3 mb-3">
//                 <div className="card bg-success text-white">
//                   <div className="card-body">
//                     <h5 className="card-title">Active Products</h5>
//                     <h2 className="mb-0">{activeProducts.length}</h2>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-3 mb-3">
//                 <div className="card bg-warning text-white">
//                   <div className="card-body">
//                     <h5 className="card-title">Inactive Products</h5>
//                     <h2 className="mb-0">{inactiveProducts.length}</h2>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-3 mb-3">
//                 <div className="card bg-info text-white">
//                   <div className="card-body">
//                     <h5 className="card-title">Total Backend Crops</h5>
//                     <h2 className="mb-0">{backendCrops.length}</h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Pending Requests Section */}
//           <div className="col-12 mb-5">
//             <div className="card">
//               <div className="card-header bg-warning">
//                 <h5 className="card-title mb-0 text-white">
//                   <i className="bi bi-clock-history me-2"></i>
//                   Pending Crop Requests ({pendingRequests.length})
//                 </h5>
//               </div>
//               <div className="card-body">
//                 {pendingRequests.length === 0 ? (
//                   <div className="text-center py-4">
//                     <i className="bi bi-check-circle display-4 text-muted"></i>
//                     <p className="text-muted mt-2">No pending requests</p>
//                   </div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="table table-striped">
//                       <thead>
//                         <tr>
//                           <th>Source</th>
//                           <th>Crop Name</th>
//                           <th>Farmer</th>
//                           <th>Quantity</th>
//                           <th>Price</th>
//                           <th>Location</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {pendingRequests.map((request) => (
//                           <tr key={request.id}>
//                             <td>
//                               {request.isBackend ? (
//                                 <span className="badge bg-info">Backend</span>
//                               ) : (
//                                 <span className="badge bg-secondary">Local</span>
//                               )}
//                             </td>
//                             <td>
//                               <strong>{request.cropName}</strong>
//                               {request.description && (
//                                 <small className="text-muted d-block">{request.description}</small>
//                               )}
//                             </td>
//                             <td>{request.farmerName}</td>
//                             <td>{request.quantity} kg</td>
//                             <td>₹{request.price}/kg</td>
//                             <td>{request.location}</td>
//                             <td>
//                               {request.isBackend ? (
//                                 <span className="badge bg-warning">
//                                   {request.backendData?.status || 'Pending'}
//                                 </span>
//                               ) : (
//                                 <span className="badge bg-warning">Pending</span>
//                               )}
//                             </td>
//                             <td>
//                               <div className="btn-group">
//                                 <button
//                                   className="btn btn-success btn-sm"
//                                   onClick={() => acceptRequest(request.id)}
//                                 >
//                                   <i className="bi bi-check-lg"></i> Accept
//                                 </button>
//                                 <button
//                                   className="btn btn-danger btn-sm"
//                                   onClick={() => openRejectModal(request.id)}
//                                 >
//                                   <i className="bi bi-x-lg"></i> Reject
//                                 </button>
//                                 {!request.isBackend && (
//                                   <button
//                                     className="btn btn-outline-secondary btn-sm"
//                                     onClick={() => removeRequest(request.id)}
//                                     title="Remove from list"
//                                   >
//                                     <i className="bi bi-trash"></i>
//                                   </button>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Active Products Section */}
//           <div className="col-12 mb-5">
//             <div className="card">
//               <div className="card-header bg-success text-white">
//                 <h5 className="card-title mb-0">
//                   <i className="bi bi-check-circle me-2"></i>
//                   Active Marketplace Products ({activeProducts.length})
//                 </h5>
//               </div>
//               <div className="card-body">
//                 {activeProducts.length === 0 ? (
//                   <div className="text-center py-4">
//                     <i className="bi bi-grid display-4 text-muted"></i>
//                     <p className="text-muted mt-2">No active products in marketplace</p>
//                     <button className="btn btn-primary" onClick={openAddProductForm}>
//                       Add Your First Product
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="row">
//                     {activeProducts.map((product) => (
//                       <div key={product.id} className="col-md-6 col-lg-4 mb-4">
//                         <div className="card h-100">
//                           <div className="card-body">
//                             <div className="d-flex justify-content-between align-items-start mb-3">
//                               <span className="fs-1">{product.image}</span>
//                               <div className="dropdown">
//                                 <button className="btn btn-sm btn-outline-secondary dropdown-toggle" 
//                                         type="button" data-bs-toggle="dropdown">
//                                   <i className="bi bi-three-dots"></i>
//                                 </button>
//                                 <ul className="dropdown-menu">
//                                   <li>
//                                     <button className="dropdown-item" onClick={() => editProduct(product)}>
//                                       <i className="bi bi-pencil me-2"></i>Edit
//                                     </button>
//                                   </li>
//                                   <li>
//                                     <button className="dropdown-item" onClick={() => toggleProductStatus(product.id)}>
//                                       <i className="bi bi-pause-circle me-2"></i>Deactivate
//                                     </button>
//                                   </li>
//                                   <li>
//                                     <button className="dropdown-item text-danger" onClick={() => deleteProduct(product.id)}>
//                                       <i className="bi bi-trash me-2"></i>Delete
//                                     </button>
//                                   </li>
//                                 </ul>
//                               </div>
//                             </div>
//                             <h6 className="card-title">{product.name}</h6>
//                             <div className="mb-2">
//                               <span className="fw-bold text-success">₹{product.price}</span>
//                               {product.originalPrice > product.price && (
//                                 <span className="text-muted text-decoration-line-through ms-2">
//                                   ₹{product.originalPrice}
//                                 </span>
//                               )}
//                               {product.discount > 0 && (
//                                 <span className="badge bg-danger ms-2">{product.discount}% OFF</span>
//                               )}
//                             </div>
//                             <div className="d-flex justify-content-between text-muted small mb-2">
//                               <span>
//                                 <i className="bi bi-geo-alt"></i> {product.location}
//                               </span>
//                               <span>
//                                 <i className="bi bi-star-fill text-warning"></i> {product.rating}
//                               </span>
//                             </div>
//                             <div className="d-flex justify-content-between align-items-center">
//                               <span className={`badge ${
//                                 product.stock > 50 ? 'bg-success' : 
//                                 product.stock > 20 ? 'bg-warning' : 'bg-danger'
//                               }`}>
//                                 Stock: {product.stock} kg
//                               </span>
//                               {product.organic && (
//                                 <span className="badge bg-success">🌿 Organic</span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Inactive Products Section */}
//           {inactiveProducts.length > 0 && (
//             <div className="col-12">
//               <div className="card">
//                 <div className="card-header bg-secondary text-white">
//                   <h5 className="card-title mb-0">
//                     <i className="bi bi-pause-circle me-2"></i>
//                     Inactive Products ({inactiveProducts.length})
//                   </h5>
//                 </div>
//                 <div className="card-body">
//                   <div className="table-responsive">
//                     <table className="table table-striped">
//                       <thead>
//                         <tr>
//                           <th>Product</th>
//                           <th>Category</th>
//                           <th>Price</th>
//                           <th>Stock</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {inactiveProducts.map((product) => (
//                           <tr key={product.id}>
//                             <td>
//                               <div className="d-flex align-items-center">
//                                 <span className="me-2 fs-5">{product.image}</span>
//                                 <div>
//                                   <strong>{product.name}</strong>
//                                   <br />
//                                   <small className="text-muted">{product.location}</small>
//                                 </div>
//                               </div>
//                             </td>
//                             <td>{product.category}</td>
//                             <td>₹{product.price}</td>
//                             <td>{product.stock} kg</td>
//                             <td>
//                               <span className="badge bg-secondary">Inactive</span>
//                             </td>
//                             <td>
//                               <button
//                                 className="btn btn-success btn-sm me-2"
//                                 onClick={() => toggleProductStatus(product.id)}
//                               >
//                                 <i className="bi bi-play-circle"></i> Activate
//                               </button>
//                               <button
//                                 className="btn btn-danger btn-sm"
//                                 onClick={() => deleteProduct(product.id)}
//                               >
//                                 <i className="bi bi-trash"></i>
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Add/Edit Product Modal */}
//         {showProductForm && (
//           <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">
//                     {editingProduct ? 'Edit Product' : 'Add New Product to Marketplace'}
//                   </h5>
//                   <button 
//                     type="button" 
//                     className="btn-close"
//                     onClick={() => setShowProductForm(false)}
//                   ></button>
//                 </div>
//                 <form onSubmit={handleProductSubmit}>
//                   <div className="modal-body">
//                     <div className="row">
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Product Name *</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             value={formData.name}
//                             onChange={(e) => setFormData({...formData, name: e.target.value})}
//                             required
//                           />
//                         </div>
//                         <div className="mb-3">
//                           <label className="form-label">Description</label>
//                           <textarea
//                             className="form-control"
//                             rows="3"
//                             value={formData.description}
//                             onChange={(e) => setFormData({...formData, description: e.target.value})}
//                             placeholder="Product description..."
//                           />
//                         </div>
//                         <div className="row">
//                           <div className="col-6">
//                             <div className="mb-3">
//                               <label className="form-label">Selling Price (₹) *</label>
//                               <input
//                                 type="number"
//                                 step="0.01"
//                                 className="form-control"
//                                 value={formData.price}
//                                 onChange={(e) => setFormData({...formData, price: e.target.value})}
//                                 required
//                               />
//                             </div>
//                           </div>
//                           <div className="col-6">
//                             <div className="mb-3">
//                               <label className="form-label">Original Price (₹)</label>
//                               <input
//                                 type="number"
//                                 step="0.01"
//                                 className="form-control"
//                                 value={formData.original_price}
//                                 onChange={(e) => setFormData({...formData, original_price: e.target.value})}
//                                 placeholder="For discount calculation"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="mb-3">
//                           <label className="form-label">Stock Quantity (kg) *</label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             value={formData.stock}
//                             onChange={(e) => setFormData({...formData, stock: e.target.value})}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Category *</label>
//                           <select
//                             className="form-select"
//                             value={formData.category}
//                             onChange={(e) => setFormData({...formData, category: e.target.value})}
//                           >
//                             <option value="Grains">Grains</option>
//                             <option value="Vegetables">Vegetables</option>
//                             <option value="Fruits">Fruits</option>
//                             <option value="Dairy">Dairy</option>
//                             <option value="Spices">Spices</option>
//                           </select>
//                         </div>
//                         <div className="mb-3">
//                           <label className="form-label">Location *</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             value={formData.location}
//                             onChange={(e) => setFormData({...formData, location: e.target.value})}
//                             required
//                           />
//                         </div>
//                         <div className="row">
//                           <div className="col-6">
//                             <div className="mb-3">
//                               <label className="form-label">Rating</label>
//                               <input
//                                 type="number"
//                                 step="0.1"
//                                 min="0"
//                                 max="5"
//                                 className="form-control"
//                                 value={formData.rating}
//                                 onChange={(e) => setFormData({...formData, rating: e.target.value})}
//                               />
//                             </div>
//                           </div>
//                           <div className="col-6">
//                             <div className="mb-3">
//                               <label className="form-label">Reviews Count</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 value={formData.reviews}
//                                 onChange={(e) => setFormData({...formData, reviews: e.target.value})}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="mb-3">
//                           <label className="form-label">Image (Emoji or URL)</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             value={formData.image}
//                             onChange={(e) => setFormData({...formData, image: e.target.value})}
//                             placeholder="🌾 or image URL"
//                           />
//                         </div>
//                         <div className="form-check mb-3">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             checked={formData.organic}
//                             onChange={(e) => setFormData({...formData, organic: e.target.checked})}
//                           />
//                           <label className="form-check-label">Mark as Organic Product</label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button 
//                       type="button" 
//                       className="btn btn-secondary"
//                       onClick={() => setShowProductForm(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn btn-success">
//                       {editingProduct ? 'Update Product' : 'Add to Marketplace'}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reject Modal */}
//         {showRejectModal && (
//           <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Reject Crop Request</h5>
//                   <button 
//                     type="button" 
//                     className="btn-close"
//                     onClick={() => setShowRejectModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">Reason for Rejection *</label>
//                     <textarea
//                       className="form-control"
//                       rows="3"
//                       value={rejectReason}
//                       onChange={(e) => setRejectReason(e.target.value)}
//                       placeholder="Please provide a reason for rejecting this request..."
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button 
//                     type="button" 
//                     className="btn btn-secondary"
//                     onClick={() => setShowRejectModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="button" 
//                     className="btn btn-danger"
//                     onClick={submitReject}
//                   >
//                     Reject Request
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bootstrap Icons */}
//         <link
//           rel="stylesheet"
//           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
//         />
//       </div>
//     </AdminLayout>
//   );
// };

// export default MarketManagement;





import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const MarketManagement = () => {
  const [requests, setRequests] = useState([]);
  const [backendCrops, setBackendCrops] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectForId, setRejectForId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadedImages, setUploadedImages] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category: 'Grains',
    location: '',
    stock: '',
    organic: false,
    rating: 4.5,
    reviews: 0
  });

  // Load data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
     
      // Load local storage data
      const storedRequests = JSON.parse(localStorage.getItem("cropRequests")) || [];
      setRequests(storedRequests);
     
      const storedProducts = JSON.parse(localStorage.getItem("marketplaceProducts")) || [];
      setProducts(storedProducts);
      
      // Load backend crops
      await fetchBackendCrops();
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch crops from backend
  const fetchBackendCrops = async () => {
    try {
      const response = await fetch("http://localhost:8000/crops/all/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Backend crops data:", data);
     
      if (data && data.crops && Array.isArray(data.crops)) {
        setBackendCrops(data.crops);
      } else {
        setBackendCrops([]);
      }
    } catch (error) {
      console.error("Error fetching backend crops:", error);
      setBackendCrops([]);
    }
  };

  // Image upload handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setUploadedImages(prev => [...prev, ...newImages].slice(0, 5)); // Limit to 5 images
  };

  // Remove uploaded image
  const removeUploadedImage = (index) => {
    setUploadedImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview); // Clean up memory
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const refreshData = () => {
    loadAllData();
  };

  // Combine local requests and backend crops for display
  const getPendingRequests = () => {
    // Local storage requests with status "Pending"
    const localPending = requests.filter(req => req.status === "Pending").map(req => ({
      ...req,
      images: req.images || [] // Assume local requests may have images array
    }));
   
    // Backend crops with status "PendingAdmin" or "FarmerAccepted"
    const backendPending = backendCrops
      .filter(crop => crop.status === "PendingAdmin" || crop.status === "FarmerAccepted")
      .map(crop => ({
        id: `backend-${crop.id}`, // Prefix to avoid ID conflicts
        cropId: crop.id,
        cropName: crop.cropName,
        farmerName: crop.farmerName || "Farmer",
        quantity: crop.quantity,
        price: crop.priceByAI || crop.mlResult?.predictedPrice || 0,
        location: crop.location,
        description: crop.description,
        status: "Pending",
        category: crop.category || 'Grains', // Assume category if available
        organic: crop.organic || false,
        images: crop.images || crop.image_urls || [], // Assume array of up to 5 images
        isBackend: true, // Flag to identify backend crops
        backendData: crop // Keep original backend data
      }));
    return [...localPending, ...backendPending];
  };

  // Open accept modal with pre-populated form
  const handleAccept = (requestId) => {
    const request = getPendingRequests().find(r => r.id === requestId);
    if (!request) return;

    setSelectedRequest(request);
    setUploadedImages([]); // Reset uploaded images
    
    const defaultFormData = {
      name: request.cropName || request.name || '',
      description: request.description || '',
      price: request.price || '',
      original_price: '',
      category: request.category || 'Grains',
      location: request.location || '',
      stock: request.quantity || '',
      organic: request.organic || false,
      rating: 4.5,
      reviews: 0
    };
    setFormData(defaultFormData);
    setEditingProduct(null);
    setIsAccepting(true);
    setShowProductForm(true);
  };

  // Update backend crop status
  const updateBackendCropStatus = async (cropId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/crops/${cropId}/update-status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus
        })
      });
     
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
     
      return await response.json();
    } catch (error) {
      console.error("Error updating backend crop status:", error);
      throw error;
    }
  };

  // Product Management Functions
  // const handleProductSubmit = async (e) => {
  //   e.preventDefault();
   
  //   try {
  //     let imageUrls = [];

  //     // Upload images if any were added
  //     if (uploadedImages.length > 0) {
  //       const formData = new FormData();
  //       uploadedImages.forEach((img, index) => {
  //         formData.append('images', img.file);
  //       });

  //       const uploadResponse = await fetch('http://localhost:8000/api/upload-images/', {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       if (uploadResponse.ok) {
  //         const uploadResult = await uploadResponse.json();
  //         imageUrls = uploadResult.image_urls.map(url => `http://localhost:8000${url}`);
  //       } else {
  //         throw new Error('Image upload failed');
  //       }
  //     }

  //     // If no new images uploaded but we're accepting a request with existing images, use those
  //     if (imageUrls.length === 0 && isAccepting && selectedRequest && selectedRequest.images) {
  //       imageUrls = selectedRequest.images;
  //     }

  //     const newProduct = {
  //       id: editingProduct ? editingProduct.id : Date.now(),
  //       name: formData.name,
  //       description: formData.description,
  //       price: parseFloat(formData.price),
  //       originalPrice: formData.original_price ? parseFloat(formData.original_price) : parseFloat(formData.price),
  //       category: formData.category,
  //       location: formData.location,
  //       rating: parseFloat(formData.rating),
  //       reviews: parseInt(formData.reviews),
  //       stock: parseInt(formData.stock),
  //       organic: formData.organic,
  //       discount: formData.original_price ?
  //         Math.round(((parseFloat(formData.original_price) - parseFloat(formData.price)) / parseFloat(formData.original_price)) * 100) : 0,
  //       images: imageUrls, // Store array of image URLs
  //       isActive: true,
  //       createdAt: new Date().toISOString()
  //     };

  //     const updatedProducts = editingProduct
  //       ? products.map(p => p.id === editingProduct.id ? newProduct : p)
  //       : [...products, newProduct];
      
  //     localStorage.setItem("marketplaceProducts", JSON.stringify(updatedProducts));
  //     setProducts(updatedProducts);

  //     // If accepting a request, update the request status after adding product
  //     if (isAccepting && selectedRequest) {
  //       try {
  //         if (selectedRequest.isBackend) {
  //           const cropId = selectedRequest.cropId;
  //           await updateBackendCropStatus(cropId, "AdminApproved");
  //         } else {
  //           // Local storage handling
  //           const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
  //           const updatedRequests = stored.map((r) =>
  //             r.id === selectedRequest.id ? { ...r, status: "Accepted", timestamp: Date.now() } : r
  //           );
  //           localStorage.setItem("cropRequests", JSON.stringify(updatedRequests));
  //           const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
  //           const targetReq = updatedRequests.find((u) => u.id === selectedRequest.id);
  //           const reconciled = storedCrops.map((c) =>
  //             c.id === targetReq?.cropId
  //               ? { ...c, status: "Accepted", reason: "" }
  //               : c
  //           );
  //           localStorage.setItem("crops", JSON.stringify(reconciled));
  //         }
  //       } catch (error) {
  //         console.error("Error updating request status:", error);
  //         alert("Product added, but failed to update request status. Please refresh.");
  //       }
  //       setIsAccepting(false);
  //       setSelectedRequest(null);
  //     }

  //     // Clean up
  //     setUploadedImages([]);
  //     setShowProductForm(false);
  //     setEditingProduct(null);
  //     resetForm();
     
  //     alert(editingProduct ? "Product updated successfully!" : "Product added to marketplace!");
  //     refreshData();
      
  //   } catch (error) {
  //     console.error('Error submitting product:', error);
  //     alert('Error submitting product. Please try again.');
  //   }
  // };

  // Update the handleProductSubmit function in MarketManagement.jsx
const handleProductSubmit = async (e) => {
  e.preventDefault();
 
  try {
    let imageUrls = [];

    // Upload images if any were added
    if (uploadedImages.length > 0) {
      const uploadFormData = new FormData();
      uploadedImages.forEach((img, index) => {
        uploadFormData.append('images', img.file); // Use 'images' as field name
      });

      console.log('Uploading images...', uploadedImages.length);
      
      const uploadResponse = await fetch('http://localhost:8000/api/upload-images/', {
        method: 'POST',
        body: uploadFormData,
        // Don't set Content-Type header for FormData - browser will set it automatically with boundary
      });

      console.log('Upload response status:', uploadResponse.status);
      
      if (uploadResponse.ok) {
        const uploadResult = await uploadResponse.json();
        console.log('Upload result:', uploadResult);
        
        if (uploadResult.success && uploadResult.image_urls) {
          // Convert relative URLs to absolute URLs
          imageUrls = uploadResult.image_urls.map(url => `http://localhost:8000${url}`);
          console.log('Processed image URLs:', imageUrls);
        } else {
          throw new Error(uploadResult.error || 'Image upload failed');
        }
      } else {
        const errorText = await uploadResponse.text();
        console.error('Upload failed:', errorText);
        throw new Error(`Upload failed with status: ${uploadResponse.status}`);
      }
    }

    // If no new images uploaded but we're accepting a request with existing images, use those
    if (imageUrls.length === 0 && isAccepting && selectedRequest && selectedRequest.images) {
      imageUrls = selectedRequest.images;
      console.log('Using existing crop images:', imageUrls);
    }

    // If still no images and we're adding a new product (not accepting), use a default image
    if (imageUrls.length === 0 && !isAccepting && !editingProduct) {
      imageUrls = ['/assets/default-product.jpg']; // Add a default image path
      console.log('Using default image');
    }

    const newProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.original_price ? parseFloat(formData.original_price) : parseFloat(formData.price),
      category: formData.category,
      location: formData.location,
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      stock: parseInt(formData.stock),
      organic: formData.organic,
      discount: formData.original_price ?
        Math.round(((parseFloat(formData.original_price) - parseFloat(formData.price)) / parseFloat(formData.original_price)) * 100) : 0,
      images: imageUrls, // Store array of image URLs
      isActive: true,
      createdAt: new Date().toISOString()
    };

    console.log('New product data:', newProduct);

    const updatedProducts = editingProduct
      ? products.map(p => p.id === editingProduct.id ? newProduct : p)
      : [...products, newProduct];
    
    localStorage.setItem("marketplaceProducts", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    // If accepting a request, update the request status after adding product
    if (isAccepting && selectedRequest) {
      try {
        if (selectedRequest.isBackend) {
          const cropId = selectedRequest.cropId;
          await updateBackendCropStatus(cropId, "AdminApproved");
        } else {
          // Local storage handling
          const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
          const updatedRequests = stored.map((r) =>
            r.id === selectedRequest.id ? { ...r, status: "Accepted", timestamp: Date.now() } : r
          );
          localStorage.setItem("cropRequests", JSON.stringify(updatedRequests));
          const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
          const targetReq = updatedRequests.find((u) => u.id === selectedRequest.id);
          const reconciled = storedCrops.map((c) =>
            c.id === targetReq?.cropId
              ? { ...c, status: "Accepted", reason: "" }
              : c
          );
          localStorage.setItem("crops", JSON.stringify(reconciled));
        }
      } catch (error) {
        console.error("Error updating request status:", error);
        alert("Product added, but failed to update request status. Please refresh.");
      }
      setIsAccepting(false);
      setSelectedRequest(null);
    }

    // Clean up
    setUploadedImages([]);
    setShowProductForm(false);
    setEditingProduct(null);
    resetForm();
   
    alert(editingProduct ? "Product updated successfully!" : "Product added to marketplace!");
    refreshData();
    
  } catch (error) {
    console.error('Error submitting product:', error);
    alert(`Error submitting product: ${error.message}. Please try again.`);
  }
};

  const editProduct = (product) => {
    setIsAccepting(false);
    setSelectedRequest(null);
    setUploadedImages([]);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      original_price: product.originalPrice || '',
      category: product.category,
      location: product.location,
      stock: product.stock,
      organic: product.organic || false,
      rating: product.rating,
      reviews: product.reviews
    });
    setShowProductForm(true);
  };

  const toggleProductStatus = (productId) => {
    const updatedProducts = products.map(product =>
      product.id === productId
        ? { ...product, isActive: !product.isActive }
        : product
    );
    localStorage.setItem("marketplaceProducts", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const deleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(product => product.id !== productId);
      localStorage.setItem("marketplaceProducts", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      alert("Product deleted successfully!");
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      category: 'Grains',
      location: '',
      stock: '',
      organic: false,
      rating: 4.5,
      reviews: 0
    });
    setUploadedImages([]);
  };

  const openAddProductForm = () => {
    setIsAccepting(false);
    setSelectedRequest(null);
    setEditingProduct(null);
    resetForm();
    setShowProductForm(true);
  };

  // Filter requests and products
  const pendingRequests = getPendingRequests();
  const activeProducts = products.filter(product => product.isActive);
  const inactiveProducts = products.filter(product => !product.isActive);

  // Reject functions (unchanged)
  const openRejectModal = (requestId) => {
    setRejectForId(requestId);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const submitReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }
    // Check if it's a backend crop
    if (rejectForId.startsWith('backend-')) {
      const cropId = rejectForId.replace('backend-', '');
      try {
        await updateBackendCropStatus(cropId, "Rejected");
        alert("Request rejected.");
      } catch (error) {
        alert("Failed to reject request. Please try again.");
      }
    } else {
      // Local storage handling
      const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
      const updated = stored.map((r) =>
        r.id === rejectForId
          ? {
              ...r,
              status: "Rejected",
              reason: rejectReason,
              timestamp: Date.now(),
            }
          : r
      );
      localStorage.setItem("cropRequests", JSON.stringify(updated));
      const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
      const targetReq = updated.find((u) => u.id === rejectForId);
      const reconciled = storedCrops.map((c) =>
        c.id === targetReq.cropId
          ? { ...c, status: "Rejected", reason: rejectReason }
          : c
      );
      localStorage.setItem("crops", JSON.stringify(reconciled));
      alert("Request rejected.");
    }
    setShowRejectModal(false);
    setRejectForId(null);
    setRejectReason("");
    refreshData();
  };

  const removeRequest = (requestId) => {
    if (requestId.startsWith('backend-')) {
      alert("Backend crops cannot be removed from this panel.");
      return;
    }
   
    const stored = JSON.parse(localStorage.getItem("cropRequests")) || [];
    const updated = stored.filter((r) => r.id !== requestId);
    localStorage.setItem("cropRequests", JSON.stringify(updated));
    refreshData();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container-fluid p-4 text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading market data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div
        className="container-fluid p-4"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(90deg, #b3e6b1 0%, #b3e6b1 88%)",
        }}
      >
        <div className="row">
          {/* Header */}
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 text-dark fw-bold">Market Management</h1>
              <div>
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={refreshData}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Refresh
                </button>
                <button
                  className="btn btn-success"
                  onClick={openAddProductForm}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add New Product
                </button>
              </div>
            </div>
          </div>
          {/* Stats Cards */}
          <div className="col-12 mb-4">
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <h5 className="card-title">Pending Requests</h5>
                    <h2 className="mb-0">{pendingRequests.length}</h2>
                    <small>
                      {pendingRequests.filter(r => !r.isBackend).length} Local +
                      {pendingRequests.filter(r => r.isBackend).length} Backend
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <h5 className="card-title">Active Products</h5>
                    <h2 className="mb-0">{activeProducts.length}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-warning text-white">
                  <div className="card-body">
                    <h5 className="card-title">Inactive Products</h5>
                    <h2 className="mb-0">{inactiveProducts.length}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-info text-white">
                  <div className="card-body">
                    <h5 className="card-title">Total Backend Crops</h5>
                    <h2 className="mb-0">{backendCrops.length}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pending Requests Section */}
          <div className="col-12 mb-5">
            <div className="card">
              <div className="card-header bg-warning">
                <h5 className="card-title mb-0 text-white">
                  <i className="bi bi-clock-history me-2"></i>
                  Pending Crop Requests ({pendingRequests.length})
                </h5>
              </div>
              <div className="card-body">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="bi bi-check-circle display-4 text-muted"></i>
                    <p className="text-muted mt-2">No pending requests</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Source</th>
                          <th>Crop Name</th>
                          <th>Farmer</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingRequests.map((request) => (
                          <tr key={request.id}>
                            <td>
                              {request.isBackend ? (
                                <span className="badge bg-info">Backend</span>
                              ) : (
                                <span className="badge bg-secondary">Local</span>
                              )}
                            </td>
                            <td>
                              <strong>{request.cropName}</strong>
                              {request.description && (
                                <small className="text-muted d-block">{request.description}</small>
                              )}
                            </td>
                            <td>{request.farmerName}</td>
                            <td>{request.quantity} kg</td>
                            <td>₹{request.price}/kg</td>
                            <td>{request.location}</td>
                            <td>
                              {request.isBackend ? (
                                <span className="badge bg-warning">
                                  {request.backendData?.status || 'Pending'}
                                </span>
                              ) : (
                                <span className="badge bg-warning">Pending</span>
                              )}
                            </td>
                            <td>
                              <div className="btn-group">
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleAccept(request.id)}
                                >
                                  <i className="bi bi-check-lg"></i> Review & Accept
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => openRejectModal(request.id)}
                                >
                                  <i className="bi bi-x-lg"></i> Reject
                                </button>
                                {!request.isBackend && (
                                  <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => removeRequest(request.id)}
                                    title="Remove from list"
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Active Products Section */}
          <div className="col-12 mb-5">
            <div className="card">
              <div className="card-header bg-success text-white">
                <h5 className="card-title mb-0">
                  <i className="bi bi-check-circle me-2"></i>
                  Active Marketplace Products ({activeProducts.length})
                </h5>
              </div>
              <div className="card-body">
                {activeProducts.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="bi bi-grid display-4 text-muted"></i>
                    <p className="text-muted mt-2">No active products in marketplace</p>
                    <button className="btn btn-primary" onClick={openAddProductForm}>
                      Add Your First Product
                    </button>
                  </div>
                ) : (
                  <div className="row">
                    {activeProducts.map((product) => (
                      <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <span className="fs-1">{product.image}</span>
                              <div className="dropdown">
                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                        type="button" data-bs-toggle="dropdown">
                                  <i className="bi bi-three-dots"></i>
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <button className="dropdown-item" onClick={() => editProduct(product)}>
                                      <i className="bi bi-pencil me-2"></i>Edit
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item" onClick={() => toggleProductStatus(product.id)}>
                                      <i className="bi bi-pause-circle me-2"></i>Deactivate
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item text-danger" onClick={() => deleteProduct(product.id)}>
                                      <i className="bi bi-trash me-2"></i>Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h6 className="card-title">{product.name}</h6>
                            <div className="mb-2">
                              <span className="fw-bold text-success">₹{product.price}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-muted text-decoration-line-through ms-2">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                              {product.discount > 0 && (
                                <span className="badge bg-danger ms-2">{product.discount}% OFF</span>
                              )}
                            </div>
                            <div className="d-flex justify-content-between text-muted small mb-2">
                              <span>
                                <i className="bi bi-geo-alt"></i> {product.location}
                              </span>
                              <span>
                                <i className="bi bi-star-fill text-warning"></i> {product.rating}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className={`badge ${
                                product.stock > 50 ? 'bg-success' :
                                product.stock > 20 ? 'bg-warning' : 'bg-danger'
                              }`}>
                                Stock: {product.stock} kg
                              </span>
                              {product.organic && (
                                <span className="badge bg-success">🌿 Organic</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Inactive Products Section */}
          {inactiveProducts.length > 0 && (
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-secondary text-white">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-pause-circle me-2"></i>
                    Inactive Products ({inactiveProducts.length})
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inactiveProducts.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="me-2 fs-5">{product.image}</span>
                                <div>
                                  <strong>{product.name}</strong>
                                  <br />
                                  <small className="text-muted">{product.location}</small>
                                </div>
                              </div>
                            </td>
                            <td>{product.category}</td>
                            <td>₹{product.price}</td>
                            <td>{product.stock} kg</td>
                            <td>
                              <span className="badge bg-secondary">Inactive</span>
                            </td>
                            <td>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => toggleProductStatus(product.id)}
                              >
                                <i className="bi bi-play-circle"></i> Activate
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Add/Edit/Accept Product Modal */}
        {showProductForm && (
          <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isAccepting ? 'Review Crop Details & Add to Marketplace' : 
                     editingProduct ? 'Edit Product' : 'Add New Product to Marketplace'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowProductForm(false);
                      setIsAccepting(false);
                      setSelectedRequest(null);
                      setUploadedImages([]);
                    }}
                  ></button>
                </div>
                <form onSubmit={handleProductSubmit}>
                  <div className="modal-body">
                    {/* Image Upload Section */}
                    <div className="mb-4 p-3 border rounded">
                      <h6><i className="bi bi-images me-2"></i>Product Images</h6>
                      
                      {/* Display existing crop images if accepting request */}
                      {isAccepting && selectedRequest && selectedRequest.images && selectedRequest.images.length > 0 && (
                        <div className="mb-3">
                          <label className="form-label text-muted">Original Crop Images (Reference)</label>
                          <div className="row g-2">
                            {selectedRequest.images.slice(0, 5).map((img, idx) => (
                              <div key={idx} className="col-md-2 col-4">
                                <div className="position-relative">
                                  <img 
                                    src={img} 
                                    alt={`Crop reference ${idx + 1}`} 
                                    className="img-thumbnail w-100" 
                                    style={{ height: '80px', objectFit: 'cover', opacity: 0.7 }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                  <small className="text-muted d-block text-center mt-1">Ref {idx + 1}</small>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Image Upload for Marketplace */}
                      <div className="mb-3">
                        <label className="form-label">
                          Upload Marketplace Images {!isAccepting && <span className="text-muted">(Optional)</span>}
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <div className="form-text">
                          You can upload multiple images. First image will be used as primary.
                        </div>
                      </div>

                      {/* Preview Uploaded Images */}
                      {uploadedImages.length > 0 && (
                        <div className="mt-3">
                          <label className="form-label">Uploaded Images Preview</label>
                          <div className="row g-2">
                            {uploadedImages.map((img, idx) => (
                              <div key={idx} className="col-md-2 col-4 position-relative">
                                <img 
                                  src={img.preview} 
                                  alt={`Upload ${idx + 1}`} 
                                  className="img-thumbnail w-100" 
                                  style={{ height: '80px', objectFit: 'cover' }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                  style={{ transform: 'translate(30%, -30%)' }}
                                  onClick={() => removeUploadedImage(idx)}
                                >
                                  <i className="bi bi-x"></i>
                                </button>
                                <small className="text-primary d-block text-center mt-1">
                                  {idx === 0 ? 'Primary' : `Img ${idx + 1}`}
                                </small>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Display existing product images when editing */}
                      {editingProduct && editingProduct.images && editingProduct.images.length > 0 && (
                        <div className="mt-3">
                          <label className="form-label">Current Product Images</label>
                          <div className="row g-2">
                            {editingProduct.images.map((img, idx) => (
                              <div key={idx} className="col-md-2 col-4 position-relative">
                                <img 
                                  src={img} 
                                  alt={`Current ${idx + 1}`} 
                                  className="img-thumbnail w-100" 
                                  style={{ height: '80px', objectFit: 'cover' }}
                                />
                                <small className="text-muted d-block text-center mt-1">Current {idx + 1}</small>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Product Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Product description..."
                          />
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="mb-3">
                              <label className="form-label">Selling Price (₹) *</label>
                              <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="mb-3">
                              <label className="form-label">Original Price (₹)</label>
                              <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                value={formData.original_price}
                                onChange={(e) => setFormData({...formData, original_price: e.target.value})}
                                placeholder="For discount calculation"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Stock Quantity (kg) *</label>
                          <input
                            type="number"
                            className="form-control"
                            value={formData.stock}
                            onChange={(e) => setFormData({...formData, stock: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Category *</label>
                          <select
                            className="form-select"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                          >
                            <option value="Grains">Grains</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Spices">Spices</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Location *</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            required
                          />
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="mb-3">
                              <label className="form-label">Rating</label>
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                className="form-control"
                                value={formData.rating}
                                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="mb-3">
                              <label className="form-label">Reviews Count</label>
                              <input
                                type="number"
                                className="form-control"
                                value={formData.reviews}
                                onChange={(e) => setFormData({...formData, reviews: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Removed Image Emoji field */}
                        <div className="form-check mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.organic}
                            onChange={(e) => setFormData({...formData, organic: e.target.checked})}
                          />
                          <label className="form-check-label">Mark as Organic Product</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowProductForm(false);
                        setIsAccepting(false);
                        setSelectedRequest(null);
                        setUploadedImages([]);
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      {isAccepting ? 'Approve & Add to Marketplace' : editingProduct ? 'Update Product' : 'Add to Marketplace'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* Reject Modal */}
        {showRejectModal && (
          <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Reject Crop Request</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowRejectModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Reason for Rejection *</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Please provide a reason for rejecting this request..."
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowRejectModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={submitReject}
                  >
                    Reject Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="http://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </div>
    </AdminLayout>
  );
};

export default MarketManagement;