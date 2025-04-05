
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiService, NetworkDevice } from '@/services/apiService';
import { useToast } from "@/hooks/use-toast";
import { useQuery } from '@tanstack/react-query';
import { 
  Activity, 
  BarChart3, 
  Clock, 
  RefreshCw, 
  Wifi, 
  ArrowUp, 
  ArrowDown, 
  Loader2,
  Laptop,
  Smartphone,
  Monitor,
  Printer,
  Router
} from 'lucide-react';

interface DeviceUsage {
  deviceName: string;
  deviceType: string;
  downloadMB: number;
  uploadMB: number;
  activeTime: string;
}

interface TrafficData {
  hours: number[];
  download: number[];
  upload: number[];
}

const MonitoringPage: React.FC = () => {
  const { toast } = useToast();
  
  // Network scan data query
  const { 
    data: networkData, 
    isLoading: isNetworkLoading, 
    refetch: refetchNetworkData 
  } = useQuery({
    queryKey: ['networkScan'],
    queryFn: apiService.getNetworkScan,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  // State for generated data
  const [networkSpeed, setNetworkSpeed] = useState({ download: 0, upload: 0 });
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
  const [topDevices, setTopDevices] = useState<DeviceUsage[]>([]);
  const [isGeneratingData, setIsGeneratingData] = useState(true);
  
  const devices = networkData?.devices || [];
  const deviceCount = devices.length;

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'laptop': return <Laptop className="h-4 w-4" />;
      case 'smartphone': return <Smartphone className="h-4 w-4" />;
      case 'monitor': return <Monitor className="h-4 w-4" />;
      case 'printer': return <Printer className="h-4 w-4" />;
      case 'router': return <Router className="h-4 w-4" />;
      default: return <Laptop className="h-4 w-4" />;
    }
  };

  // Function to generate traffic data for charts
  const generateTrafficData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const download = hours.map(() => Math.floor(Math.random() * 80) + 20);
    const upload = hours.map(() => Math.floor(Math.random() * 40) + 5);
    
    return { hours, download, upload };
  };

  // Generate synthetic device usage data based on real network scan
  const generateDeviceUsage = (devices: NetworkDevice[]) => {
    if (!devices.length) return [];
    
    return devices.slice(0, 5).map(device => {
      const downloadMB = Math.floor(Math.random() * 3000) + 100;
      const uploadMB = Math.floor(downloadMB * (Math.random() * 0.5));
      const hours = Math.floor(Math.random() * 12) + 1;
      const minutes = Math.floor(Math.random() * 60);
      
      let deviceType = 'laptop';
      const hostname = (device.hostname || '').toLowerCase();
      
      if (hostname.includes('phone') || hostname.includes('mobile')) {
        deviceType = 'smartphone';
      } else if (hostname.includes('tv') || hostname.includes('screen')) {
        deviceType = 'monitor';
      } else if (hostname.includes('print')) {
        deviceType = 'printer';
      } else if (hostname.includes('router') || hostname.includes('gateway')) {
        deviceType = 'router';
      }

      return {
        deviceName: device.hostname || `Device (${device.ip})`,
        deviceType,
        downloadMB,
        uploadMB,
        activeTime: `${hours}h ${minutes}m`
      };
    }).sort((a, b) => b.downloadMB - a.downloadMB); // Sort by highest download
  };

  const fetchNetworkData = async () => {
    setIsGeneratingData(true);
    
    try {
      await refetchNetworkData();
      
      // Generate traffic data for the charts
      const newTrafficData = generateTrafficData();
      setTrafficData(newTrafficData);
      
      // Set simulated network speed
      setNetworkSpeed({
        download: Math.floor(Math.random() * 50) + 60,
        upload: Math.floor(Math.random() * 20) + 15
      });
      
      toast({
        title: "Network monitoring updated",
        description: `Monitoring ${deviceCount} devices on your network`
      });
    } catch (error) {
      console.error('Error fetching network monitoring data:', error);
      toast({
        title: "Update failed",
        description: "Could not fetch network monitoring data",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingData(false);
    }
  };

  // Initialize data
  useEffect(() => {
    if (devices.length > 0 && isGeneratingData) {
      // Generate top devices data
      const generatedDevices = generateDeviceUsage(devices);
      setTopDevices(generatedDevices);
      
      // Generate traffic data if not already done
      if (!trafficData) {
        const newTrafficData = generateTrafficData();
        setTrafficData(newTrafficData);
      }
      
      // Generate network speed if not set
      if (networkSpeed.download === 0) {
        setNetworkSpeed({
          download: Math.floor(Math.random() * 50) + 60,
          upload: Math.floor(Math.random() * 20) + 15
        });
      }
      
      setIsGeneratingData(false);
    }
  }, [devices, isGeneratingData]);

  // Initial data load
  useEffect(() => {
    fetchNetworkData();
  }, []);

  const isLoading = isNetworkLoading || isGeneratingData;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Network Monitoring</h1>
            <p className="text-muted-foreground">
              Monitor your network performance and usage
            </p>
          </div>
          <Button
            onClick={fetchNetworkData}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Update
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Download Speed</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-8 bg-secondary rounded-md w-24"></div>
                  <div className="h-1 bg-secondary rounded-md w-full"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <ArrowDown className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-2xl font-bold">{networkSpeed.download} Mbps</div>
                  </div>
                  <Progress value={networkSpeed.download / 1.5} className="h-1 mt-2" />
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upload Speed</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-8 bg-secondary rounded-md w-24"></div>
                  <div className="h-1 bg-secondary rounded-md w-full"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <ArrowUp className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-2xl font-bold">{networkSpeed.upload} Mbps</div>
                  </div>
                  <Progress value={networkSpeed.upload / 0.5} className="h-1 mt-2" />
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Connected Devices</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-8 bg-secondary rounded-md w-16"></div>
                  <div className="h-4 bg-secondary rounded-md w-32"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <Wifi className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-2xl font-bold">{deviceCount}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Active on your network</p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Network Health</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-8 bg-secondary rounded-md w-24"></div>
                  <div className="h-1 bg-secondary rounded-md w-full"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <Activity className="mr-2 h-4 w-4 text-security-safe" />
                    <div className="text-2xl font-bold">
                      {deviceCount > 10 ? 'Good' : deviceCount > 5 ? 'Excellent' : 'Optimal'}
                    </div>
                  </div>
                  <Progress value={deviceCount > 10 ? 85 : deviceCount > 5 ? 92 : 98} className="h-1 mt-2" />
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="usage">
          <TabsList>
            <TabsTrigger value="usage">
              <BarChart3 className="mr-2 h-4 w-4" />
              Usage Patterns
            </TabsTrigger>
            <TabsTrigger value="devices">
              <Laptop className="mr-2 h-4 w-4" />
              Device Usage
            </TabsTrigger>
            <TabsTrigger value="historical">
              <Clock className="mr-2 h-4 w-4" />
              Historical Data
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>24 Hour Network Usage</CardTitle>
                <CardDescription>Download and upload traffic over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading || !trafficData ? (
                  <div className="h-[300px] w-full flex items-center justify-center bg-secondary/20 rounded-md">
                    <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="h-[300px] w-full">
                    {/* This would be a chart in a real application */}
                    <div className="h-full w-full bg-secondary/20 rounded-md flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-x-0 bottom-0 h-[60%]">
                        {trafficData.hours.map((hour, idx) => (
                          <div 
                            key={hour} 
                            className="absolute bottom-0 bg-primary opacity-70 rounded-t-sm"
                            style={{
                              height: `${trafficData.download[idx]}%`,
                              width: '2.5%',
                              left: `${idx * 4.16}%`
                            }}
                          >
                            <div 
                              className="absolute bottom-0 w-full bg-primary-foreground/20 rounded-t-sm"
                              style={{
                                height: `${trafficData.upload[idx] / trafficData.download[idx] * 100}%`,
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                      <div className="z-10 text-sm text-muted-foreground">Interactive Chart (Simulated)</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">Download</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-primary-foreground/40 mr-2"></div>
                    <span className="text-sm">Upload</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-20 bg-secondary rounded-md animate-pulse"></div>
                    ) : (
                      `${(topDevices.reduce((sum, d) => sum + d.downloadMB, 0) / 1024).toFixed(1)} GB`
                    )}
                  </div>
                  <Badge className="mt-1">Last 30 days</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-20 bg-secondary rounded-md animate-pulse"></div>
                    ) : (
                      `${(topDevices.reduce((sum, d) => sum + d.uploadMB, 0) / 1024).toFixed(1)} GB`
                    )}
                  </div>
                  <Badge className="mt-1">Last 30 days</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Peak Usage Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-20 bg-secondary rounded-md animate-pulse"></div>
                    ) : (
                      '8:00 PM'
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Average peak time</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Top Devices by Usage</CardTitle>
                <CardDescription>Devices using the most bandwidth on your network</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="animate-pulse grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-5 flex items-center">
                          <div className="p-2 bg-secondary rounded-full mr-2 h-8 w-8"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-secondary rounded w-24"></div>
                            <div className="h-3 bg-secondary/50 rounded w-16"></div>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="h-4 bg-secondary rounded w-16"></div>
                        </div>
                        <div className="col-span-3">
                          <div className="h-4 bg-secondary rounded w-16"></div>
                        </div>
                        <div className="col-span-1">
                          <div className="h-4 bg-secondary rounded-full w-4 ml-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : topDevices.length > 0 ? (
                  <div className="space-y-4">
                    {topDevices.map((device, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-5 flex items-center">
                          <div className="p-2 bg-secondary rounded-full mr-2">
                            {getDeviceIcon(device.deviceType)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{device.deviceName}</p>
                            <p className="text-xs text-muted-foreground">Active: {device.activeTime}</p>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="flex items-center gap-1">
                            <ArrowDown className="h-3 w-3 text-primary" />
                            <span className="text-sm">{(device.downloadMB / 1024).toFixed(1)} GB</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="flex items-center gap-1">
                            <ArrowUp className="h-3 w-3 text-primary" />
                            <span className="text-sm">{(device.uploadMB / 1024).toFixed(1)} GB</span>
                          </div>
                        </div>
                        <div className="col-span-1 text-right">
                          <Badge variant="outline" className="text-xs">
                            {idx + 1}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Laptop className="h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground mb-1">No device usage data available</p>
                    <p className="text-xs text-muted-foreground">Try scanning your network</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="historical">
            <Card>
              <CardHeader>
                <CardTitle>Historical Network Performance</CardTitle>
                <CardDescription>Network speed and reliability over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex justify-center items-center bg-secondary/10 rounded-md">
                  <div className="text-center text-muted-foreground">
                    <p>Historical data charts would be displayed here</p>
                    <p className="text-sm mt-2">Connect your device to the monitoring service for historical data</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3 mt-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Avg. Download</span>
                    <span className="text-2xl font-semibold">{networkSpeed.download - 5} Mbps</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Avg. Upload</span>
                    <span className="text-2xl font-semibold">{networkSpeed.upload - 3} Mbps</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Uptime</span>
                    <span className="text-2xl font-semibold">99.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MonitoringPage;
