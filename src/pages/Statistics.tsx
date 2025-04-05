
import React, { useState, useEffect, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Upload, AlertTriangle, Shield, Activity, Cpu, FileUp, Clock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiService, ScanHistoryItem, NetworkScanResult } from '@/services/apiService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// OS distribution colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const StatCard: React.FC<{
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}> = ({ title, value, description, icon }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-y-0">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

const SecurityAlert: React.FC<{
  title: string;
  message: string;
  type: 'warning' | 'error' | 'info';
}> = ({ title, message, type }) => {
  const alertIcon = type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : 
                   type === 'error' ? <AlertTriangle className="h-4 w-4" /> : 
                   <Shield className="h-4 w-4" />;
                   
  return (
    <Alert className="mb-4" variant={type === 'info' ? 'default' : type}>
      <div className="flex items-center gap-2">
        {alertIcon}
        <AlertTitle>{title}</AlertTitle>
      </div>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

const Statistics: React.FC = () => {
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [uploadedData, setUploadedData] = useState<NetworkScanResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState<Array<{
    title: string;
    message: string;
    type: 'warning' | 'error' | 'info';
  }>>([]);
  const { toast } = useToast();

  // Fetch scan history from API
  useEffect(() => {
    const fetchScanHistory = async () => {
      try {
        const history = await apiService.getScanHistory();
        setScanHistory(history);
        generateSecurityAlerts(history);
      } catch (error) {
        console.error('Error fetching scan history:', error);
        toast({
          title: "Error Loading Data",
          description: "Could not fetch scan history. Check your connection.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchScanHistory();
  }, []);

  // Generate security alerts based on scan history
  const generateSecurityAlerts = useCallback((history: ScanHistoryItem[]) => {
    if (!history || !history.length) return;
    
    const alerts = [];
    const latestScan = history[0];
    
    // Check for high number of open ports
    if (latestScan.ports > 10) {
      alerts.push({
        title: "High number of open ports detected",
        message: `Your network has ${latestScan.ports} open ports, which may increase attack surface.`,
        type: "warning"
      });
    }
    
    // Check for growth in devices (potential rogue devices)
    if (history.length > 1 && latestScan.devices > history[1].devices + 2) {
      alerts.push({
        title: "Unexpected growth in connected devices",
        message: `${latestScan.devices - history[1].devices} new devices detected since last scan.`,
        type: "warning"
      });
    }
    
    if (alerts.length === 0) {
      alerts.push({
        title: "Network appears secure",
        message: "No significant security issues detected in the latest scan.",
        type: "info"
      });
    }
    
    setSecurityAlerts(alerts);
  }, []);

  // Format data for charts
  const formatChartData = () => {
    let data = scanHistory;
    
    // If data was uploaded, prioritize it
    if (uploadedData && uploadedData.devices) {
      // Convert uploaded data to match scan history format
      const timestamp = new Date().toISOString();
      const devices = uploadedData.devices.length;
      const ports = uploadedData.devices.reduce(
        (sum, device) => sum + (device.open_ports?.length || 0), 0
      );
      
      // Prepend to history data
      data = [{
        timestamp,
        devices,
        ports
      }, ...data].slice(0, 10);
    }
    
    return data.map(scan => ({
      ...scan,
      timestamp: new Date(scan.timestamp).toLocaleTimeString(),
      date: new Date(scan.timestamp).toLocaleDateString(),
    })).slice(0, 10); // Only show last 10 scans
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const jsonData = JSON.parse(content) as NetworkScanResult;
        
        if (jsonData && Array.isArray(jsonData.devices)) {
          setUploadedData(jsonData);
          toast({
            title: "Data Loaded",
            description: `Loaded scan data with ${jsonData.devices.length} devices.`,
          });
          
          // Generate new alerts from the uploaded data
          const portsCount = jsonData.devices.reduce(
            (sum, device) => sum + (device.open_ports?.length || 0), 0
          );
          
          generateSecurityAlerts([{
            timestamp: new Date().toISOString(),
            devices: jsonData.devices.length,
            ports: portsCount
          }, ...scanHistory]);
          
        } else {
          toast({
            title: "Invalid Format",
            description: "The uploaded file doesn't contain valid scan data.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        toast({
          title: "Error Loading File",
          description: "Could not parse the JSON file. Please check the format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const downloadCSV = () => {
    // Create CSV for download
    const headers = ["Date", "Time", "Total Devices", "Open Ports"];
    let csvContent = headers.join(",") + "\n";
    
    // Add data rows
    scanHistory.forEach(scan => {
      const date = new Date(scan.timestamp);
      const row = [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        scan.devices,
        scan.ports
      ];
      csvContent += row.join(",") + "\n";
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `network_scan_history_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "CSV Downloaded",
      description: "Network scan history has been downloaded as CSV",
    });
  };

  // Generate OS distribution data from uploaded scan
  const getOSDistribution = () => {
    if (!uploadedData || !uploadedData.devices) return [];
    
    const osMap: {[key: string]: number} = {};
    uploadedData.devices.forEach(device => {
      const os = device.os || "Unknown";
      osMap[os] = (osMap[os] || 0) + 1;
    });
    
    return Object.entries(osMap).map(([name, value]) => ({ name, value }));
  };

  // Generate common ports data from uploaded scan
  const getCommonPorts = () => {
    if (!uploadedData || !uploadedData.devices) return [];
    
    const portMap: {[key: string]: number} = {};
    uploadedData.devices.forEach(device => {
      if (!device.open_ports) return;
      
      device.open_ports.forEach(port => {
        const portName = `${port.port} (${port.service})`;
        portMap[portName] = (portMap[portName] || 0) + 1;
      });
    });
    
    return Object.entries(portMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 ports
  };

  // Calculate security score based on scan data
  const calculateSecurityScore = () => {
    if (!scanHistory.length) return '-';
    
    const latestScan = scanHistory[0];
    const portRatio = latestScan.ports / Math.max(1, latestScan.devices);
    let score = 100;
    
    // Reduce score based on ratio of open ports to devices
    if (portRatio > 2) score -= 40;
    else if (portRatio > 1) score -= 20;
    else if (portRatio > 0.5) score -= 10;
    
    // Additional reduction for high absolute number of ports
    if (latestScan.ports > 20) score -= 20;
    else if (latestScan.ports > 10) score -= 10;
    
    return `${Math.max(0, Math.min(100, score))}%`;
  };

  const chartData = formatChartData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Network Statistics</h1>
            <p className="text-muted-foreground">
              Analysis and historical data of your network scans
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <label htmlFor="file-upload">
                <div className="flex cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Load JSON
                    </span>
                  </Button>
                  <Input 
                    id="file-upload" 
                    type="file" 
                    accept=".json" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Devices" 
            value={uploadedData?.devices?.length || (scanHistory[0]?.devices || '-')}
            description="All discovered devices" 
            icon={<Cpu className="h-5 w-5" />}
          />
          <StatCard 
            title="Open Ports" 
            value={uploadedData ? 
              uploadedData.devices.reduce((sum, device) => sum + (device.open_ports?.length || 0), 0) : 
              (scanHistory[0]?.ports || '-')}
            description="Total open ports" 
            icon={<Activity className="h-5 w-5" />}
          />
          <StatCard 
            title="Security Score" 
            value={calculateSecurityScore()}
            description="Network security rating" 
            icon={<Shield className="h-5 w-5" />}
          />
          <StatCard 
            title="Last Scan" 
            value={uploadedData ? 'Just now' : 
              (scanHistory[0] ? new Date(scanHistory[0].timestamp).toLocaleTimeString() : '-')}
            description="Time of latest scan" 
            icon={<Clock className="h-5 w-5" />}
          />
        </div>

        {/* Tabs for different stat views */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="ports">Ports</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Device History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        devices: { label: "Connected Devices", color: "#0ea5e9" },
                      }}
                    >
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="devices" 
                          name="Devices" 
                          stroke="#0ea5e9" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityAlerts.length > 0 ? (
                      securityAlerts.map((alert, i) => (
                        <SecurityAlert 
                          key={i} 
                          title={alert.title} 
                          message={alert.message} 
                          type={alert.type} 
                        />
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No security alerts available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {uploadedData && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>OS Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={getOSDistribution()}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {getOSDistribution().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} devices`, 'Count']} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Common Ports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={getCommonPorts()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip formatter={(value) => [`${value} devices`, 'Count']} />
                            <Legend />
                            <Bar dataKey="value" name="Devices" fill="#f97316" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Device Count History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      devices: { label: "Connected Devices", color: "#0ea5e9" },
                    }}
                  >
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis allowDecimals={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="devices" fill="#0ea5e9" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            {uploadedData && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Device Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Hostname</TableHead>
                        <TableHead>OS</TableHead>
                        <TableHead>Open Ports</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uploadedData.devices.map((device, index) => {
                        const hasOpenPorts = device.open_ports && device.open_ports.length > 0;
                        return (
                          <TableRow key={`${device.ip}-${index}`}>
                            <TableCell>{device.ip}</TableCell>
                            <TableCell>{device.hostname || 'Unknown'}</TableCell>
                            <TableCell>{device.os || 'Unknown'}</TableCell>
                            <TableCell>
                              {hasOpenPorts ? 
                                device.open_ports.map(p => `${p.port} (${p.service})`).join(', ') : 
                                'None'
                              }
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {hasOpenPorts ? 
                                  <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" /> : 
                                  <Shield className="h-4 w-4 mr-1 text-emerald-500" />
                                }
                                {hasOpenPorts ? 'Vulnerable' : 'Secure'}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="ports">
            <Card>
              <CardHeader>
                <CardTitle>Open Ports History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      ports: { label: "Open Ports", color: "#f97316" },
                    }}
                  >
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis allowDecimals={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="ports" fill="#f97316" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Network Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      devices: { label: "Devices", color: "#0ea5e9" },
                      ports: { label: "Open Ports", color: "#f97316" },
                    }}
                  >
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="devices" 
                        name="Devices" 
                        stroke="#0ea5e9" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="ports" 
                        name="Open Ports" 
                        stroke="#f97316" 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Scan History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chartData.length > 0 ? (
                    chartData.map((scan, i) => (
                      <div 
                        key={i} 
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">Scan Completed</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(scan.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-4 mt-2 md:mt-0">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Devices:</span>{" "}
                            <span className="font-medium">{scan.devices}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Ports:</span>{" "}
                            <span className="font-medium">{scan.ports}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No scan history available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Statistics;
