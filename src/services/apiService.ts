// Network Guardian API Service

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

export interface SecurityScan {
  timestamp: string;
  devices: number;
  ports: number;
}

// Mock data for when the backend is not available
const MOCK_DATA: NetworkScanResult = {
  current_ip: "192.168.1.100",
  network_range: "192.168.1.0/24",
  devices: [
    {
      ip: "192.168.1.1",
      mac: "00:11:22:33:44:55",
      hostname: "Main Router",
      manufacturer: "TP-Link Technologies",
      bssid: "00:11:22:33:44:55",
      open_ports: [
        { port: 80, service: "HTTP" },
        { port: 443, service: "HTTPS" },
        { port: 53, service: "DNS" }
      ],
      streaming_ports: [],
      netbios: { name: "ROUTER", user: "admin" },
      smb_port: "SMB (Not Detected)",
      traceout: "1 192.168.1.1 0.5ms",
      ttl: "64",
      os: "Linux (95%)"
    },
    {
      ip: "192.168.1.105",
      mac: "AA:BB:CC:DD:EE:FF",
      hostname: "Living Room TV",
      manufacturer: "Samsung Electronics",
      bssid: "00:11:22:33:44:55",
      open_ports: [
        { port: 8080, service: "HTTP-Alt" }
      ],
      streaming_ports: [
        { port: 554, service: "RTSP" },
        { port: 1935, service: "RTMP" }
      ],
      netbios: "No NetBIOS data",
      smb_port: "SMB (Not Detected)",
      traceout: "1 192.168.1.1 0.5ms\n2 192.168.1.105 1.2ms",
      ttl: "128",
      os: "Tizen OS (85%)"
    },
    {
      ip: "192.168.1.120",
      mac: "11:22:33:44:55:66",
      hostname: "Johns-Laptop",
      manufacturer: "Apple Inc.",
      bssid: "00:11:22:33:44:55",
      open_ports: [
        { port: 22, service: "SSH" },
        { port: 631, service: "IPP" }
      ],
      streaming_ports: [],
      netbios: { name: "JOHNS-MAC", user: "john" },
      smb_port: "SMB (Open)",
      traceout: "1 192.168.1.1 0.5ms\n2 192.168.1.120 0.8ms",
      ttl: "64",
      os: "macOS (98%)"
    },
    {
      ip: "192.168.1.130",
      mac: "22:33:44:55:66:77",
      hostname: "Office-Printer",
      manufacturer: "Brother Industries",
      bssid: "00:11:22:33:44:55",
      open_ports: [
        { port: 80, service: "HTTP" },
        { port: 443, service: "HTTPS" },
        { port: 631, service: "IPP" },
        { port: 9100, service: "Print" }
      ],
      streaming_ports: [],
      netbios: { name: "PRINTER", user: "admin" },
      smb_port: "SMB (Not Detected)",
      traceout: "1 192.168.1.1 0.5ms\n2 192.168.1.130 1.5ms",
      ttl: "64",
      os: "Linux Embedded (90%)"
    },
    {
      ip: "192.168.1.140",
      mac: "33:44:55:66:77:88",
      hostname: "Smart-Thermostat",
      manufacturer: "Nest Labs",
      bssid: "00:11:22:33:44:55",
      open_ports: [
        { port: 80, service: "HTTP" },
        { port: 443, service: "HTTPS" }
      ],
      streaming_ports: [],
      netbios: "No NetBIOS data",
      smb_port: "SMB (Not Detected)",
      traceout: "1 192.168.1.1 0.5ms\n2 192.168.1.140 1.0ms",
      ttl: "64",
      os: "Linux Embedded (80%)"
    }
  ]
};

// API Base URL - can be configured to point to local backend or production API
const API_BASE_URL = 'http://localhost:5000'; 

// Flag to use mock data when backend is not available
const USE_MOCK_DATA = true;

class ApiService {
  async getNetworkScan(): Promise<NetworkScanResult> {
    console.log('Fetching network scan data...');
    try {
      if (USE_MOCK_DATA) {
        // Return mock data after a short delay to simulate API response time
        await new Promise(resolve => setTimeout(resolve, 1000));
        return MOCK_DATA;
      }

      const response = await fetch(`${API_BASE_URL}/hosts`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching network scan:', error);
      // Return mock data as fallback
      return MOCK_DATA;
    }
  }

  async getLatestScan(): Promise<SecurityScan> {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        const devices = MOCK_DATA.devices.length;
        const ports = MOCK_DATA.devices.reduce((total, device) => total + (device.open_ports?.length || 0), 0);
        return {
          timestamp: new Date().toISOString(),
          devices,
          ports
        };
      }

      const response = await fetch(`${API_BASE_URL}/latest-scan`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching latest scan:', error);
      // Return mock data as fallback
      const devices = MOCK_DATA.devices.length;
      const ports = MOCK_DATA.devices.reduce((total, device) => total + (device.open_ports?.length || 0), 0);
      return {
        timestamp: new Date().toISOString(),
        devices,
        ports
      };
    }
  }

  async getScanHistory(): Promise<SecurityScan[]> {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        // Generate fake history data
        const now = new Date();
        return Array.from({ length: 10 }).map((_, i) => {
          const date = new Date(now);
          date.setHours(date.getHours() - (i * 2));
          return {
            timestamp: date.toISOString(),
            devices: Math.floor(Math.random() * 3) + 4, // 4-6 devices
            ports: Math.floor(Math.random() * 10) + 8 // 8-17 ports
          };
        });
      }

      const response = await fetch(`${API_BASE_URL}/scan-history`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching scan history:', error);
      // Return mock data as fallback
      const now = new Date();
      return Array.from({ length: 10 }).map((_, i) => {
        const date = new Date(now);
        date.setHours(date.getHours() - (i * 2));
        return {
          timestamp: date.toISOString(),
          devices: Math.floor(Math.random() * 3) + 4, // 4-6 devices
          ports: Math.floor(Math.random() * 10) + 8 // 8-17 ports
        };
      });
    }
  }

  async getNetworkTraffic() {
    // This is a mock method that would normally fetch real traffic data
    // In a real implementation, this would connect to the backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate random traffic data for 24 hours
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const download = hours.map(() => Math.floor(Math.random() * 80) + 20);
    const upload = hours.map(() => Math.floor(Math.random() * 40) + 5);
    
    return { hours, download, upload };
  }

  async getDeviceUsage() {
    // Mock device usage data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const networkScan = await this.getNetworkScan();
    
    // Generate usage data based on actual devices
    return networkScan.devices.map(device => {
      return {
        deviceName: device.hostname || `Device (${device.ip})`,
        deviceType: device.hostname?.toLowerCase().includes('tv') ? 'monitor' : 
                    device.hostname?.toLowerCase().includes('router') ? 'router' :
                    device.hostname?.toLowerCase().includes('printer') ? 'printer' :
                    device.manufacturer?.toLowerCase().includes('apple') ? 'laptop' : 'smartphone',
        downloadMB: Math.floor(Math.random() * 2000) + 100,
        uploadMB: Math.floor(Math.random() * 600) + 50,
        activeTime: `${Math.floor(Math.random() * 12)}h ${Math.floor(Math.random() * 60)}m`
      };
    });
  }

  async getNetworkSpeed() {
    // Mock network speed data
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      download: Math.floor(Math.random() * 50) + 60, // 60-110 Mbps
      upload: Math.floor(Math.random() * 20) + 15, // 15-35 Mbps
      ping: Math.floor(Math.random() * 20) + 5 // 5-25 ms
    };
  }

  calculateSecurityScore(devices: NetworkDevice[]): number {
    let score = 100;
    
    // Check for devices with open ports
    devices.forEach(device => {
      if (device.open_ports && device.open_ports.length > 0) {
        const criticalPorts = [22, 23, 25, 445, 3389]; // SSH, Telnet, SMTP, SMB, RDP
        const hasCriticalPort = device.open_ports.some(p => criticalPorts.includes(p.port));
        
        if (hasCriticalPort) {
          // Critical port found
          score -= 15;
        } else {
          // Non-critical open ports
          score -= 5;
        }
      }
    });
    
    // Check for unknown devices
    const unknownDevices = devices.filter(d => d.hostname === 'Unknown' || d.manufacturer === 'Unknown');
    if (unknownDevices.length > 0) {
      score -= 10;
    }
    
    // Ensure score stays between 0-100
    return Math.max(0, Math.min(100, score));
  }

  getSecurityThreats(devices: NetworkDevice[]) {
    const threats = [];
    
    // Check for devices with open ports
    devices.forEach((device) => {
      if (device.open_ports && device.open_ports.length > 0) {
        const criticalPorts = [22, 23, 25, 445, 3389]; // SSH, Telnet, SMTP, SMB, RDP
        const hasCriticalPort = device.open_ports.some(p => criticalPorts.includes(p.port));
        
        if (hasCriticalPort) {
          // Critical port found
          const criticalPort = device.open_ports.find(p => criticalPorts.includes(p.port));
          threats.push({
            title: `Critical Port Detected`,
            description: `Port ${criticalPort?.port} (${criticalPort?.service}) is open on ${device.hostname || device.ip}`,
            severity: 'high',
            time: 'Now'
          });
        } else if (device.open_ports.length > 3) {
          // Multiple non-critical open ports
          threats.push({
            title: `Multiple Open Ports`,
            description: `${device.open_ports.length} open ports on ${device.hostname || device.ip}`,
            severity: 'medium',
            time: 'Now'
          });
        }
      }
    });
    
    // Check for unknown devices
    const unknownDevices = devices.filter(d => d.hostname === 'Unknown' || d.manufacturer === 'Unknown');
    if (unknownDevices.length > 0) {
      threats.push({
        title: "Unknown Devices Detected",
        description: `${unknownDevices.length} devices with unidentified hostname or manufacturer`,
        severity: 'medium',
        time: 'Now'
      });
    }
    
    return threats;
  }
}

export const apiService = new ApiService();
