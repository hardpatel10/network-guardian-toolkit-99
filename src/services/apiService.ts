
/**
 * API Service for Network Guardian Toolkit
 * Handles all API requests to the backend server
 */

const API_BASE_URL = 'http://localhost:5000';

export interface NetworkDevice {
  ip: string;
  mac: string;
  hostname: string;
  manufacturer: string;
  bssid: string;
  open_ports: { port: number; service: string }[];
  streaming_ports: { port: number; service: string }[];
  netbios: any;
  smb_port: string;
  traceout: string;
  ttl: string;
  os: string;
}

export interface NetworkScanResult {
  current_ip: string;
  network_range: string;
  devices: NetworkDevice[];
}

export interface ScanHistoryItem {
  timestamp: string;
  devices: number;
  ports: number;
}

export interface DeviceHistoryItem {
  ip: string;
  mac: string;
  hostname: string;
  first_seen: string;
  last_seen: string;
}

export const apiService = {
  /**
   * Get network scan results
   */
  async getNetworkScan(): Promise<NetworkScanResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/hosts`);
      if (!response.ok) {
        throw new Error('Network scan failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching network scan:', error);
      // Return empty result on error
      return { current_ip: '', network_range: '', devices: [] };
    }
  },

  /**
   * Get latest scan statistics
   */
  async getLatestScan(): Promise<ScanHistoryItem> {
    try {
      const response = await fetch(`${API_BASE_URL}/latest-scan`);
      if (!response.ok) {
        throw new Error('Failed to fetch latest scan');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching latest scan:', error);
      return { timestamp: '', devices: 0, ports: 0 };
    }
  },

  /**
   * Get total devices ever detected
   */
  async getTotalDevices(): Promise<{ total_devices: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/total-devices`);
      if (!response.ok) {
        throw new Error('Failed to fetch total devices');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching total devices:', error);
      return { total_devices: 0 };
    }
  },

  /**
   * Get scan history
   */
  async getScanHistory(): Promise<ScanHistoryItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/scan-history`);
      if (!response.ok) {
        throw new Error('Failed to fetch scan history');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching scan history:', error);
      return [];
    }
  },

  /**
   * Get device history
   */
  async getDeviceHistory(): Promise<DeviceHistoryItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/view_devices`);
      if (!response.ok) {
        throw new Error('Failed to fetch device history');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching device history:', error);
      return [];
    }
  },

  /**
   * Trigger a new scan
   */
  async triggerScan(): Promise<NetworkScanResult> {
    try {
      // The backend's /hosts endpoint performs a scan when called
      const response = await fetch(`${API_BASE_URL}/hosts`);
      if (!response.ok) {
        throw new Error('Failed to trigger scan');
      }
      return await response.json();
    } catch (error) {
      console.error('Error triggering scan:', error);
      return { current_ip: '', network_range: '', devices: [] };
    }
  }
};
