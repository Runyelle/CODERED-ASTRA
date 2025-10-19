"use client"

import { useState } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
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
                onClick={() => setActiveTab("submissions")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === "submissions" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                My Submissions
              </button>
              <button
                onClick={() => setActiveTab("matches")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === "matches" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Matches
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <Button asChild>
              <Link href="/onboarding">
                <Plus className="h-4 w-4 mr-2" />
                New Submission
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Acme Corp</h1>
              <p className="text-muted-foreground">Here's what's happening with your waste management today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="glass-card border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">$45,231</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-primary">+20.1%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Waste Processed</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350 tons</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-primary">+12.5%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CO₂ Reduced</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234 tons</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-primary">+8.2%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Matches</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <span className="text-primary">3 new</span> this week
                  </p>
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
                  {[
                    { id: "WS-001", type: "Plastic Waste", amount: "500 tons", status: "matched", date: "2 hours ago" },
                    { id: "WS-002", type: "Metal Scrap", amount: "250 tons", status: "pending", date: "1 day ago" },
                    { id: "WS-003", type: "Paper Waste", amount: "180 tons", status: "matched", date: "3 days ago" },
                  ].map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{submission.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {submission.id} • {submission.amount}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={submission.status === "matched" ? "default" : "secondary"} className="text-xs">
                          {submission.status === "matched" ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 mr-1" /> Matched
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" /> Pending
                            </>
                          )}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{submission.date}</span>
                      </div>
                    </div>
                  ))}
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

        {activeTab === "submissions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">My Submissions</h1>
                <p className="text-muted-foreground">Manage all your waste submissions</p>
              </div>
              <Button asChild>
                <Link href="/onboarding">
                  <Plus className="h-4 w-4 mr-2" />
                  New Submission
                </Link>
              </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search submissions..." className="pl-9" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Submissions Table */}
            <Card className="glass-card border-border/40">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border/40">
                      <tr className="text-left">
                        <th className="p-4 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="p-4 text-sm font-medium text-muted-foreground">Waste Type</th>
                        <th className="p-4 text-sm font-medium text-muted-foreground">Quantity</th>
                        <th className="p-4 text-sm font-medium text-muted-foreground">Location</th>
                        <th className="p-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="p-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="p-4 text-sm font-medium text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: "WS-001",
                          type: "Plastic Waste (HDPE)",
                          quantity: "500 tons",
                          location: "Houston, TX",
                          status: "matched",
                          date: "Jan 15, 2025",
                        },
                        {
                          id: "WS-002",
                          type: "Metal Scrap (Aluminum)",
                          quantity: "250 tons",
                          location: "Houston, TX",
                          status: "pending",
                          date: "Jan 14, 2025",
                        },
                        {
                          id: "WS-003",
                          type: "Paper Waste",
                          quantity: "180 tons",
                          location: "Dallas, TX",
                          status: "matched",
                          date: "Jan 12, 2025",
                        },
                        {
                          id: "WS-004",
                          type: "Electronic Waste",
                          quantity: "75 tons",
                          location: "Austin, TX",
                          status: "reviewing",
                          date: "Jan 10, 2025",
                        },
                        {
                          id: "WS-005",
                          type: "Organic Waste",
                          quantity: "320 tons",
                          location: "Houston, TX",
                          status: "matched",
                          date: "Jan 8, 2025",
                        },
                      ].map((submission) => (
                        <tr
                          key={submission.id}
                          className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                        >
                          <td className="p-4 text-sm font-medium">{submission.id}</td>
                          <td className="p-4 text-sm">{submission.type}</td>
                          <td className="p-4 text-sm">{submission.quantity}</td>
                          <td className="p-4 text-sm text-muted-foreground">{submission.location}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                submission.status === "matched"
                                  ? "default"
                                  : submission.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {submission.status === "matched" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                              {submission.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                              {submission.status === "reviewing" && <AlertCircle className="h-3 w-3 mr-1" />}
                              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{submission.date}</td>
                          <td className="p-4">
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "matches" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Company Matches</h1>
              <p className="text-muted-foreground">Companies interested in purchasing your waste</p>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search companies..." className="pl-9" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Matches Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "EcoPlastics Inc.",
                  match: 95,
                  type: "Plastic Recycling",
                  location: "Houston, TX",
                  interested: "HDPE Plastic",
                  price: "$450/ton",
                },
                {
                  name: "GreenMetal Co.",
                  match: 88,
                  type: "Metal Processing",
                  location: "Dallas, TX",
                  interested: "Aluminum Scrap",
                  price: "$380/ton",
                },
                {
                  name: "RecyclePro",
                  match: 82,
                  type: "Mixed Materials",
                  location: "Austin, TX",
                  interested: "Paper Waste",
                  price: "$120/ton",
                },
                {
                  name: "CleanTech Solutions",
                  match: 79,
                  type: "E-Waste Processing",
                  location: "Houston, TX",
                  interested: "Electronic Waste",
                  price: "$280/ton",
                },
                {
                  name: "BioCompost Inc.",
                  match: 76,
                  type: "Organic Processing",
                  location: "San Antonio, TX",
                  interested: "Organic Waste",
                  price: "$95/ton",
                },
                {
                  name: "Industrial Recyclers",
                  match: 73,
                  type: "Industrial Waste",
                  location: "Houston, TX",
                  interested: "Mixed Industrial",
                  price: "$210/ton",
                },
              ].map((company) => (
                <Card
                  key={company.name}
                  className="glass-card border-border/40 hover:border-primary/40 transition-all cursor-pointer group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="default" className="bg-primary/20 text-primary border-primary/30">
                        {company.match}% Match
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{company.name}</CardTitle>
                    <CardDescription>{company.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>Interested in: {company.interested}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>Offering: {company.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{company.location}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-transparent" variant="outline">
                      View Details
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
