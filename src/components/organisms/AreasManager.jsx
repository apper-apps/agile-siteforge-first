import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const AreasManager = ({ 
  areas, 
  setAreas 
}) => {
  const [newArea, setNewArea] = useState("");
  const [bulkAreas, setBulkAreas] = useState("");
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addArea = () => {
    if (!newArea.trim()) return;
    
    if (areas.length >= 50) {
      toast.error("Maximum 50 areas allowed");
      return;
    }

    const area = {
      id: Date.now().toString(),
      name: newArea.trim(),
      slug: newArea.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
    };

    setAreas(prev => [...prev, area]);
    setNewArea("");
    toast.success("Service area added successfully");
  };

  const addBulkAreas = () => {
    if (!bulkAreas.trim()) return;
    
    const areaNames = bulkAreas
      .split("\n")
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    const remainingSlots = 50 - areas.length;
    if (areaNames.length > remainingSlots) {
      toast.error(`Can only add ${remainingSlots} more areas (max 50 total)`);
      return;
    }

    const newAreas = areaNames.map(name => ({
      id: Date.now() + Math.random(),
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    }));

    setAreas(prev => [...prev, ...newAreas]);
    setBulkAreas("");
    setShowBulkInput(false);
    toast.success(`Added ${newAreas.length} service areas`);
  };

  const removeArea = (id) => {
    setAreas(prev => prev.filter(area => area.id !== id));
    toast.success("Service area removed");
  };

  const startEdit = (area) => {
    setEditingId(area.id);
    setEditValue(area.name);
  };

  const saveEdit = () => {
    if (!editValue.trim()) return;
    
    setAreas(prev => prev.map(area => 
      area.id === editingId 
        ? { 
            ...area, 
            name: editValue.trim(),
            slug: editValue.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
          }
        : area
    ));
    
    setEditingId(null);
    setEditValue("");
    toast.success("Service area updated");
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
          <h3 className="text-lg font-semibold text-gray-100">Service Areas</h3>
          <p className="text-sm text-gray-400">Add up to 50 areas you serve</p>
        </div>
        <Badge variant="primary">
          {areas.length}/50
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <Input
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="Enter area name..."
            onKeyPress={(e) => e.key === "Enter" && addArea()}
            className="flex-1"
          />
          <Button onClick={addArea} disabled={!newArea.trim() || areas.length >= 50}>
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowBulkInput(!showBulkInput)}
          >
            <ApperIcon name="List" size={16} className="mr-2" />
            Bulk Add
          </Button>
        </div>

        <AnimatePresence>
          {showBulkInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-panel rounded-lg p-4 space-y-3"
            >
              <div>
                <h4 className="font-medium text-gray-100 mb-2">Bulk Add Areas</h4>
                <p className="text-sm text-gray-400 mb-3">Enter one area per line</p>
                <Textarea
                  value={bulkAreas}
                  onChange={(e) => setBulkAreas(e.target.value)}
                  placeholder="Denver&#10;Colorado Springs&#10;Boulder&#10;Fort Collins"
                  rows={6}
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={addBulkAreas} disabled={!bulkAreas.trim()}>
                  <ApperIcon name="Plus" size={16} className="mr-2" />
                  Add Areas
                </Button>
                <Button variant="ghost" onClick={() => setShowBulkInput(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {areas.map((area) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-panel rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                {editingId === area.id ? (
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
                      <h4 className="font-medium text-gray-100">{area.name}</h4>
                      <p className="text-sm text-gray-400">/{area.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => startEdit(area)}
                      >
                        <ApperIcon name="Edit2" size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => removeArea(area.id)}
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
        
        {areas.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <ApperIcon name="MapPin" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No service areas added yet</p>
            <p className="text-sm">Add your first service area to get started</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AreasManager;