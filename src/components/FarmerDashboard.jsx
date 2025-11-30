import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import CropCard from "./CropCard";
import WatchDemoAnimation from "./WatchDemoAnimation";
import AddCropAnimation from "./AddCropAnimation";

const getPreview = (img) => {
  if (!img) return null;
  if (img instanceof File) return URL.createObjectURL(img);
  return img;
};

// Format number helper
const fmt = (n) => {
  if (isNaN(n) || n === null || n === 0) return "0";
  return Number(n).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

const FarmerDashboard = () => {
  const [showAddCropAnimation, setShowAddCropAnimation] = useState(false);
  const [crops, setCrops] = useState([]);
  const [backendCrops, setBackendCrops] = useState([]);
  const [farmer, setFarmer] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load farmer and local crops
  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedInUser"));
    if (logged && logged.role === "farmer") {
      setFarmer(logged);
    }
    const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
    if (logged) {
      const myCrops = storedCrops.filter(
        (c) => c.farmerName === (logged.username || "")
      );
      setCrops(myCrops);
    }
  }, []);

  // Fetch crops from backend
  useEffect(() => {
    const fetchBackendCrops = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/crops/all/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Backend crops data:", data);
        
        if (data && data.crops && Array.isArray(data.crops)) {
          // Transform backend data to match frontend structure
          const transformedCrops = data.crops.map(crop => ({
            id: crop.id,
            cropName: crop.cropName,
            location: crop.location,
            quantity: crop.quantity,
            priceByAI: crop.priceByAI,
            grade: crop.grade,
            finalAmount: crop.finalAmount,
            status: mapBackendStatus(crop.status), // Map backend status to frontend
            status_display: crop.status_display,
            description: crop.description || "",
            images: crop.images || [],
            created_at: crop.created_at,
            farmerName: farmer?.username || "Farmer",
            mlResult: {
              grade: crop.grade,
              predictedPrice: crop.priceByAI,
              marketTrend: "Market Analysis",
              confidence: 85,
              qualityFactors: ["Quality Assessed"],
            }
          }));
          setBackendCrops(transformedCrops);
        } else {
          console.warn("Unexpected data structure from backend:", data);
          setBackendCrops([]);
        }
      } catch (error) {
        console.error("Error fetching crops from backend:", error);
        setBackendCrops([]);
      } finally {
        setLoading(false);
      }
    };

    if (farmer) {
      fetchBackendCrops();
    }
  }, [farmer]);

  // Map backend status to frontend status
  // Map backend status to frontend status
const mapBackendStatus = (backendStatus) => {
  const statusMap = {
    'ModelSuggested': 'ModelSuggested',
    'FarmerAccepted': 'FarmerAccepted', 
    'PendingAdmin': 'PendingAdmin',
    'AdminApproved': 'AdminApproved',
    'Rejected': 'Rejected'
  };
  return statusMap[backendStatus] || backendStatus;
};

// Map frontend status to backend status for API calls
const mapToBackendStatus = (frontendStatus) => {
  const statusMap = {
    'ModelSuggested': 'ModelSuggested',
    'FarmerAccepted': 'FarmerAccepted',
    'PendingAdmin': 'PendingAdmin',
    'AdminApproved': 'AdminApproved',
    'Rejected': 'Rejected'
  };
  return statusMap[frontendStatus] || frontendStatus;
};

  // Save crops to localStorage
  const saveCropsToStorage = (allCrops) => {
    setCrops(allCrops);
    const storedAll = JSON.parse(localStorage.getItem("crops")) || [];
    const others = storedAll.filter(
      (c) => c.farmerName !== (farmer?.username || "")
    );
    const merged = [...others, ...allCrops];
    localStorage.setItem("crops", JSON.stringify(merged));
  };

  // Update crop status in backend
  const updateBackendCropStatus = async (cropId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/crops/${cropId}/update-status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: mapToBackendStatus(newStatus)
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

  // Calculate stats from both local and backend crops
  const allCrops = [...crops, ...backendCrops];
  
  const latestSoldCrop = allCrops
    .filter((c) => c.status === "AdminApproved")
    .slice(-1)[0];
  const totalQuantity = allCrops
    .filter((c) => c.status === "AdminApproved")
    .reduce((sum, crop) => sum + (Number(crop.quantity) || 0), 0);
  const pendingRequests = allCrops.filter((c) => c.status === "FarmerAccepted").length;

  const callMlModel = async (cropData) => {
    await new Promise((res) => setTimeout(res, 1500));
    const grades = ["A", "B", "C"];
    const marketTrends = ["High Demand", "Medium Demand", "Low Demand"];
    const basePrices = {
      wheat: 2000,
      rice: 2500,
      corn: 1800,
      sugarcane: 1500,
      cotton: 3000,
      default: 2200,
    };
    const cropName = cropData.cropName.toLowerCase();
    let basePrice = basePrices.default;
    if (cropName.includes("wheat")) basePrice = basePrices.wheat;
    else if (cropName.includes("rice")) basePrice = basePrices.rice;
    else if (cropName.includes("corn")) basePrice = basePrices.corn;
    else if (cropName.includes("sugarcane")) basePrice = basePrices.sugarcane;
    else if (cropName.includes("cotton")) basePrice = basePrices.cotton;
    const grade = grades[Math.floor(Math.random() * 3)];
    const gradeMultiplier = grade === "A" ? 1.2 : grade === "B" ? 1.0 : 0.8;
    const predictedPrice = Math.round(
      basePrice * gradeMultiplier + Math.random() * 500
    );
    return {
      grade: grade,
      predictedPrice: predictedPrice,
      marketTrend: marketTrends[Math.floor(Math.random() * 3)],
      confidence: Math.round(80 + Math.random() * 20),
      qualityFactors: ["Good Color", "Proper Size", "Fresh Produce"].slice(
        0,
        2 + Math.floor(Math.random() * 2)
      ),
      improvements:
        Math.random() > 0.7 ? ["Better Packaging", "Harvest Timing"] : [],
    };
  };

  // Handle adding new crop
  const handleAddCropFromAnimation = async (savedCrop) => {
    const cropName = savedCrop.cropName?.trim() || "";
    const location = savedCrop.location?.trim() || "";
    const quantity = Number(savedCrop.quantity) || 0;
    const description = savedCrop.description || "";

    if (!cropName || !location || !quantity || quantity <= 0) {
      alert("Please fill all required fields: Crop Name, Quantity, and Location");
      return;
    }

    try {
      // For new crops, they should start as "ModelSuggested"
      const newCrop = {
        id: savedCrop.id || Date.now(),
        farmerName: farmer.username,
        cropName,
        location,
        quantity,
        priceByAI: savedCrop.priceByAI || 0,
        grade: savedCrop.grade || "N/A",
        finalAmount: (savedCrop.priceByAI || 0) * quantity,
        created_at: savedCrop.created_at || new Date().toISOString(),
        status: "ModelSuggested", // Always start here
        images: savedCrop.images || [],
        description,
        mlResult: savedCrop.mlResult || {
          grade: savedCrop.grade || "N/A",
          predictedPrice: savedCrop.priceByAI || 0,
          marketTrend: "Market Analysis",
          confidence: 85,
        },
      };

      const updatedCrops = [...crops, newCrop];
      saveCropsToStorage(updatedCrops);

      alert(`Crop "${cropName}" added! AI graded it "${savedCrop.grade}" with price ₹${savedCrop.priceByAI}/kg`);
      setShowAddCropAnimation(false);
    } catch (err) {
      console.error("Error adding crop:", err);
      alert("Failed to add crop. Try again.");
    }
  };

  // Farmer agrees with ML suggestion
  const farmerAgrees = async (cropId) => {
    const allCropsCombined = [...crops, ...backendCrops];
    const cropToUpdate = allCropsCombined.find(c => c.id === cropId);
    
    if (!cropToUpdate) {
      console.error("Crop not found:", cropId);
      return;
    }

    const isBackendCrop = backendCrops.some(c => c.id === cropId);
    
    if (isBackendCrop) {
      // Update backend crop
      try {
        await updateBackendCropStatus(cropId, "FarmerAccepted");
        // Refresh backend crops
        const response = await fetch("http://localhost:8000/crops/all/");
        const data = await response.json();
        if (data && data.crops) {
          const transformed = data.crops.map(crop => ({
            ...crop,
            status: mapBackendStatus(crop.status),
            mlResult: {
              grade: crop.grade,
              predictedPrice: crop.priceByAI,
              marketTrend: "Market Analysis",
              confidence: 85,
            }
          }));
          setBackendCrops(transformed);
        }
        alert(`Request for "${cropToUpdate.cropName}" sent to admin for approval!`);
      } catch (error) {
        alert("Failed to update crop status. Please try again.");
      }
    } else {
      // Update local crop
      const updatedLocal = crops.map((c) =>
        c.id === cropId ? { ...c, status: "FarmerAccepted" } : c
      );
      saveCropsToStorage(updatedLocal);
      
      // Also save to cropRequests for admin to see
      const storedRequests = JSON.parse(localStorage.getItem("cropRequests")) || [];
      const crop = updatedLocal.find((c) => c.id === cropId);
      const exists = storedRequests.find((r) => r.cropId === cropId);
      
      if (!exists && crop) {
        const newRequest = {
          id: Date.now(),
          cropId: crop.id,
          farmerName: crop.farmerName,
          cropName: crop.cropName,
          quantity: crop.quantity,
          price: crop.mlResult?.predictedPrice || crop.priceByAI,
          location: crop.location,
          description: crop.description,
          images: crop.images,
          grade: crop.mlResult?.grade || crop.grade,
          marketTrend: crop.mlResult?.marketTrend,
          status: "FarmerAccepted",
          reason: "",
          timestamp: Date.now(),
        };
        storedRequests.push(newRequest);
        localStorage.setItem("cropRequests", JSON.stringify(storedRequests));
      }
      alert(`Request for "${cropToUpdate.cropName}" sent to admin for approval!`);
    }
  };

  // Farmer declines ML suggestion
  const farmerDeclines = async (cropId) => {
    const allCropsCombined = [...crops, ...backendCrops];
    const cropToUpdate = allCropsCombined.find(c => c.id === cropId);
    
    if (!cropToUpdate) {
      console.error("Crop not found:", cropId);
      return;
    }

    const isBackendCrop = backendCrops.some(c => c.id === cropId);
    
    if (isBackendCrop) {
      try {
        await updateBackendCropStatus(cropId, "Rejected");
        // Refresh backend crops
        const response = await fetch("http://localhost:8000/crops/all/");
        const data = await response.json();
        if (data && data.crops) {
          const transformed = data.crops.map(crop => ({
            ...crop,
            status: mapBackendStatus(crop.status),
            mlResult: {
              grade: crop.grade,
              predictedPrice: crop.priceByAI,
              marketTrend: "Market Analysis",
              confidence: 85,
            }
          }));
          setBackendCrops(transformed);
        }
        alert("You've declined the AI suggestions.");
      } catch (error) {
        alert("Failed to update crop status. Please try again.");
      }
    } else {
      const updatedLocal = crops.map((c) =>
        c.id === cropId ? { ...c, status: "Rejected" } : c
      );
      saveCropsToStorage(updatedLocal);
      alert("You've declined the AI suggestions. Crop moved to previously sold crops.");
    }
  };

  // Admin actions (for demo purposes - you might remove these or keep for testing)
  const adminAccepts = async (cropId) => {
    const isBackendCrop = backendCrops.some(c => c.id === cropId);
    
    if (isBackendCrop) {
      try {
        await updateBackendCropStatus(cropId, "AdminApproved");
        // Refresh backend crops
        const response = await fetch("http://localhost:8000/crops/all/");
        const data = await response.json();
        if (data && data.crops) {
          const transformed = data.crops.map(crop => ({
            ...crop,
            status: mapBackendStatus(crop.status),
            mlResult: {
              grade: crop.grade,
              predictedPrice: crop.priceByAI,
              marketTrend: "Market Analysis",
              confidence: 85,
            }
          }));
          setBackendCrops(transformed);
        }
        alert("Admin accepted the crop!");
      } catch (error) {
        alert("Failed to update crop status. Please try again.");
      }
    } else {
      const updatedLocal = crops.map((c) =>
        c.id === cropId ? { ...c, status: "AdminApproved" } : c
      );
      saveCropsToStorage(updatedLocal);
      alert("Admin accepted the crop!");
    }
  };

  const adminRejects = async (cropId, reason = "Not specified") => {
    const isBackendCrop = backendCrops.some(c => c.id === cropId);
    
    if (isBackendCrop) {
      try {
        await updateBackendCropStatus(cropId, "Rejected");
        // Refresh backend crops
        const response = await fetch("http://localhost:8000/crops/all/");
        const data = await response.json();
        if (data && data.crops) {
          const transformed = data.crops.map(crop => ({
            ...crop,
            status: mapBackendStatus(crop.status),
            mlResult: {
              grade: crop.grade,
              predictedPrice: crop.priceByAI,
              marketTrend: "Market Analysis",
              confidence: 85,
            }
          }));
          setBackendCrops(transformed);
        }
        alert("Admin rejected the crop.");
      } catch (error) {
        alert("Failed to update crop status. Please try again.");
      }
    } else {
      const updatedLocal = crops.map((c) =>
        c.id === cropId ? { ...c, status: "Rejected", reason: reason } : c
      );
      saveCropsToStorage(updatedLocal);
      alert("Admin rejected the crop.");
    }
  };

  // Helper for image
  const getCropImage = (crop) => {
    if (!crop.images || crop.images.length === 0)
      return "../assets/default-crop.jpg";

    const firstImg = crop.images[0];
    if (firstImg instanceof File) {
      return URL.createObjectURL(firstImg);
    }
    if (typeof firstImg === 'object' && firstImg.image_url) {
      return firstImg.image_url;
    }
    if (typeof firstImg === "string") {
      const backendBase = "http://127.0.0.1:8000";
      if (firstImg.startsWith("crop_images/")) {
        return `${backendBase}/media/${firstImg}`;
      }
      return firstImg;
    }
    return "../assets/default-crop.jpg";
  };

  if (!farmer) {
    return (
      <div className="container mt-5">
        <h4>No farmer details. Please login again.</h4>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your crops...</p>
      </div>
    );
  }

  // Filter crops by status for display
  const modelSuggestedCrops = allCrops.filter((c) => c.status === "ModelSuggested");
  const farmerAcceptedCrops = allCrops.filter((c) => c.status === "FarmerAccepted");
  const adminApprovedCrops = allCrops.filter((c) => c.status === "AdminApproved");
  const rejectedCrops = allCrops.filter((c) => c.status === "Rejected");

  return (
    <div className="container-fluid mt-4 mb-4">
      {/* HERO SECTION */}
      <div
        className="container-fluid p-4 mb-4"
        style={{
          background: "linear-gradient(to right, #80f57cff,  #428742ff)",
          borderRadius: "15px",
        }}
      >
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold text-white">
              Smart Agro Grading & Marketplace
            </h1>
            <p className="mt-3 text-white fs-5">
              AI-powered crop grading, fair price suggestions, and seamless
              market access for farmers.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="../assets/hero-section-gif.gif"
              alt="Farmer"
              className="img-fluid rounded"
              style={{ maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>

      {/* SMART CROP GRADING CARD */}
      <div
        className="card p-4 shadow-sm border-0 mb-4"
        style={{ borderRadius: "15px", background: "#f8fff5" }}
      >
        <div className="text-center">
          <h4 className="fw-bold text-success mb-3">🌾 Smart Crop Grading</h4>
          <p className="text-muted mb-4">
            Upload your crop details and get instant AI-powered quality grading
            and fair price suggestions.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={() => setShowDemo(true)}
              className="btn btn-outline-success px-4 py-2"
            >
              <i className="bi bi-play-circle me-2"></i>Watch Demo
            </button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(40, 167, 69, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-success px-4 py-2 position-relative pulse-button"
              onClick={() => setShowAddCropAnimation(true)}
              style={{
                background: "linear-gradient(135deg, #28a745, #20c997)",
                border: "none",
                fontWeight: "600",
                minWidth: "140px",
              }}
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="me-2"
              >
                🌱
              </motion.span>
              Add Crop
            </motion.button>
          </div>
        </div>
      </div>

      {/* Add Crop Animation Modal */}
      <AddCropAnimation
        isOpen={showAddCropAnimation}
        onClose={() => setShowAddCropAnimation(false)}
        onAddCrop={handleAddCropFromAnimation}
        callMlModel={callMlModel}
        farmerId={farmer.id}
      />

      {/* Watch Demo Modal */}
      <WatchDemoAnimation
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
      />

      {/* STATS CARDS */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-center p-3 shadow-sm h-100 border-0">
            <div className="card-body">
              <i className="bi bi-basket text-success fs-4 mb-2"></i>
              <h6 className="card-title text-muted">Recently Sold</h6>
              <p className="card-text fs-5 fw-bold text-success">
                {latestSoldCrop ? latestSoldCrop.cropName : "None"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center p-3 shadow-sm h-100 border-0">
            <div className="card-body">
              <i className="bi bi-scale text-primary fs-4 mb-2"></i>
              <h6 className="card-title text-muted">Total Sold</h6>
              <p className="card-text fs-5 fw-bold text-primary">
                {fmt(totalQuantity)} kg
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center p-3 shadow-sm h-100 border-0">
            <div className="card-body">
              <i className="bi bi-clock text-warning fs-4 mb-2"></i>
              <h6 className="card-title text-muted">Pending</h6>
              <p className="card-text fs-5 fw-bold text-warning">
                {pendingRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center p-3 shadow-sm h-100 border-0">
            <div className="card-body">
              <i className="bi bi-geo-alt text-info fs-4 mb-2"></i>
              <h6 className="card-title text-muted">Farm Size</h6>
              <p className="card-text fs-5 fw-bold text-info">
                {farmer.acres || "N/A"} Acres
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RECENTLY ADDED CROPS (ModelSuggested) */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-success">Recently Added Crops</h4>
          <span className="badge bg-success">
            {modelSuggestedCrops.length}
          </span>
        </div>
        <p className="text-muted mb-3">
          Crops analyzed by AI - Review the grade and price suggestions
        </p>
        {modelSuggestedCrops.length > 0 ? (
          <div className="row g-3">
            {modelSuggestedCrops.map((crop) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={crop.id}>
                <CropCard
                  id={crop.id}
                  cropName={crop.cropName}
                  quantity={crop.quantity}
                  grade={crop.mlResult?.grade || crop.grade || "N/A"}
                  pricePerKg={fmt(crop.mlResult?.predictedPrice || crop.priceByAI || 0)}
                  totalAmount={fmt(crop.finalAmount || 0)}
                  status={crop.status}
                  description={crop.description}
                  images={crop.images?.map(img => typeof img === 'object' ? img.image_url : img)}
                  userType="farmer"
                  onFarmerAgree={farmerAgrees}
                  onFarmerDecline={farmerDeclines}
                  imageUrl={getCropImage(crop)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-light rounded">
            <i className="bi bi-inbox fs-1 text-muted mb-3"></i>
            <p className="text-muted">No crop suggestions available.</p>
            <button
              className="btn btn-outline-success"
              onClick={() => setShowAddCropAnimation(true)}
            >
              Add Your First Crop
            </button>
          </div>
        )}
      </div>

      {/* PROCESSING REQUESTS (FarmerAccepted) */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-warning">Processing Requests</h4>
          <span className="badge bg-warning">
            {farmerAcceptedCrops.length}
          </span>
        </div>
        <p className="text-muted mb-3">
          Crops waiting for admin approval
        </p>
        {farmerAcceptedCrops.length > 0 ? (
          <div className="row g-3">
            {farmerAcceptedCrops.map((crop) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={crop.id}>
                <CropCard
                  id={crop.id}
                  cropName={crop.cropName}
                  quantity={crop.quantity}
                  grade={crop.mlResult?.grade || crop.grade || "N/A"}
                  pricePerKg={fmt(crop.mlResult?.predictedPrice || crop.priceByAI || 0)}
                  totalAmount={fmt(crop.finalAmount || 0)}
                  status={crop.status}
                  description={crop.description}
                  images={crop.images?.map(img => typeof img === 'object' ? img.image_url : img)}
                  userType="farmer"
                  imageUrl={getCropImage(crop)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted">No crops waiting for admin approval.</p>
          </div>
        )}
      </div>

      {/* PREVIOUSLY SOLD CROPS (AdminApproved + Rejected) */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-success">Previously Sold Crops</h4>
          <span className="badge bg-success">
            {adminApprovedCrops.length + rejectedCrops.length}
          </span>
        </div>
        <p className="text-muted mb-3">
          Successfully sold crops and rejected crops
        </p>
        {(adminApprovedCrops.length + rejectedCrops.length) > 0 ? (
          <div className="row g-3">
            {[...adminApprovedCrops, ...rejectedCrops].map((crop) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={crop.id}>
                <CropCard
                  id={crop.id}
                  cropName={crop.cropName}
                  quantity={crop.quantity}
                  grade={crop.mlResult?.grade || crop.grade || "N/A"}
                  pricePerKg={fmt(crop.mlResult?.predictedPrice || crop.priceByAI || 0)}
                  totalAmount={fmt(crop.finalAmount || 0)}
                  status={crop.status}
                  description={crop.description}
                  images={crop.images?.map(img => typeof img === 'object' ? img.image_url : img)}
                  userType="farmer"
                  imageUrl={getCropImage(crop)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted">
              No crops sold yet. Start by adding your crops above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;