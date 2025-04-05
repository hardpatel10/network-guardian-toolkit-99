
import React, { useState, useEffect } from 'react';
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
  Line
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiService, ScanHistoryItem } from '@/services/apiService';

const Statistics: React.FC = () => {
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScanHistory = async () => {
      try {
        const history = await apiService.getScanHistory();
        setScanHistory(history);
      } catch (error) {
        console.error('Error fetching scan history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScanHistory();
  }, []);

  // Format data for charts
  const formatChartData = () => {
    return scanHistory.map(scan => ({
      ...scan,
      timestamp: new Date(scan.timestamp).toLocaleTimeString(),
      date: new Date(scan.timestamp).toLocaleDateString(),
    })).slice(-10); // Only show last 10 scans
  };

  const downloadCSV = () => {
    // Fake download function - in a real app, you'd call the backend endpoint
    const link = document.createElement('a');
    link.href = 'http://localhost:5000/download-history-csv';
    link.download = 'network_scan_history.csv';
    link.click();
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Network Statistics</h1>
          <Button variant="outline" onClick={downloadCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Tabs defaultValue="devices" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="ports">Open Ports</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Device Count History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formatChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="devices" name="Connected Devices" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ports">
            <Card>
              <CardHeader>
                <CardTitle>Open Ports History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formatChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ports" name="Open Ports" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Network Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
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
                  </ResponsiveContainer>
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
