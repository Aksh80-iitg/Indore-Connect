"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IndianRupee, CreditCard, Smartphone, Building2, Shield, Clock, Star, MapPin, Phone } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  provider: {
    id: number
    name: string
    category: string
    phone: string
    email: string
    rating: number
    reviews: number
    description: string
    availability: string
    price: number
    location: string
  }
}

export default function PaymentModal({ isOpen, onClose, provider }: PaymentModalProps) {
  const [selectedService, setSelectedService] = useState("")
  const [serviceDate, setServiceDate] = useState("")
  const [serviceTime, setServiceTime] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const serviceOptions = [
    { value: "basic", label: "Basic Service", price: provider.price },
    { value: "standard", label: "Standard Service", price: provider.price * 1.5 },
    { value: "premium", label: "Premium Service", price: provider.price * 2 },
  ]

  const selectedServicePrice = serviceOptions.find((s) => s.value === selectedService)?.price || provider.price

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to Razorpay payment link
    window.open("https://rzp.io/rzp/16GIUTa", "_blank")

    // Send email notification to admin (simulated)
    console.log("[v0] Sending email notification to admin about new booking:", {
      provider: provider.name,
      service: selectedService,
      amount: selectedServicePrice,
      customer: "Customer Name",
      date: serviceDate,
      time: serviceTime,
    })

    setIsProcessing(false)
    onClose()

    // Show success message
    alert(`Booking confirmed! You will be redirected to secure payment. Admin has been notified via email.`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book Service & Pay</DialogTitle>
          <DialogDescription>
            Complete your booking with {provider.name} and proceed to secure payment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Provider Info */}
          <Card className="border-0 bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {provider.location}
                  </p>
                </div>
                <Badge variant="secondary">{provider.category}</Badge>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <IndianRupee className="w-4 h-4" />
                  <span className="font-bold">Starting from ₹{provider.price}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  <span>{provider.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span>{provider.availability}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Selection */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="service" className="text-sm font-medium">
                Select Service Package
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose service package" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        <span className="ml-4 font-medium text-primary">₹{option.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-sm font-medium">
                  Preferred Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-sm font-medium">
                  Preferred Time
                </Label>
                <Select value={serviceTime} onValueChange={setServiceTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="requests" className="text-sm font-medium">
                Special Requests (Optional)
              </Label>
              <Textarea
                id="requests"
                placeholder="Any specific requirements or instructions..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Payment Method</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Card
                className={`cursor-pointer transition-all ${paymentMethod === "upi" ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"}`}
                onClick={() => setPaymentMethod("upi")}
              >
                <CardContent className="p-4 text-center">
                  <Smartphone className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-medium text-sm">UPI Payment</p>
                  <p className="text-xs text-muted-foreground">PhonePe, GPay, Paytm</p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${paymentMethod === "card" ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"}`}
                onClick={() => setPaymentMethod("card")}
              >
                <CardContent className="p-4 text-center">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-medium text-sm">Card Payment</p>
                  <p className="text-xs text-muted-foreground">Debit/Credit Cards</p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${paymentMethod === "netbanking" ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"}`}
                onClick={() => setPaymentMethod("netbanking")}
              >
                <CardContent className="p-4 text-center">
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-medium text-sm">Net Banking</p>
                  <p className="text-xs text-muted-foreground">All Major Banks</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Price Summary */}
          {selectedService && (
            <Card className="border-0 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Service Package:</span>
                  <span>{serviceOptions.find((s) => s.value === selectedService)?.label}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Date & Time:</span>
                  <span>
                    {serviceDate} at {serviceTime}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary flex items-center gap-1">
                      <IndianRupee className="w-5 h-5" />
                      {selectedServicePrice}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Notice */}
          <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
            <Shield className="w-5 h-5 text-primary" />
            <div className="text-sm">
              <p className="font-medium">Secure Payment</p>
              <p className="text-muted-foreground">
                Your payment is processed securely through Razorpay. Admin will be notified via email.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={!selectedService || !serviceDate || !serviceTime || !paymentMethod || isProcessing}
              className="flex-1 bg-gradient-to-r from-primary to-secondary"
            >
              {isProcessing ? "Processing..." : `Pay ₹${selectedServicePrice} & Book`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
