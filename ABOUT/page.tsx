import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Award, IndianRupee, MapPin, Clock, Phone, Mail, Heart, Target, Eye } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Service Providers", value: "100+", icon: Users },
  { label: "Happy Customers", value: "1,200+", icon: Heart },
  { label: "Services Completed", value: "5,000+", icon: Award },
  { label: "Areas Covered", value: "25+", icon: MapPin },
]

const team = [
  {
    name: "Admin AK",
    role: "Platform Administrator",
    description: "Ensuring quality service providers and customer satisfaction across Indore",
    image: "/professional-admin-portrait.png",
  },
  {
    name: "Rajesh Kumar",
    role: "Community Manager",
    description: "Building relationships with local service providers and customers",
    image: "/community-manager-portrait.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Quality Assurance",
    description: "Verifying service providers and maintaining platform standards",
    image: "/quality-assurance-manager-portrait.jpg",
  },
]

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "Every service provider is thoroughly verified before joining our platform. We prioritize your safety and peace of mind.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "We're built by locals, for locals. Understanding Indore's unique needs and cultural values is at our core.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "We maintain high standards through continuous monitoring, customer feedback, and provider training programs.",
  },
  {
    icon: IndianRupee,
    title: "Fair Pricing",
    description:
      "Transparent pricing with no hidden fees. Supporting both customers and service providers with fair rates.",
  },
]

export default function AboutPage() {
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
                <p className="text-xs text-muted-foreground">About Us</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Search
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
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            🏛️ Proudly Serving Indore Since 2024
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Connecting Communities,
            <span className="text-primary block">Building Trust</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
            IndoreConnect is more than just a platform - we're your neighbors, committed to strengthening our local
            community by connecting residents with trusted service providers across Madhya Pradesh.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary">
              <Link href="/search">Find Services</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/signup">Join as Provider</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground">How IndoreConnect came to life</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img src="/indore-city-skyline-with-local-markets-and-traditi.jpg" alt="Indore cityscape" className="rounded-2xl shadow-xl w-full" />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Born from Local Needs</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Living in Indore, we experienced firsthand the challenges of finding reliable service providers.
                  Whether it was a plumber during monsoon season or a tutor for board exams, the search was always
                  time-consuming and uncertain.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  In 2024, we decided to solve this problem for our community. IndoreConnect was born with a simple
                  mission: connect neighbors with trusted local professionals who understand our city's unique needs.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we're proud to serve over 25 areas across Indore, from Vijay Nagar to Palasia, helping
                  thousands of residents find quality services with just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Foundation</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To simplify the way Indore residents connect with trusted local service providers, fostering a stronger,
                more connected community.
              </p>
            </Card>

            <Card className="border-0 shadow-lg text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become Madhya Pradesh's most trusted platform for local services, expanding to serve communities
                across the state.
              </p>
            </Card>

            <Card className="border-0 shadow-lg text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Values</h3>
              <p className="text-muted-foreground leading-relaxed">
                Trust, community, quality, and transparency form the cornerstone of every interaction on our platform.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">The people behind IndoreConnect</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg text-center overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How IndoreConnect Works</h2>
            <p className="text-lg text-muted-foreground">Simple steps to get the services you need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Search Services</h3>
              <p className="text-muted-foreground">
                Browse categories or search for specific services you need in your area of Indore.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Choose Provider</h3>
              <p className="text-muted-foreground">
                Compare ratings, reviews, and prices to select the best service provider for your needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Book & Pay</h3>
              <p className="text-muted-foreground">
                Schedule your service and pay securely through UPI, cards, or net banking.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Get Service</h3>
              <p className="text-muted-foreground">
                Enjoy quality service from verified professionals and leave a review to help others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground">We'd love to hear from you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p className="text-muted-foreground">Indore, Madhya Pradesh, India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p className="text-muted-foreground">+91-9876543200</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-muted-foreground">hello@indoreconnect.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Support Hours</p>
                      <p className="text-muted-foreground">Mon-Sat: 9AM-7PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>Have questions or suggestions? We're here to help!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Name</label>
                      <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <input
                        type="email"
                        className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Subject</label>
                    <input
                      type="text"
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <textarea
                      rows={4}
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary">Send Message</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust IndoreConnect for their service needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary">
              <Link href="/search">Find Services Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/signup">Become a Provider</Link>
            </Button>
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
    </div>
  )
}
