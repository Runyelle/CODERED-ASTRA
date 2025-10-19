// Order storage utilities for managing buy/sell orders

export interface Order {
  id: string
  orderNumber: string
  listingId: string
  listingType: 'seller' | 'buyer'
  companyName: string
  contactName: string
  email: string
  phone: string
  location: string
  
  // Order details
  materialType: string
  quantity: string
  unit: string
  pricePerUnit: number
  totalPrice: number
  frequency: string
  
  // Order status and tracking
  status: 'pending' | 'confirmed' | 'in_progress' | 'shipped' | 'delivered' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  
  // Dates
  orderDate: string
  expectedDelivery: string
  actualDelivery?: string
  createdAt: string
  updatedAt: string
  
  // Additional details
  notes?: string
  specialInstructions?: string
  deliveryAddress?: string
  billingAddress?: string
  
  // Business logic
  paymentTerms: string
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue'
  invoiceNumber?: string
  trackingNumber?: string
  
  // Related parties
  buyerCompany?: string
  sellerCompany?: string
  assignedTo?: string
}

const ORDERS_KEY = 'wasteflow_orders'

// Helper functions
const generateId = (): string => {
  return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

const generateOrderNumber = (): string => {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `WF${year}${month}${day}${random}`
}

const getTimestamp = (): string => {
  return new Date().toISOString()
}

// Order management functions
export const createOrder = (listingData: any, orderDetails: Partial<Order> = {}): Order => {
  const order: Order = {
    id: generateId(),
    orderNumber: generateOrderNumber(),
    listingId: listingData.id,
    listingType: listingData.type,
    companyName: listingData.companyName,
    contactName: listingData.contactName,
    email: listingData.email,
    phone: listingData.phone,
    location: listingData.location,
    
    materialType: listingData.type === 'seller' ? listingData.wasteType : listingData.materialType,
    quantity: listingData.quantity,
    unit: listingData.unit,
    pricePerUnit: listingData.type === 'seller' 
      ? parseFloat(listingData.disposalCost || '0') 
      : parseFloat(listingData.sourcingCost || '0'),
    totalPrice: parseFloat(listingData.quantity || '0') * parseFloat(listingData.disposalCost || listingData.sourcingCost || '0'),
    frequency: listingData.frequency,
    
    status: 'pending',
    priority: 'medium',
    
    orderDate: getTimestamp(),
    expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    createdAt: getTimestamp(),
    updatedAt: getTimestamp(),
    
    paymentTerms: 'Net 30',
    paymentStatus: 'pending',
    
    ...orderDetails
  }
  
  if (typeof window !== 'undefined') {
    const existing = getOrders()
    const updated = [...existing, order]
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
  }
  
  return order
}

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(ORDERS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading orders:', error)
    return []
  }
}

export const getOrderById = (id: string): Order | undefined => {
  const orders = getOrders()
  return orders.find(order => order.id === id)
}

export const updateOrderStatus = (id: string, status: Order['status']): void => {
  if (typeof window === 'undefined') return
  
  const orders = getOrders()
  const updated = orders.map(order => 
    order.id === id 
      ? { ...order, status, updatedAt: getTimestamp() }
      : order
  )
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
}

export const updateOrderPriority = (id: string, priority: Order['priority']): void => {
  if (typeof window === 'undefined') return
  
  const orders = getOrders()
  const updated = orders.map(order => 
    order.id === id 
      ? { ...order, priority, updatedAt: getTimestamp() }
      : order
  )
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
}

export const updateOrderPaymentStatus = (id: string, paymentStatus: Order['paymentStatus']): void => {
  if (typeof window === 'undefined') return
  
  const orders = getOrders()
  const updated = orders.map(order => 
    order.id === id 
      ? { ...order, paymentStatus, updatedAt: getTimestamp() }
      : order
  )
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
}

export const addOrderNote = (id: string, note: string): void => {
  if (typeof window === 'undefined') return
  
  const orders = getOrders()
  const updated = orders.map(order => 
    order.id === id 
      ? { 
          ...order, 
          notes: order.notes ? `${order.notes}\n${note}` : note,
          updatedAt: getTimestamp() 
        }
      : order
  )
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
}

export const getOrdersByStatus = (status: Order['status']): Order[] => {
  const orders = getOrders()
  return orders.filter(order => order.status === status)
}

export const getOrdersByPriority = (priority: Order['priority']): Order[] => {
  const orders = getOrders()
  return orders.filter(order => order.priority === priority)
}

export const getOrdersByCompany = (companyName: string): Order[] => {
  const orders = getOrders()
  return orders.filter(order => 
    order.companyName.toLowerCase().includes(companyName.toLowerCase()) ||
    order.buyerCompany?.toLowerCase().includes(companyName.toLowerCase()) ||
    order.sellerCompany?.toLowerCase().includes(companyName.toLowerCase())
  )
}

export const getOrdersByDateRange = (startDate: string, endDate: string): Order[] => {
  const orders = getOrders()
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  return orders.filter(order => {
    const orderDate = new Date(order.orderDate)
    return orderDate >= start && orderDate <= end
  })
}

export const getOrderStats = () => {
  const orders = getOrders()
  
  return {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    inProgress: orders.filter(o => o.status === 'in_progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalValue: orders.reduce((sum, order) => sum + order.totalPrice, 0),
    averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.totalPrice, 0) / orders.length : 0
  }
}

export const deleteOrder = (id: string): void => {
  if (typeof window === 'undefined') return
  
  const orders = getOrders()
  const updated = orders.filter(order => order.id !== id)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
}
