"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText,
  Building2,
  Calendar
} from "lucide-react"
import { getSellerListings, getBuyerListings } from "@/lib/data-storage"
import type { SellerListing, BuyerListing } from "@/lib/data-storage"

interface Notification {
  id: string
  type: 'agreement_accepted' | 'agreement_declined' | 'new_listing' | 'status_change'
  title: string
  message: string
  timestamp: string
  listingId: string
  listingType: 'seller' | 'buyer'
  read: boolean
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Load notifications from localStorage
    const stored = localStorage.getItem('notifications')
    if (stored) {
      const parsed = JSON.parse(stored)
      setNotifications(parsed)
      setUnreadCount(parsed.filter((n: Notification) => !n.read).length)
    }
  }, [])

  const markAsRead = (notificationId: string) => {
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    )
    setNotifications(updated)
    setUnreadCount(updated.filter(n => !n.read).length)
    localStorage.setItem('notifications', JSON.stringify(updated))
  }

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updated)
    setUnreadCount(0)
    localStorage.setItem('notifications', JSON.stringify(updated))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'agreement_accepted':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'agreement_declined':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'new_listing':
        return <FileText className="h-4 w-4 text-blue-500" />
      case 'status_change':
        return <Clock className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'agreement_accepted':
        return <Badge variant="default" className="bg-green-500">Accepted</Badge>
      case 'agreement_declined':
        return <Badge variant="destructive">Declined</Badge>
      case 'new_listing':
        return <Badge variant="secondary">New</Badge>
      case 'status_change':
        return <Badge variant="outline">Updated</Badge>
      default:
        return <Badge variant="outline">Info</Badge>
    }
  }

  if (notifications.length === 0) {
    return (
      <Card className="glass-card border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Stay updated on your waste management activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications yet</p>
            <p className="text-sm text-muted-foreground">You'll receive updates about agreements and listings here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card border-border/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <CardDescription>Recent activity and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 10)
          .map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                notification.read 
                  ? 'bg-muted/20' 
                  : 'bg-primary/5 border border-primary/20'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </span>
                      {getNotificationBadge(notification.type)}
                    </div>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs"
                    >
                      Mark read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}

// Helper function to create notifications
export function createNotification(
  type: Notification['type'],
  title: string,
  message: string,
  listingId: string,
  listingType: 'seller' | 'buyer'
): Notification {
  return {
    id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    title,
    message,
    timestamp: new Date().toISOString(),
    listingId,
    listingType,
    read: false
  }
}

// Helper function to add notification to storage
export function addNotification(notification: Notification) {
  const stored = localStorage.getItem('notifications')
  const notifications = stored ? JSON.parse(stored) : []
  notifications.unshift(notification)
  
  // Keep only last 50 notifications
  const limited = notifications.slice(0, 50)
  localStorage.setItem('notifications', JSON.stringify(limited))
}
