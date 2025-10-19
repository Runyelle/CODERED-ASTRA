"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  ShoppingCart, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Building2,
  MapPin,
  Calendar,
  Package,
  DollarSign,
  FileText,
  Truck
} from "lucide-react"
import { getSellerListings, getBuyerListings } from "@/lib/data-storage"
import { createOrder } from "@/lib/order-storage"
import { createNotification, addNotification } from "@/components/notifications"
import type { SellerListing, BuyerListing } from "@/lib/data-storage"

export default function CreateOrderPage() {
  const params = useParams()
  const router = useRouter()
  const listingId = params.listingId as string
  
  const [listing, setListing] = useState<SellerListing | BuyerListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [orderCreated, setOrderCreated] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  // Order form data
  const [orderData, setOrderData] = useState({
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    notes: '',
    specialInstructions: '',
    deliveryAddress: '',
    billingAddress: '',
    paymentTerms: 'Net 30',
    expectedDelivery: ''
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Load listing data
    const sellers = getSellerListings()
    const buyers = getBuyerListings()
    const allListings = [...sellers, ...buyers]
    const foundListing = allListings.find(l => l.id === listingId)
    
    if (foundListing) {
      setListing(foundListing)
      // Set default delivery address to company location
      setOrderData(prev => ({
        ...prev,
        deliveryAddress: foundListing.location,
        billingAddress: foundListing.location,
        expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }))
    }
    setLoading(false)
  }, [listingId])

  const handleCreateOrder = async () => {
    if (!listing) return
    
    setSubmitting(true)
    
    try {
      // Create the order
      const order = createOrder(listing, {
        priority: orderData.priority,
        notes: orderData.notes,
        specialInstructions: orderData.specialInstructions,
        deliveryAddress: orderData.deliveryAddress,
        billingAddress: orderData.billingAddress,
        paymentTerms: orderData.paymentTerms,
        expectedDelivery: new Date(orderData.expectedDelivery).toISOString()
      })
      
      // Create notification
      const notification = createNotification(
        'new_listing',
        'Order Created',
        `New order ${order.orderNumber} has been created for ${order.materialType} from ${order.companyName}.`,
        order.id,
        order.listingType
      )
      addNotification(notification)
      
      setOrderCreated(true)
      
      // Redirect to orders page after success
      setTimeout(() => {
        router.push('/orders')
      }, 2000)
    } catch (error) {
      console.error('Error creating order:', error)
      alert('There was an error creating the order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading listing details...</p>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Listing Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested listing could not be found.</p>
            <Button onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (orderCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Order Created Successfully!</h2>
            <p className="text-muted-foreground mb-4">
              Your order has been created and is now being processed. You will be redirected to the orders page.
            </p>
            <Button onClick={() => router.push('/orders')}>
              View Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isSellerListing = listing.type === 'seller'
  const materialType = isSellerListing ? (listing as SellerListing).wasteType : (listing as BuyerListing).materialType
  const pricePerUnit = isSellerListing ? (listing as SellerListing).disposalCost : (listing as BuyerListing).sourcingCost
  const totalPrice = parseFloat(listing.quantity || '0') * parseFloat(pricePerUnit || '0')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
          
          <div className="flex items-center gap-3 mb-2">
            {isSellerListing ? (
              <Upload className="h-8 w-8 text-primary" />
            ) : (
              <ShoppingCart className="h-8 w-8 text-primary" />
            )}
            <h1 className="text-3xl font-bold">Create Order</h1>
          </div>
          <p className="text-muted-foreground">
            Create a new order from this {isSellerListing ? 'sell' : 'buy'} listing
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Order Details
                </CardTitle>
                <CardDescription>
                  Fill in the details to create your order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Priority and Terms */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={orderData.priority} 
                      onValueChange={(value: any) => setOrderData(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select 
                      value={orderData.paymentTerms} 
                      onValueChange={(value) => setOrderData(prev => ({ ...prev, paymentTerms: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Net 15">Net 15</SelectItem>
                        <SelectItem value="Net 30">Net 30</SelectItem>
                        <SelectItem value="Net 60">Net 60</SelectItem>
                        <SelectItem value="COD">Cash on Delivery</SelectItem>
                        <SelectItem value="Prepaid">Prepaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Delivery Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">Delivery Address</Label>
                    <Textarea
                      id="deliveryAddress"
                      value={orderData.deliveryAddress}
                      onChange={(e) => setOrderData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                      placeholder="Enter delivery address"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <Textarea
                      id="billingAddress"
                      value={orderData.billingAddress}
                      onChange={(e) => setOrderData(prev => ({ ...prev, billingAddress: e.target.value }))}
                      placeholder="Enter billing address"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expectedDelivery">Expected Delivery Date</Label>
                    <Input
                      id="expectedDelivery"
                      type="date"
                      value={orderData.expectedDelivery}
                      onChange={(e) => setOrderData(prev => ({ ...prev, expectedDelivery: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Instructions</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      value={orderData.specialInstructions}
                      onChange={(e) => setOrderData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                      placeholder="Any special handling or delivery instructions"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={orderData.notes}
                      onChange={(e) => setOrderData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any additional notes or requirements"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button 
                    onClick={handleCreateOrder}
                    disabled={submitting}
                    className="flex-1"
                  >
                    {submitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Creating Order...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Create Order
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Company Information */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{listing.companyName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{listing.location}</span>
                  </div>
                </div>

                {/* Material Details */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Material:</span>
                    <span className="text-sm font-medium">{materialType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quantity:</span>
                    <span className="text-sm font-medium">{listing.quantity} {listing.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Price per {listing.unit}:</span>
                    <span className="text-sm font-medium">${pricePerUnit}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Priority:</span>
                    <Badge variant={orderData.priority === 'urgent' ? 'destructive' : 'secondary'}>
                      {orderData.priority}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Payment Terms:</span>
                    <span className="text-sm">{orderData.paymentTerms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Expected Delivery:</span>
                    <span className="text-sm">{new Date(orderData.expectedDelivery).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Information */}
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="text-sm">Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="capitalize">{isSellerListing ? 'Purchase' : 'Sale'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span>{new Date().toLocaleDateString()}</span>
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
