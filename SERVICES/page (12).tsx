import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, ChevronLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { categories, serviceProviders } from "@/lib/data"

export default function ServicesPage() {
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
                <Link href="/auth/signup">Join as Provider</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of local services designed to meet all your community needs
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => {
            const categoryProviders = serviceProviders.filter((p) => p.category === category.name)
            const topRated = categoryProviders.sort((a, b) => b.rating - a.rating).slice(0, 3)

            return (
              <Card key={category.name} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {category.count} providers
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <h4 className="font-medium text-sm text-muted-foreground">Top Rated Providers:</h4>
                    {topRated.map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between text-sm">
                        <span className="truncate">{provider.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-secondary">★</span>
                          <span>{provider.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href={`/providers?category=${encodeURIComponent(category.name)}`}>
                      View All Providers
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6">
            Contact us and we'll help you connect with the right service provider
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/signup">Become a Provider</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
