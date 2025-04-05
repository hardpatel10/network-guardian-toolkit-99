
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiService } from '@/services/apiService';
import { useToast } from "@/hooks/use-toast";
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

const MonitoringPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [networkSpeed, setNetworkSpeed] = useState({ download: 0, upload: 0, ping: 0 });
  const [deviceCount, setDeviceCount] = useState(0);
  const [trafficData, setTrafficData] = useState({ hours: [], download: [], upload: [] });
  const [topDevices, setTopDevices] = useState([]);
  const { toast } = useToast();
  
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

  const fetchNetworkData = async () => {
    setIsLoading(true);
    
    try {
      // Get connected devices count
      const networkData = await apiService.getNetworkScan();
      setDeviceCount(networkData.devices?.length || 0);
      
      // Get network speed data
      const speedData = await apiService.getNetworkSpeed();
      setNetworkSpeed(speedData);
      
      // Get network traffic data
      const traffic = await apiService.getNetworkTraffic();
      setTrafficData(traffic);
      
      // Get device usage data
      const deviceUsage = await apiService.getDeviceUsage();
      setTopDevices(deviceUsage);
      
      toast({
        title: "Network monitoring updated",
        description: `Monitoring ${networkData.devices?.length || 0} devices on your network`
      });
    } catch (error) {
      console.error('Error fetching network monitoring data:', error);
      toast({
        title: "Update failed",
        description: "Could not fetch network monitoring data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworkData();
  }, []);

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
                <div className="animate-pulse h-8 w-24 bg-secondary/50 rounded"></div>
              ) : (
                <div className="flex items-center">
                  <ArrowDown className="mr-2 h-4 w-4 text-primary" />
                  <div className="text-2xl font-bold">{networkSpeed.download} Mbps</div>
                </div>
              )}
              <Progress value={networkSpeed.download / 1.5} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upload Speed</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse h-8 w-24 bg-secondary/50 rounded"></div>
              ) : (
                <div className="flex items-center">
                  <ArrowUp className="mr-2 h-4 w-4 text-primary" />
                  <div className="text-2xl font-bold">{networkSpeed.upload} Mbps</div>
                </div>
              )}
              <Progress value={networkSpeed.upload / 0.5} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Connected Devices</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse h-8 w-16 bg-secondary/50 rounded"></div>
              ) : (
                <div className="flex items-center">
                  <Wifi className="mr-2 h-4 w-4 text-primary" />
                  <div className="text-2xl font-bold">{deviceCount}</div>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">Active on your network</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Network Health</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse h-8 w-24 bg-secondary/50 rounded"></div>
              ) : (
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4 text-security-safe" />
                  <div className="text-2xl font-bold">
                    {networkSpeed.ping < 10 ? "Excellent" : networkSpeed.ping < 30 ? "Good" : "Fair"}
                  </div>
                </div>
              )}
              <Progress 
                value={networkSpeed.ping < 10 ? 96 : networkSpeed.ping < 30 ? 75 : 60} 
                className="h-1 mt-2" 
              />
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
                {isLoading ? (
                  <div className="animate-pulse h-[300px] bg-secondary/20 rounded-md"></div>
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
                      <div className="animate-pulse h-8 w-20 bg-secondary/50 rounded"></div>
                    ) : (
                      `${(topDevices.reduce((total, device) => total + device.downloadMB, 0) / 1024).toFixed(1)} GB`
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
                      <div className="animate-pulse h-8 w-20 bg-secondary/50 rounded"></div>
                    ) : (
                      `${(topDevices.reduce((total, device) => total + device.uploadMB, 0) / 1024).toFixed(1)} GB`
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
                      <div className="animate-pulse h-8 w-16 bg-secondary/50 rounded"></div>
                    ) : (
                      `${8}:00 PM`
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
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse h-14 bg-secondary/30 rounded-md"></div>
                    ))}
                  </div>
                ) : (
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
                {isLoading ? (
                  <div className="animate-pulse h-[300px] bg-secondary/20 rounded-md"></div>
                ) : (
                  <div className="h-[300px] w-full flex justify-center items-center">
                    <div className="text-center text-muted-foreground">
                      <p>Historical data charts would be displayed here</p>
                      <p className="text-sm mt-2">Connect your device to the monitoring service for historical data</p>
                    </div>
                  </div>
                )}
                <div className="grid gap-4 md:grid-cols-3 mt-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Avg. Download</span>
                    <span className="text-2xl font-semibold">{networkSpeed.download.toFixed(1)} Mbps</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Avg. Upload</span>
                    <span className="text-2xl font-semibold">{networkSpeed.upload.toFixed(1)} Mbps</span>
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
