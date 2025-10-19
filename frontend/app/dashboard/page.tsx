"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Package,
  Building2,
  TrendingUp,
  Bell,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ArrowUpRight,
  Leaf,
  DollarSign,
  Recycle,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShoppingCart,
  Upload,
  MapPin,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  getSellerListings, 
  getBuyerListings, 
  searchListings, 
  getUniqueMaterials, 
  getUniqueLocations,
  updateSellerListingStatus,
  updateBuyerListingStatus,
  testApiConnection,
  type Listing,
  type SellerListing,
  type BuyerListing
} from "@/lib/data-storage"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sellerListings, setSellerListings] = useState<SellerListing[]>([])
  const [buyerListings, setBuyerListings] = useState<BuyerListing[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMaterial, setSelectedMaterial] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedListingType, setSelectedListingType] = useState<"all" | "seller" | "buyer">("all")
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [availableMaterials, setAvailableMaterials] = useState<string[]>([])
  const [availableLocations, setAvailableLocations] = useState<string[]>([])
  const [apiConnected, setApiConnected] = useState<boolean | null>(null)

  // Load data on component mount
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    const sellers = getSellerListings()
    const buyers = getBuyerListings()
    setSellerListings(sellers)
    setBuyerListings(buyers)
    
    // Test API connection and initialize search
    const initializeSearch = async () => {
      try {
        // Test API connection first
        const connected = await testApiConnection()
        setApiConnected(connected)
        
        if (connected) {
          const results = await searchListings("", undefined, undefined, undefined)
          setFilteredListings(results)
          
          // Load materials and locations for dropdowns
          const materials = await getUniqueMaterials()
          const locations = await getUniqueLocations()
          setAvailableMaterials(materials)
          setAvailableLocations(locations)
        } else {
          console.error('Backend API is not accessible. Please ensure the backend server is running on http://localhost:8001')
        }
      } catch (error) {
        console.error('Error initializing search:', error)
        setApiConnected(false)
      }
    }
    initializeSearch()
  }, [])

  // Update filtered listings when search criteria change
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    const performSearch = async () => {
      try {
        const results = await searchListings(
          searchQuery,
          selectedMaterial === "all" ? undefined : selectedMaterial,
          selectedLocation === "all" ? undefined : selectedLocation,
          selectedListingType === "all" ? undefined : selectedListingType
        )
        setFilteredListings(results)
      } catch (error) {
        console.error('Error performing search:', error)
        setFilteredListings([])
      }
    }
    
    performSearch()
  }, [searchQuery, selectedMaterial, selectedLocation, selectedListingType])

  const handleStatusUpdate = (id: string, type: 'seller' | 'buyer', status: 'pending' | 'accepted' | 'declined') => {
    if (type === 'seller') {
      updateSellerListingStatus(id, status)
      const updatedSellers = getSellerListings()
      setSellerListings(updatedSellers)
    } else {
      updateBuyerListingStatus(id, status)
      const updatedBuyers = getBuyerListings()
      setBuyerListings(updatedBuyers)
    }
  }

  const refreshData = async () => {
    try {
      const sellers = getSellerListings()
      const buyers = getBuyerListings()
      setSellerListings(sellers)
      setBuyerListings(buyers)
      
      // Refresh search results and dropdown data
      const results = await searchListings(
        searchQuery,
        selectedMaterial === "all" ? undefined : selectedMaterial,
        selectedLocation === "all" ? undefined : selectedLocation,
        selectedListingType === "all" ? undefined : selectedListingType
      )
      setFilteredListings(results)
      
      const materials = await getUniqueMaterials()
      const locations = await getUniqueLocations()
      setAvailableMaterials(materials)
      setAvailableLocations(locations)
    } catch (error) {
      console.error('Error refreshing data:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle2 className="h-3 w-3 mr-1" />Accepted</Badge>
      case 'declined':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Declined</Badge>
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Recycle className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">WasteFlow</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === "overview" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("seller-listings")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === "seller-listings" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Seller Listings
              </button>
              <button
                onClick={() => setActiveTab("buyer-listings")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === "buyer-listings" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Buyer Listings
              </button>
              <button
                onClick={() => setActiveTab("search")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === "search" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Search
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link href="/onboarding/sell">
                  <Plus className="h-4 w-4 mr-2" />
                  Sell Materials
                </Link>
            </Button>
            <Button asChild>
                <Link href="/onboarding/buy">
                <Plus className="h-4 w-4 mr-2" />
                  Buy Materials
              </Link>
            </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Acme Corp</h1>
              <p className="text-muted-foreground">Here's what's happening with your waste management today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="glass-card border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sellerListings.length + buyerListings.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {sellerListings.length} seller, {buyerListings.length} buyer
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Waste Processed</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0 tons</div>
                  <p className="text-xs text-muted-foreground">No waste processed yet</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CO₂ Reduced</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0 tons</div>
                  <p className="text-xs text-muted-foreground">No CO₂ reduced yet</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Matches</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">No active matches yet</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="glass-card border-border/40">
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>Your latest waste submissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    // Combine and sort all listings by creation date
                    const allListings = [
                      ...sellerListings.map(listing => ({
                        ...listing,
                        listingType: 'seller' as const,
                        displayType: listing.wasteType,
                        displayAmount: `${listing.quantity} ${listing.unit}`
                      })),
                      ...buyerListings.map(listing => ({
                        ...listing,
                        listingType: 'buyer' as const,
                        displayType: listing.materialType,
                        displayAmount: `${listing.quantity} ${listing.unit}`
                      }))
                    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3)

                    if (allListings.length === 0) {
                      return (
                        <div className="text-center py-8">
                          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No submissions yet</p>
                          <p className="text-sm text-muted-foreground">Create your first listing to get started</p>
                        </div>
                      )
                    }

                    return allListings.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            {listing.listingType === 'seller' ? (
                              <Upload className="h-5 w-5 text-primary" />
                            ) : (
                              <ShoppingCart className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{listing.displayType}</p>
                            <p className="text-xs text-muted-foreground">
                              {listing.listingType === 'seller' ? 'Sell' : 'Buy'} • {listing.displayAmount}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(listing.status)}
                          <span className="text-xs text-muted-foreground">
                            {new Date(listing.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  })()}
                </CardContent>
              </Card>

              <Card className="glass-card border-border/40">
                <CardHeader>
                  <CardTitle>Top Matches</CardTitle>
                  <CardDescription>Companies interested in your waste</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "EcoPlastics Inc.", match: 95, type: "Plastic Recycling", location: "Houston, TX" },
                    { name: "GreenMetal Co.", match: 88, type: "Metal Processing", location: "Dallas, TX" },
                    { name: "RecyclePro", match: 82, type: "Mixed Materials", location: "Austin, TX" },
                  ].map((company) => (
                    <div
                      key={company.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm group-hover:text-primary transition-colors">
                            {company.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {company.type} • {company.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">{company.match}%</p>
                          <p className="text-xs text-muted-foreground">Match</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "seller-listings" && (
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Seller Listings</h1>
                <p className="text-muted-foreground">Manage your waste material listings</p>
              </div>
              <Button asChild>
                <Link href="/onboarding/sell">
                  <Plus className="h-4 w-4 mr-2" />
                  New Seller Listing
                </Link>
              </Button>
            </div>

            {/* Seller Listings */}
            <div className="grid gap-4">
              {sellerListings.length === 0 ? (
                <Card className="glass-card border-border/40">
                  <CardContent className="p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Seller Listings</h3>
                    <p className="text-muted-foreground mb-4">Start by creating your first waste material listing</p>
                    <Button asChild>
                      <Link href="/onboarding/sell">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Listing
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                sellerListings.map((listing) => (
                  <Card key={listing.id} className="glass-card border-border/40">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{listing.companyName}</CardTitle>
                          <CardDescription>{listing.wasteType} • {listing.quantity} {listing.unit}</CardDescription>
              </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(listing.status)}
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span>{listing.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>${listing.disposalCost}/ton disposal cost</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusUpdate(listing.id, 'seller', 'accepted')}
                          disabled={listing.status === 'accepted'}
                        >
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusUpdate(listing.id, 'seller', 'declined')}
                          disabled={listing.status === 'declined'}
                        >
                          Decline
                            </Button>
                </div>
              </CardContent>
            </Card>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "buyer-listings" && (
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold mb-2">Buyer Listings</h1>
                <p className="text-muted-foreground">Manage your material purchase requests</p>
              </div>
              <Button asChild>
                <Link href="/onboarding/buy">
                  <Plus className="h-4 w-4 mr-2" />
                  New Buyer Listing
                </Link>
              </Button>
            </div>

            {/* Buyer Listings */}
            <div className="grid gap-4">
              {buyerListings.length === 0 ? (
                <Card className="glass-card border-border/40">
                  <CardContent className="p-8 text-center">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Buyer Listings</h3>
                    <p className="text-muted-foreground mb-4">Start by creating your first material purchase request</p>
                    <Button asChild>
                      <Link href="/onboarding/buy">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Listing
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                buyerListings.map((listing) => (
                  <Card key={listing.id} className="glass-card border-border/40">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{listing.companyName}</CardTitle>
                          <CardDescription>{listing.materialType} • {listing.quantity} {listing.unit}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(listing.status)}
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span>{listing.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>${listing.sourcingCost}/ton current cost</span>
                    </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusUpdate(listing.id, 'buyer', 'accepted')}
                          disabled={listing.status === 'accepted'}
                        >
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusUpdate(listing.id, 'buyer', 'declined')}
                          disabled={listing.status === 'declined'}
                        >
                          Decline
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "search" && (
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Search Listings</h1>
                <p className="text-muted-foreground">Find materials and companies across all listings</p>
                {apiConnected === false && (
                  <p className="text-sm text-red-500 mt-1">
                    ⚠️ Backend API not accessible. Please ensure the backend server is running on http://localhost:8001
                  </p>
                )}
              </div>
              <Button variant="outline" onClick={refreshData}>
                <Search className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>

            {/* Search Filters */}
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle>Search & Filter</CardTitle>
                <CardDescription>Use the filters below to find specific materials and locations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search Query</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search companies, materials..." 
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Material Type</label>
                    <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                      <SelectTrigger>
                        <SelectValue placeholder="All materials" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All materials</SelectItem>
                        {availableMaterials.map((material) => (
                          <SelectItem key={material} value={material}>
                            {material}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        {availableLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Listing Type</label>
                    <Select value={selectedListingType} onValueChange={(value: "all" | "seller" | "buyer") => setSelectedListingType(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="seller">Seller Listings</SelectItem>
                        <SelectItem value="buyer">Buyer Listings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedMaterial("all")
                      setSelectedLocation("all")
                      setSelectedListingType("all")
                    }}
                  >
                    Clear Filters
                    </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Search Results ({filteredListings.length})
                </h2>
              </div>

              {filteredListings.length === 0 ? (
                <Card className="glass-card border-border/40">
                  <CardContent className="p-8 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {sellerListings.length === 0 && buyerListings.length === 0 
                        ? "No Listings Available" 
                        : "No Results Found"
                      }
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {sellerListings.length === 0 && buyerListings.length === 0 
                        ? "Create your first listing to get started" 
                        : "Try adjusting your search criteria"
                      }
                    </p>
                    {sellerListings.length === 0 && buyerListings.length === 0 && (
                      <div className="flex gap-2 justify-center">
                        <Button asChild>
                          <Link href="/onboarding/sell">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Seller Listing
                          </Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href="/onboarding/buy">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Buyer Listing
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="glass-card border-border/40">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{listing.companyName}</CardTitle>
                            <CardDescription>
                              {listing.type === 'seller' ? listing.wasteType : listing.materialType} • 
                              {listing.quantity} {listing.unit}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={listing.type === 'seller' ? 'default' : 'secondary'}>
                              {listing.type === 'seller' ? (
                                <>
                                  <Upload className="h-3 w-3 mr-1" />
                                  Seller
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="h-3 w-3 mr-1" />
                                  Buyer
                                </>
                              )}
                            </Badge>
                            {getStatusBadge(listing.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span>{listing.frequency}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {listing.type === 'seller' 
                                ? `$${listing.disposalCost}/ton disposal cost`
                                : `$${listing.sourcingCost}/ton current cost`
                              }
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Contact Company
                          </Button>
                          <Button size="sm" variant="outline">
                            Request Quote
                          </Button>
                        </div>
                  </CardContent>
                </Card>
              ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
