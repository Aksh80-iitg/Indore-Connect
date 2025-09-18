"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, Star, Phone, Clock, Users, SlidersHorizontal, IndianRupee } from "lucide-react"
import Link from "next/link"
import PaymentModal from "@/components/payment-modal"

const serviceProviders = [
  {
    id: 1,
    name: "Indore QuickFix Plumbing",
    category: "Technical Support",
    phone: "+91-9876543210",
    email: "info@indorequickfix.com",
    rating: 4.8,
    reviews: 127,
    description: "Professional plumbing services for Indore residents - 24/7 emergency repairs",
    availability: "24/7 Emergency Service",
    price: 800,
    location: "Vijay Nagar, Indore",
    tags: ["plumbing", "emergency", "repair", "water", "pipes"],
  },
  {
    id: 2,
    name: "MP ElectroMax Solutions",
    category: "Technical Support",
    phone: "+91-9876543211",
    email: "contact@mpelectromax.com",
    rating: 4.9,
    reviews: 89,
    description: "Licensed electricians serving Indore with safe and reliable electrical services",
    availability: "Mon-Sat 8AM-6PM",
    price: 600,
    location: "Palasia, Indore",
    tags: ["electrical", "wiring", "repair", "installation", "safety"],
  },
  {
    id: 3,
    name: "Indore Math Academy",
    category: "Tutors & Education",
    phone: "+91-9876543212",
    email: "learn@indoremathacademy.com",
    rating: 4.7,
    reviews: 156,
    description: "Expert math tutoring for CBSE, ICSE, and MP Board students in Indore",
    availability: "Flexible scheduling",
    price: 500,
    location: "AB Road, Indore",
    tags: ["math", "tutor", "education", "cbse", "icse", "mp board"],
  },
  {
    id: 4,
    name: "Fresh Indore Groceries",
    category: "Groceries",
    phone: "+91-9876543213",
    email: "orders@freshindore.com",
    rating: 4.6,
    reviews: 203,
    description: "Fresh groceries with home delivery across Indore - supporting local farmers",
    availability: "Daily 7AM-9PM",
    price: 50,
    location: "Sarafa Bazaar, Indore",
    tags: ["groceries", "fresh", "vegetables", "delivery", "organic"],
  },
  {
    id: 5,
    name: "Indore City Hospital",
    category: "Hospitals",
    phone: "+91-9876543214",
    email: "info@indorecityhospital.com",
    rating: 4.5,
    reviews: 89,
    description: "Multi-specialty hospital in Indore with 24/7 emergency care",
    availability: "24/7 Emergency Care",
    price: 1000,
    location: "MG Road, Indore",
    tags: ["hospital", "emergency", "healthcare", "medical", "specialist"],
  },
  {
    id: 6,
    name: "Test Demo Service",
    category: "Other Services",
    phone: "+91-9876543215",
    email: "demo@testservice.com",
    rating: 5.0,
    reviews: 1,
    description: "Demo service provider for testing payments - ₹1 only for testing purposes",
    availability: "24/7 Available",
    price: 1,
    location: "Test Location, Indore",
    tags: ["demo", "test", "payment", "sample"],
  },
  {
    id: 7,
    name: "Sparkle Clean Services",
    category: "Other Services",
    phone: "+91-9876543216",
    email: "book@sparkleClean.com",
    rating: 4.8,
    reviews: 94,
    description: "Professional residential and commercial cleaning services across Indore",
    availability: "Mon-Fri 8AM-5PM",
    price: 600,
    location: "Scheme 78, Indore",
    tags: ["cleaning", "house", "commercial", "deep clean", "sanitization"],
  },
  {
    id: 8,
    name: "Indore Beauty Salon",
    category: "Other Services",
    phone: "+91-9876543217",
    email: "beauty@indoresalon.com",
    rating: 4.6,
    reviews: 78,
    description: "Full-service beauty salon with experienced stylists and latest treatments",
    availability: "Daily 10AM-8PM",
    price: 800,
    location: "New Palasia, Indore",
    tags: ["beauty", "salon", "hair", "facial", "makeup", "styling"],
  },
]

const categories = [
  "All Categories",
  "Technical Support",
  "Tutors & Education",
  "Groceries",
  "Hospitals",
  "Other Services",
]

const locations = [
  "All Locations",
  "Vijay Nagar",
  "Palasia",
  "AB Road",
  "Sarafa Bazaar",
  "MG Road",
  "Scheme 78",
  "New Palasia",
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<(typeof serviceProviders)[0] | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const filteredProviders = useMemo(() => {
    const filtered = serviceProviders.filter((provider) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesCategory = selectedCategory === "All Categories" || provider.category === selectedCategory

      // Location filter
      const matchesLocation = selectedLocation === "All Locations" || provider.location.includes(selectedLocation)

      // Price range filter
      const matchesPrice = provider.price >= priceRange[0] && provider.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice
    })

    // Sort results
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedLocation, priceRange, sortBy])

  const handleBookNow = (provider: (typeof serviceProviders)[0]) => {
    setSelectedProvider(provider)
    setIsPaymentModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <Link href="/">
                  <h1 className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
                    IndoreConnect
                  </h1>
                </Link>
                <p className="text-xs text-muted-foreground">Search Services</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Services in Indore</h1>
          <p className="text-lg text-muted-foreground">Discover trusted local service providers near you</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Main Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for services, providers, or keywords..."
                className="pl-12 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="lg" onClick={() => setShowFilters(!showFilters)} className="h-12 px-6">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Sort by Rating</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                  <div className="px-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={2000}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {filteredProviders.length} Service{filteredProviders.length !== 1 ? "s" : ""} Found
            </h2>
            {searchQuery && <p className="text-muted-foreground">Results for "{searchQuery}"</p>}
          </div>
        </div>

        {/* Results Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProviders.map((provider) => (
              <Card
                key={provider.id}
                className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{provider.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-sm">
                        <MapPin className="w-4 h-4" />
                        {provider.location}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {provider.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{provider.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span className="font-bold text-lg">{provider.rating}</span>
                      <span className="text-sm text-muted-foreground">({provider.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span className="font-bold text-primary">{provider.price}+</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{provider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{provider.availability}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {provider.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                      size="sm"
                      onClick={() => handleBookNow(provider)}
                    >
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm" className="px-6 bg-transparent">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No services found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search criteria or browse all categories</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Categories")
                setSelectedLocation("All Locations")
                setPriceRange([0, 2000])
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {selectedProvider && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false)
            setSelectedProvider(null)
          }}
          provider={selectedProvider}
        />
      )}
    </div>
  )
}
