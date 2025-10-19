"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  ShoppingCart,
  Upload
} from "lucide-react"
import { getOrders, getOrderStats, updateOrderStatus, type Order } from "@/lib/order-storage"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const loadOrders = () => {
      const allOrders = getOrders()
      setOrders(allOrders)
      setFilteredOrders(allOrders)
      setStats(getOrderStats())
    }
    
    loadOrders()
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadOrders()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', loadOrders)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', loadOrders)
    }
  }, [])

  // Filter orders based on search and filters
  useEffect(() => {
    let filtered = orders

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.materialType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(order => order.priority === priorityFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchQuery, statusFilter, priorityFilter])

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus)
    
    // Refresh orders
    const updatedOrders = getOrders()
    setOrders(updatedOrders)
    setStats(getOrderStats())
  }

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      pending: { variant: "outline" as const, color: "text-yellow-600" },
      confirmed: { variant: "secondary" as const, color: "text-blue-600" },
      in_progress: { variant: "default" as const, color: "text-blue-600" },
      shipped: { variant: "default" as const, color: "text-purple-600" },
      delivered: { variant: "default" as const, color: "text-green-600" },
      completed: { variant: "default" as const, color: "text-green-600" },
      cancelled: { variant: "destructive" as const, color: "text-red-600" }
    }
    
    const config = variants[status] || variants.pending
    return <Badge variant={config.variant} className={config.color}>{status.replace('_', ' ')}</Badge>
  }

  const getPriorityBadge = (priority: Order['priority']) => {
    const variants = {
      low: { variant: "outline" as const, color: "text-gray-600" },
      medium: { variant: "secondary" as const, color: "text-blue-600" },
      high: { variant: "default" as const, color: "text-orange-600" },
      urgent: { variant: "destructive" as const, color: "text-red-600" }
    }
    
    const config = variants[priority] || variants.medium
    return <Badge variant={config.variant} className={config.color}>{priority}</Badge>
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4" />
      case 'in_progress':
        return <Package className="h-4 w-4" />
      case 'shipped':
        return <Truck className="h-4 w-4" />
      case 'delivered':
      case 'completed':
        return <CheckCircle2 className="h-4 w-4" />
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
              <p className="text-muted-foreground">Manage and track all your waste management orders</p>
            </div>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="glass-card border-border/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <Package className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-border/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-border/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-border/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="glass-card border-border/40 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="glass-card border-border/40">
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
                <p className="text-muted-foreground mb-4">
                  {orders.length === 0 
                    ? "You haven't created any orders yet. Create your first order from a listing."
                    : "No orders match your current filters."
                  }
                </p>
                {orders.length === 0 && (
                  <Button asChild>
                    <Link href="/dashboard">
                      <Plus className="h-4 w-4 mr-2" />
                      Browse Listings
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="glass-card border-border/40">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                      <CardDescription>
                        {order.materialType} • {order.quantity} {order.unit}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(order.status)}
                      {getPriorityBadge(order.priority)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{order.companyName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{order.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-sm text-muted-foreground">
                        {order.listingType === 'seller' ? 'Purchase Order' : 'Sales Order'}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {order.status === 'pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                      )}
                      {order.status === 'confirmed' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, 'in_progress')}
                        >
                          Start Processing
                        </Button>
                      )}
                      {order.status === 'in_progress' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, 'shipped')}
                        >
                          Mark Shipped
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, 'delivered')}
                        >
                          Mark Delivered
                        </Button>
                      )}
                      {order.status === 'delivered' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, 'completed')}
                        >
                          Complete Order
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
