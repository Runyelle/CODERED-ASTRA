"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Package, 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle,
  FileText,
  Phone,
  Mail,
  Download
} from "lucide-react"
import { getOrderById, updateOrderStatus, addOrderNote, type Order } from "@/lib/order-storage"

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [newNote, setNewNote] = useState("")
  const [addingNote, setAddingNote] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const loadOrder = () => {
      const foundOrder = getOrderById(orderId)
      if (foundOrder) {
        setOrder(foundOrder)
      }
      setLoading(false)
    }
    
    loadOrder()
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadOrder()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', loadOrder)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', loadOrder)
    }
  }, [orderId])

  const handleStatusUpdate = (newStatus: Order['status']) => {
    if (!order) return
    
    updateOrderStatus(order.id, newStatus)
    
    // Refresh order data
    const updatedOrder = getOrderById(orderId)
    if (updatedOrder) {
      setOrder(updatedOrder)
    }
  }

  const handleAddNote = async () => {
    if (!order || !newNote.trim()) return
    
    setAddingNote(true)
    try {
      addOrderNote(order.id, newNote.trim())
      setNewNote("")
      
      // Refresh order data
      const updatedOrder = getOrderById(orderId)
      if (updatedOrder) {
        setOrder(updatedOrder)
      }
    } catch (error) {
      console.error('Error adding note:', error)
    } finally {
      setAddingNote(false)
    }
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

  const downloadOrderDetails = () => {
    if (!order) return
    
    const orderContent = `
ORDER DETAILS
Order Number: ${order.orderNumber}
Company: ${order.companyName}
Contact: ${order.contactName}
Email: ${order.email}
Phone: ${order.phone}
Location: ${order.location}

MATERIAL DETAILS:
Material Type: ${order.materialType}
Quantity: ${order.quantity} ${order.unit}
Price per ${order.unit}: $${order.pricePerUnit}
Total Price: $${order.totalPrice}
Frequency: ${order.frequency}

ORDER INFORMATION:
Status: ${order.status}
Priority: ${order.priority}
Order Date: ${new Date(order.orderDate).toLocaleDateString()}
Expected Delivery: ${new Date(order.expectedDelivery).toLocaleDateString()}
Payment Terms: ${order.paymentTerms}
Payment Status: ${order.paymentStatus}

DELIVERY INFORMATION:
Delivery Address: ${order.deliveryAddress || 'Not specified'}
Billing Address: ${order.billingAddress || 'Not specified'}

SPECIAL INSTRUCTIONS:
${order.specialInstructions || 'None'}

NOTES:
${order.notes || 'None'}

Generated on: ${new Date().toLocaleDateString()}
    `
    
    const blob = new Blob([orderContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `order-${order.orderNumber}-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested order could not be found.</p>
            <Button onClick={() => router.push('/orders')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{order.orderNumber}</h1>
              <p className="text-muted-foreground">
                {order.materialType} • {order.quantity} {order.unit} • ${order.totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(order.status)}
              {getPriorityBadge(order.priority)}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{order.companyName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{order.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{order.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{order.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Material Details */}
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Material Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Material Type:</span>
                    <p className="text-muted-foreground">{order.materialType}</p>
                  </div>
                  <div>
                    <span className="font-medium">Quantity:</span>
                    <p className="text-muted-foreground">{order.quantity} {order.unit}</p>
                  </div>
                  <div>
                    <span className="font-medium">Price per {order.unit}:</span>
                    <p className="text-muted-foreground">${order.pricePerUnit}</p>
                  </div>
                  <div>
                    <span className="font-medium">Total Price:</span>
                    <p className="text-muted-foreground font-bold">${order.totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Frequency:</span>
                    <p className="text-muted-foreground">{order.frequency}</p>
                  </div>
                  <div>
                    <span className="font-medium">Payment Terms:</span>
                    <p className="text-muted-foreground">{order.paymentTerms}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-sm">Delivery Address:</span>
                    <p className="text-sm text-muted-foreground">{order.deliveryAddress || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Billing Address:</span>
                    <p className="text-sm text-muted-foreground">{order.billingAddress || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Expected Delivery:</span>
                    <p className="text-sm text-muted-foreground">{new Date(order.expectedDelivery).toLocaleDateString()}</p>
                  </div>
                  {order.specialInstructions && (
                    <div>
                      <span className="font-medium text-sm">Special Instructions:</span>
                      <p className="text-sm text-muted-foreground">{order.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {order.notes && (
              <Card className="glass-card border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Order Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{order.notes}</p>
                </CardContent>
              </Card>
            )}

            {/* Add Note */}
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle>Add Note</CardTitle>
                <CardDescription>Add a note to this order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note to this order..."
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={3}
                />
                <Button 
                  onClick={handleAddNote}
                  disabled={!newNote.trim() || addingNote}
                  size="sm"
                >
                  {addingNote ? 'Adding...' : 'Add Note'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Actions */}
          <div className="space-y-6">
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle>Order Actions</CardTitle>
                <CardDescription>Manage this order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.status === 'pending' && (
                  <Button 
                    onClick={() => handleStatusUpdate('confirmed')}
                    className="w-full"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Confirm Order
                  </Button>
                )}
                {order.status === 'confirmed' && (
                  <Button 
                    onClick={() => handleStatusUpdate('in_progress')}
                    className="w-full"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Start Processing
                  </Button>
                )}
                {order.status === 'in_progress' && (
                  <Button 
                    onClick={() => handleStatusUpdate('shipped')}
                    className="w-full"
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Mark Shipped
                  </Button>
                )}
                {order.status === 'shipped' && (
                  <Button 
                    onClick={() => handleStatusUpdate('delivered')}
                    className="w-full"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark Delivered
                  </Button>
                )}
                {order.status === 'delivered' && (
                  <Button 
                    onClick={() => handleStatusUpdate('completed')}
                    className="w-full"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Complete Order
                  </Button>
                )}
                
                <Button 
                  onClick={downloadOrderDetails}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Details
                </Button>
              </CardContent>
            </Card>

            {/* Order Status */}
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="text-sm">Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority:</span>
                    <span className="capitalize">{order.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order Date:</span>
                    <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Delivery:</span>
                    <span>{new Date(order.expectedDelivery).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Status:</span>
                    <span className="capitalize">{order.paymentStatus}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
