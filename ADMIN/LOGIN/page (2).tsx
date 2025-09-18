"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Settings,
  Calendar,
  Star,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Edit,
  Trash2,
  LogOut,
  IndianRupee,
} from "lucide-react"
import { serviceProviders } from "@/lib/data"

// Mock admin data
const adminStats = {
  totalProviders: 100,
  activeProviders: 87,
  pendingApprovals: 8,
  totalBookings: 1247,
  completedBookings: 1089,
  cancelledBookings: 158,
  totalRevenue: 456700,
  monthlyGrowth: 12.5,
}

const recentBookings = [
  {
    id: 1,
    customerName: "Rajesh Kumar",
    providerName: "Indore QuickFix Plumbing",
    service: "Emergency Plumbing",
    date: "2024-01-15",
    status: "completed",
    amount: 1500,
  },
  {
    id: 2,
    customerName: "Priya Sharma",
    providerName: "Indore Math Academy",
    service: "Math Tutoring",
    date: "2024-01-14",
    status: "confirmed",
    amount: 800,
  },
  {
    id: 3,
    customerName: "Amit Patel",
    providerName: "MP ElectroMax Solutions",
    service: "Electrical Repair",
    date: "2024-01-13",
    status: "pending",
    amount: 1200,
  },
]

const pendingProviders = [
  {
    id: 101,
    name: "Indore Elite Catering",
    category: "Other Services",
    email: "elite@indorecatering.com",
    phone: "+91-9999888777",
    submittedDate: "2024-01-10",
    documents: ["Business License", "Food Safety Certificate"],
    location: "Palasia, Indore",
  },
  {
    id: 102,
    name: "FitZone Personal Trainers",
    category: "Other Services",
    email: "info@fitzoneindore.com",
    phone: "+91-9888777666",
    submittedDate: "2024-01-12",
    documents: ["Fitness Certification", "Background Check"],
    location: "Vijay Nagar, Indore",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState("")
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth")
    const user = localStorage.getItem("adminUser")

    if (authStatus === "true" && user) {
      setIsAuthenticated(true)
      setAdminUser(user)
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  const handleApproveProvider = (providerId: number) => {
    console.log(`[v0] Approving provider ${providerId}`)
    // In real implementation, this would make an API call
    alert(`Provider ${providerId} has been approved and can now accept bookings.`)
  }

  const handleRejectProvider = (providerId: number) => {
    console.log(`[v0] Rejecting provider ${providerId}`)
    // In real implementation, this would make an API call
    alert(`Provider ${providerId} has been rejected.`)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">IndoreConnect Admin</h1>
                <p className="text-xs text-muted-foreground">Welcome back, {adminUser}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage IndoreConnect platform and service providers</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="approvals">
              Approvals
              {pendingProviders.length > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {pendingProviders.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
                  <Users className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{adminStats.totalProviders}</div>
                  <p className="text-xs text-muted-foreground">
                    {adminStats.activeProviders} active, {adminStats.pendingApprovals} pending
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-5 w-5 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">{adminStats.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">
                    {adminStats.completedBookings} completed, {adminStats.cancelledBookings} cancelled
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <IndianRupee className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">₹{adminStats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{adminStats.monthlyGrowth}% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-destructive">{adminStats.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest service bookings on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div>
                            <p className="font-medium text-sm">{booking.customerName}</p>
                            <p className="text-xs text-muted-foreground">
                              {booking.service} • {booking.providerName}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm text-primary">₹{booking.amount}</p>
                          <p className="text-xs text-muted-foreground">{booking.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Top Providers</CardTitle>
                  <CardDescription>Highest rated service providers in Indore</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceProviders
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 5)
                      .map((provider) => (
                        <div key={provider.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            {provider.verified && <Shield className="w-4 h-4 text-primary" />}
                            <div>
                              <p className="font-medium text-sm">{provider.name}</p>
                              <p className="text-xs text-muted-foreground">{provider.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-secondary text-secondary" />
                            <span className="text-sm font-medium">{provider.rating}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Providers Tab */}
          <TabsContent value="providers" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search providers..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Service Providers</CardTitle>
                <CardDescription>Manage all registered service providers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Provider</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceProviders.slice(0, 10).map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {provider.verified && <Shield className="w-4 h-4 text-primary" />}
                            <div>
                              <p className="font-medium">{provider.name}</p>
                              <p className="text-sm text-muted-foreground">{provider.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{provider.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-secondary text-secondary" />
                            <span>{provider.rating}</span>
                            <span className="text-sm text-muted-foreground">({provider.reviews})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              provider.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {provider.verified ? "Verified" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Monitor and manage service bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell>{booking.providerName}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{booking.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Pending Provider Approvals
                  <Badge variant="destructive" className="text-xs">
                    {pendingProviders.length} pending
                  </Badge>
                </CardTitle>
                <CardDescription>Review and approve new service provider applications for Indore</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingProviders.map((provider) => (
                    <div key={provider.id} className="border rounded-xl p-6 bg-muted/30">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {provider.category} • {provider.location}
                          </p>
                          <p className="text-sm text-muted-foreground">Applied on {provider.submittedDate}</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Pending Review
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm font-medium mb-2">Contact Information</p>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">{provider.email}</p>
                            <p className="text-sm text-muted-foreground">{provider.phone}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Submitted Documents</p>
                          <div className="flex flex-wrap gap-2">
                            {provider.documents.map((doc) => (
                              <Badge key={doc} variant="secondary" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveProvider(provider.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve Provider
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRejectProvider(provider.id)}>
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Application
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Review Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
