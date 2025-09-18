"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Phone, Clock, Users, Shield, Award, IndianRupee } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  },
]

const categories = [
  { name: "Technical Support", count: 15, icon: "🔧", description: "Plumbers, Electricians, AC Repair" },
  { name: "Tutors & Education", count: 15, icon: "📚", description: "Home Tutors, Coaching Classes" },
  { name: "Groceries", count: 15, icon: "🛒", description: "Fresh Vegetables, Daily Needs" },
  { name: "Hospitals", count: 15, icon: "🏥", description: "Healthcare, Emergency Services" },
  { name: "Other Services", count: 40, icon: "⚡", description: "Cleaning, Beauty, Transport" },
]

export default function HomePage() {
  const [selectedProvider, setSelectedProvider] = useState<(typeof serviceProviders)[0] | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleBookNow = (provider: (typeof serviceProviders)[0]) => {
    setSelectedProvider(provider)
    setIsPaymentModalOpen(true)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push("/search")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
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
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">IndoreConnect</h1>
                <p className="text-xs text-muted-foreground">Madhya Pradesh's Local Services</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Services
              </Link>
              <Link
                href="/providers"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Providers
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link href="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Admin
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="bg-gradient-to-r from-primary to-secondary">
                <Link href="/auth/signup">Join as Provider</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-card to-muted/30">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              🏛️ Serving Indore, Madhya Pradesh
            </Badge>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Your Trusted Local Services
            <span className="text-primary block">in Indore</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
            Connect with verified service providers across Indore. From Vijay Nagar to Palasia, find reliable
            professionals for all your needs with secure payments and guaranteed quality.
          </p>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex gap-3 p-2 bg-white rounded-2xl shadow-xl border border-border">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search services in Indore (plumber, tutor, cleaner...)"
                  className="pl-12 h-14 border-0 text-lg bg-transparent focus-visible:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                onClick={handleSearch}
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-medium">Verified Providers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <Star className="w-5 h-5 text-secondary" />
              <span className="font-medium">Rated & Reviewed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <Award className="w-5 h-5 text-primary" />
              <span className="font-medium">Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <IndianRupee className="w-5 h-5 text-secondary" />
              <span className="font-medium">Secure Payments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">Popular Services in Indore</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our most requested services across different areas of Indore
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg hover:-translate-y-1"
                onClick={() => router.push(`/search?category=${encodeURIComponent(category.name)}`)}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors text-lg">
                    {category.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {category.count} providers
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Service Providers */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h3 className="text-4xl font-bold text-foreground mb-2">Top Rated Providers</h3>
              <p className="text-lg text-muted-foreground">Trusted professionals serving Indore</p>
            </div>
            <Button variant="outline" size="lg" className="hidden md:flex bg-transparent" asChild>
              <Link href="/search">View All Providers</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceProviders.map((provider) => (
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
        </div>
      </section>

      {/* Why Choose IndoreConnect? */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">Why Choose IndoreConnect?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for Indore residents with local understanding and trust
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-4">Local Expertise</h4>
              <p className="text-muted-foreground">
                Providers who understand Indore's unique needs, from monsoon repairs to festival preparations
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <IndianRupee className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-4">Transparent Pricing</h4>
              <p className="text-muted-foreground">
                Clear pricing starting from ₹500, with secure UPI, card, and net banking payments
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-4">Verified & Trusted</h4>
              <p className="text-muted-foreground">
                All providers are verified by our admin team before joining the platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-foreground text-lg">IndoreConnect</span>
                  <p className="text-xs text-muted-foreground">Madhya Pradesh</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connecting Indore communities with trusted local service providers since 2024.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">For Users</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/search" className="hover:text-primary transition-colors">
                    Find Services
                  </Link>
                </li>
                <li>
                  <Link href="/bookings" className="hover:text-primary transition-colors">
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-primary transition-colors">
                    Write Reviews
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">For Providers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/join" className="hover:text-primary transition-colors">
                    Join Platform
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-primary transition-colors">
                    Provider Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-primary transition-colors">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 IndoreConnect. Proudly serving Indore, Madhya Pradesh. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
