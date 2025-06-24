import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Helmet } from "react-helmet";

const MAX_FILE_SIZE_MB = 50;
const ALLOWED_FILE_TYPES = [
  "image/jpeg", "image/jpg", "image/png", 
  "application/pdf", 
  "application/msword", 
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const ServiceManager = () => {
  const { toast } = useToast();

  // State for services
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");
  const [newSubService, setNewSubService] = useState("");

  // State for filing form
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [documentInput, setDocumentInput] = useState("");
  const [documentsRequired, setDocumentsRequired] = useState([]);

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive"
      });
    }
  };

  const handleAddService = async () => {
    if (!newService.trim()) {
      toast({
        title: "Error",
        description: "Service name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      await axios.post('/api/services', {
        name: newService.trim()
      });
      
      toast({
        title: "Success",
        description: "Service added successfully",
        variant: "success"
      });
      
      setNewService("");
      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add service",
        variant: "destructive"
      });
    }
  };

  const handleAddSubService = async () => {
    if (!newSubService.trim() || !selectedService) {
      toast({
        title: "Error",
        description: "Sub-service name and service selection are required",
        variant: "destructive"
      });
      return;
    }

    try {
      await axios.post(`/api/services/${selectedService}/sub-services`, {
        name: newSubService.trim()
      });
      
      toast({
        title: "Success",
        description: "Sub-service added successfully",
        variant: "success"
      });
      
      setNewSubService("");
      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add sub-service",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        toast({ 
          title: "Invalid File", 
          description: "Unsupported file format.", 
          variant: "destructive" 
        });
        return;
      }
      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast({ 
          title: "File Too Large", 
          description: `Max size is ${MAX_FILE_SIZE_MB}MB.`, 
          variant: "destructive" 
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleAddDocument = () => {
    if (documentInput.trim()) {
      setDocumentsRequired([...documentsRequired, documentInput.trim()]);
      setDocumentInput("");
    }
  };

  const handleDeleteDocument = (index) => {
    setDocumentsRequired(documentsRequired.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("documentsRequired", JSON.stringify(documentsRequired));
    if (file) formData.append("file", file);

    try {
      let url = `/api/services/${selectedService}/filings`;
      if (selectedSubService) {
        url = `/api/services/${selectedService}/sub-services/${selectedSubService}/filings`;
      }

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        toast({ 
          title: "Success", 
          description: "Filing added successfully!", 
          variant: "success" 
        });
        // Reset form
        setTitle("");
        setFile(null);
        setDescription("");
        setDocumentsRequired([]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add filing",
        variant: "destructive"
      });
    }
  };

  const allFieldsFilled = selectedService && title && description && file && documentsRequired.length > 0;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Zenithfilings</title>
        <meta name="description" content="Manage services, sub-services, and filings for Zenithfilings." />
      </Helmet>
      <div className="p-4 max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold">Service Management</h2>

          {/* Add New Service */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              className="flex-1 border rounded p-2"
              placeholder="Enter new service name"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
            />
            <button
              onClick={handleAddService}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Service
            </button>
          </div>

          {/* Service Selection and Sub-service Management */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Select Service</label>
              <select
                className="w-full border rounded p-2"
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  setSelectedSubService("");
                }}
              >
                <option value="">-- Choose Service --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Add New Sub-service */}
            {selectedService && (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className="flex-1 border rounded p-2"
                  placeholder="Enter new sub-service name"
                  value={newSubService}
                  onChange={(e) => setNewSubService(e.target.value)}
                />
                <button
                  onClick={handleAddSubService}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Sub-service
                </button>
              </div>
            )}
            
            {/* Sub-service Selection */}
            {selectedService && services.find(s => s.id === parseInt(selectedService))?.subServices?.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1">Select Sub-service</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubService}
                  onChange={(e) => setSelectedSubService(e.target.value)}
                >
                  <option value="">-- Choose Sub-service --</option>
                  {services
                    .find(s => s.id === parseInt(selectedService))
                    ?.subServices.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold mt-8">Add New Filing</h2>

          {/* Filing Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter filing title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Upload File</label>
              <input
                type="file"
                className="w-full"
                accept=".jpeg,.jpg,.png,.pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              {file && <p className="text-sm mt-1 text-green-700">Selected: {file.name}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full border rounded p-2 h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description"
              />
            </div>

            {/* Documents Required */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Documents Required</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  placeholder="Enter document name"
                  value={documentInput}
                  onChange={(e) => setDocumentInput(e.target.value)}
                />
                <button
                  onClick={handleAddDocument}
                  type="button"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>
              {documentsRequired.length > 0 && (
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  {documentsRequired.map((doc, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{doc}</span>
                      <button
                        className="text-red-500 text-xs"
                        onClick={() => handleDeleteDocument(idx)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              className={`px-6 py-2 rounded-md text-white font-medium transition 
                ${allFieldsFilled ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={!allFieldsFilled}
              onClick={handleSubmit}
            >
              Submit Filing
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceManager;


