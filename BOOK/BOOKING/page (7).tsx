"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Mock booking data
const bookings = [
  {
    id: 1,
    providerId: 62,
    providerName: "QuickFix Plumbers",
    providerCategory: "Other Services",
    providerPhone: "+91-9511223344",
    providerEmail: "quickfix@plumbing.com",
    providerRating: 4.8,
    date: "2024-01-15",
    time: "10:00 AM",
    serviceType: "Emergency Service",
    description: "Kitchen sink is completely blocked and overflowing",
    status: "confirmed",
    address: "123 Main Street, Apartment 4B",
    notes: "Please bring drain cleaning equipment",
  },
  {
    id: 2,
    providerId: 46,
    providerName: "BrightFuture Tutors",
    providerCategory: "Tutors & Education",
    providerPhone: "+91-9300112233",
    providerEmail: "contact@brightfuture.com",
    providerRating: 4.9,
    date: "2024-01-18",
    time: "4:00 PM",
    serviceType: "Regular Service",
    description: "Math tutoring for grade 10 student",
    status: "pending",
    address: "456 Oak Avenue, House 12",
    notes: "Student needs help with algebra and geometry",
  },
  {
    id: 3,
    providerId: 61,
    providerName: "CleanPro Cleaning Services",
    providerCategory: "Other Services",
    providerPhone: "+91-9500112233",
    providerEmail: "cleanpro@service.com",
    providerRating: 4.7,
    date: "2024-01-12",
    time: "2:00 PM",
    serviceType: "Regular Service",
    description: "Deep cleaning for 3-bedroom apartment",
    status: "completed",
    address: "789 Pine Street, Unit 8A",
    notes: "Focus on kitchen and bathrooms",
  },
  {
    id: 4,
    providerId: 31,
    providerName: "TechFix IT Solutions",
    providerCategory: "Technical Support",
    providerPhone: "+91-9100112233",
    providerEmail: "support@techfix.com",
    providerRating: 4.6,
    date: "2024-01-10",
    time: "11:00 AM",
    serviceType: "Repair",
    description: "Laptop screen replacement",
    status: "cancelled",
    address: "321 Elm Street, Office 5",
    notes: "Cancelled due to scheduling conflict",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "pending":
      return <AlertCircle className="w-4 h-4 text-yellow-600" />
    case "completed":
      return <CheckCircle className="w-4 h-4 text-blue-600" />
    case "cancelled":
      return <XCircle className="w-4 h-4 text-red-600" />
    default:
      return <AlertCircle className="w-4 h-4 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">LocalConnect</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/providers">Book Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage and track your service appointments</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({bookings.filter((b) => b.status === "pending").length})</TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmed ({bookings.filter((b) => b.status === "confirmed").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({bookings.filter((b) => b.status === "completed").length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({bookings.filter((b) => b.status === "cancelled").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "all" ? "You haven't made any bookings yet" : `No ${activeTab} bookings at the moment`}
                </p>
                <Button asChild>
                  <Link href="/providers">Book a Service</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{booking.providerName}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {booking.providerCategory}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(booking.status)}
                          <Badge className={getStatusColor(booking.status)} variant="secondary">
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Service Details */}
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Service Details</h4>
                          <p className="text-sm text-muted-foreground mb-2">{booking.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {booking.serviceType}
                          </Badge>
                        </div>

                        {/* Date and Time */}
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span>{booking.time}</span>
                          </div>
                        </div>

                        {/* Provider Contact */}
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span>{booking.providerPhone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="truncate">{booking.providerEmail}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-secondary text-secondary" />
                            <span>{booking.providerRating}</span>
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <h5 className="font-medium text-foreground text-sm mb-1">Service Address</h5>
                          <p className="text-sm text-muted-foreground">{booking.address}</p>
                        </div>

                        {/* Notes */}
                        {booking.notes && (
                          <div>
                            <h5 className="font-medium text-foreground text-sm mb-1">Notes</h5>
                            <p className="text-sm text-muted-foreground">{booking.notes}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          {booking.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline">
                                Modify
                              </Button>
                              <Button size="sm" variant="destructive">
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <>
                              <Button size="sm" variant="outline">
                                Contact Provider
                              </Button>
                              <Button size="sm" variant="outline">
                                Reschedule
                              </Button>
                            </>
                          )}
                          {booking.status === "completed" && (
                            <Button size="sm" variant="outline">
                              Leave Review
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
