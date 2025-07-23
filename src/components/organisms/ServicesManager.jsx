import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const ServicesManager = ({ 
  services, 
  setServices 
}) => {
  const [newService, setNewService] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addService = () => {
    if (!newService.trim()) return;
    
    if (services.length >= 20) {
      toast.error("Maximum 20 services allowed");
      return;
    }

    const service = {
      id: Date.now().toString(),
      name: newService.trim(),
      slug: newService.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
    };

    setServices(prev => [...prev, service]);
    setNewService("");
    toast.success("Service added successfully");
  };

  const removeService = (id) => {
    setServices(prev => prev.filter(service => service.id !== id));
    toast.success("Service removed");
  };

  const startEdit = (service) => {
    setEditingId(service.id);
    setEditValue(service.name);
  };

  const saveEdit = () => {
    if (!editValue.trim()) return;
    
    setServices(prev => prev.map(service => 
      service.id === editingId 
        ? { 
            ...service, 
            name: editValue.trim(),
            slug: editValue.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
          }
        : service
    ));
    
    setEditingId(null);
    setEditValue("");
    toast.success("Service updated");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-100">Services</h3>
          <p className="text-sm text-gray-400">Add up to 20 services your business offers</p>
        </div>
        <Badge variant="primary">
          {services.length}/20
        </Badge>
      </div>

      <div className="flex gap-3">
        <Input
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          placeholder="Enter service name..."
          onKeyPress={(e) => e.key === "Enter" && addService()}
          className="flex-1"
        />
        <Button onClick={addService} disabled={!newService.trim() || services.length >= 20}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add
        </Button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-panel rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                {editingId === service.id ? (
                  <div className="flex items-center gap-3 flex-1">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                      className="flex-1"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="success"
                        onClick={saveEdit}
                      >
                        <ApperIcon name="Check" size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={cancelEdit}
                      >
                        <ApperIcon name="X" size={14} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="font-medium text-gray-100">{service.name}</h4>
                      <p className="text-sm text-gray-400">/{service.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => startEdit(service)}
                      >
                        <ApperIcon name="Edit2" size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => removeService(service.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <ApperIcon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {services.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <ApperIcon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No services added yet</p>
            <p className="text-sm">Add your first service to get started</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ServicesManager;