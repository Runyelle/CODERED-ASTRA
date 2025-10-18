import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  BarChart3,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your waste management overview.</p>
          </div>
          <Button asChild>
            <Link href="/onboarding">
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Link>
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Waste Processed</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,458</div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span className="text-primary">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>3 pending approval</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span className="text-primary">+8.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24.5K</div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 text-destructive" />
                <span className="text-destructive">-3.1%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">Recent Requests</TabsTrigger>
            <TabsTrigger value="partners">Active Partners</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Recent Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Disposal Requests</CardTitle>
                <CardDescription>Track the status of your waste disposal requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "REQ-2025-001",
                      wasteType: "Chemical Waste",
                      quantity: "450 tons",
                      partner: "EcoRecycle Solutions",
                      status: "In Progress",
                      date: "Jan 15, 2025",
                    },
                    {
                      id: "REQ-2025-002",
                      wasteType: "Hazardous Waste",
                      quantity: "320 tons",
                      partner: "Industrial Waste Partners",
                      status: "Pending",
                      date: "Jan 14, 2025",
                    },
                    {
                      id: "REQ-2025-003",
                      wasteType: "Industrial Waste",
                      quantity: "680 tons",
                      partner: "CleanStream Environmental",
                      status: "Completed",
                      date: "Jan 12, 2025",
                    },
                    {
                      id: "REQ-2025-004",
                      wasteType: "Petroleum Waste",
                      quantity: "210 tons",
                      partner: "GreenTech Disposal",
                      status: "In Progress",
                      date: "Jan 10, 2025",
                    },
                  ].map((request) => (
                    <div
                      key={request.id}
                      className="flex flex-col gap-4 rounded-lg border border-border p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-foreground">{request.id}</span>
                          <Badge
                            variant={
                              request.status === "Completed"
                                ? "default"
                                : request.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {request.wasteType} • {request.quantity}
                        </div>
                        <div className="text-sm text-muted-foreground">Partner: {request.partner}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{request.date}</span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Partners Tab */}
          <TabsContent value="partners" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  name: "EcoRecycle Solutions",
                  location: "Houston, TX",
                  activeProjects: 3,
                  totalProcessed: "2,450 tons",
                  rating: 4.8,
                },
                {
                  name: "Industrial Waste Partners",
                  location: "Midland, TX",
                  activeProjects: 2,
                  totalProcessed: "3,120 tons",
                  rating: 4.9,
                },
                {
                  name: "CleanStream Environmental",
                  location: "Tulsa, OK",
                  activeProjects: 1,
                  totalProcessed: "1,890 tons",
                  rating: 4.7,
                },
                {
                  name: "GreenTech Disposal",
                  location: "Denver, CO",
                  activeProjects: 2,
                  totalProcessed: "1,650 tons",
                  rating: 4.6,
                },
              ].map((partner) => (
                <Card key={partner.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <CardDescription>{partner.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Active Projects</div>
                        <div className="text-2xl font-bold">{partner.activeProjects}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Processed</div>
                        <div className="text-2xl font-bold">{partner.totalProcessed}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">Rating:</span>
                        <span className="font-semibold text-foreground">{partner.rating}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Status</CardTitle>
                  <CardDescription>Your current regulatory compliance overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">EPA Compliance</div>
                        <div className="text-sm text-muted-foreground">All requirements met</div>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">RCRA Permits</div>
                        <div className="text-sm text-muted-foreground">Valid until Dec 2025</div>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-secondary" />
                      <div>
                        <div className="font-medium text-foreground">DOT Certification</div>
                        <div className="text-sm text-muted-foreground">Renewal due in 30 days</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Expiring Soon</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>Access your compliance documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Waste Manifest - REQ-2025-001", date: "Jan 15, 2025" },
                    { name: "EPA Compliance Report Q4 2024", date: "Jan 10, 2025" },
                    { name: "RCRA Annual Report 2024", date: "Jan 5, 2025" },
                    { name: "Waste Manifest - REQ-2024-098", date: "Dec 28, 2024" },
                  ].map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">{doc.date}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
