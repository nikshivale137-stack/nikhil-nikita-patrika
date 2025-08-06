import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, type AdminData } from '@/lib/api';
import { toast } from 'sonner';

interface AdminContextType {
  adminData: AdminData | null;
  isLoading: boolean;
  updateAdminData: (data: Partial<AdminData>) => void;
  saveAdminData: () => Promise<void>;
  refreshAdminData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminData = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminData must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAdminData = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.loadAdminData();
      setAdminData(data);
    } catch (error) {
      console.error('Failed to load admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdminData = (data: Partial<AdminData>) => {
    if (adminData) {
      const updatedData = { ...adminData, ...data };
      setAdminData(updatedData);
      // Save the updated data immediately to localStorage
      apiService.saveAdminData(updatedData).catch(error => {
        console.error('Failed to save admin data:', error);
      });
    }
  };

  const saveAdminData = async () => {
    if (!adminData) return;
    
    try {
      await apiService.saveAdminData(adminData);
      toast.success('Changes saved successfully!');
    } catch (error) {
      console.error('Failed to save admin data:', error);
      toast.error('Failed to save changes');
    }
  };

  const refreshAdminData = async () => {
    await loadAdminData();
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const value: AdminContextType = {
    adminData,
    isLoading,
    updateAdminData,
    saveAdminData,
    refreshAdminData,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}; 