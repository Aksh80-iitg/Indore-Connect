"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Users, ChevronLeft, Bell, CheckCircle, Calendar, MessageCircle, Star, Settings, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    message: "Your appointment with QuickFix Plumbers has been confirmed for tomorrow at 10:00 AM",
    timestamp: "2 minutes ago",
    read: false,
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    message: "BrightFuture Tutors sent you a message about tomorrow's session",
    timestamp: "1 hour ago",
    read: false,
    icon: MessageCircle,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "reminder",
    title: "Appointment Reminder",
    message: "You have a cleaning service appointment in 2 hours with CleanPro Services",
    timestamp: "2 hours ago",
    read: true,
    icon: Calendar,
    color: "text-yellow-600",
  },
  {
    id: 4,
    type: "review",
    title: "Review Request",
    message: "Please rate your experience with TechFix IT Solutions",
    timestamp: "1 day ago",
    read: true,
    icon: Star,
    color: "text-purple-600",
  },
  {
    id: 5,
    type: "system",
    title: "Profile Updated",
    message: "Your profile information has been successfully updated",
    timestamp: "2 days ago",
    read: true,
    icon: Settings,
    color: "text-gray-600",
  },
]

const notificationSettings = {
  bookingConfirmations: true,
  appointmentReminders: true,
  newMessages: true,
  reviewRequests: false,
  promotionalOffers: false,
  systemUpdates: true,
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [settings, setSettings] = useState(notificationSettings)

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const markAsRead = (id: number) => {
    // In a real app, this would update the server
    console.log("Marking notification as read:", id)
  }

  const markAllAsRead = () => {
    // In a real app, this would update the server
    console.log("Marking all notifications as read")
  }

  const deleteNotification = (id: number) => {
    // In a real app, this would delete from server
    console.log("Deleting notification:", id)
  }

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    // In a real app, this would update the server
    console.log("Updating notification setting:", key, value)
  }

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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Bell className="w-8 h-8" />
                Notifications
                {unreadCount > 0 && <Badge className="bg-primary text-primary-foreground">{unreadCount}</Badge>}
              </h1>
              <p className="text-muted-foreground">Stay updated with your service activities</p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark All as Read
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="booking">Bookings</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="reminder">Reminders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Notifications List */}
          <TabsContent value={activeTab} className="mt-6">
            {activeTab === "settings" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="booking-confirmations" className="font-medium">
                            Booking Confirmations
                          </Label>
                          <p className="text-sm text-muted-foreground">Get notified when your bookings are confirmed</p>
                        </div>
                        <Switch
                          id="booking-confirmations"
                          checked={settings.bookingConfirmations}
                          onCheckedChange={(checked) => updateSetting("bookingConfirmations", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="appointment-reminders" className="font-medium">
                            Appointment Reminders
                          </Label>
                          <p className="text-sm text-muted-foreground">Receive reminders before your appointments</p>
                        </div>
                        <Switch
                          id="appointment-reminders"
                          checked={settings.appointmentReminders}
                          onCheckedChange={(checked) => updateSetting("appointmentReminders", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="new-messages" className="font-medium">
                            New Messages
                          </Label>
                          <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                        </div>
                        <Switch
                          id="new-messages"
                          checked={settings.newMessages}
                          onCheckedChange={(checked) => updateSetting("newMessages", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="review-requests" className="font-medium">
                            Review Requests
                          </Label>
                          <p className="text-sm text-muted-foreground">Requests to review completed services</p>
                        </div>
                        <Switch
                          id="review-requests"
                          checked={settings.reviewRequests}
                          onCheckedChange={(checked) => updateSetting("reviewRequests", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="promotional-offers" className="font-medium">
                            Promotional Offers
                          </Label>
                          <p className="text-sm text-muted-foreground">Special deals and promotional content</p>
                        </div>
                        <Switch
                          id="promotional-offers"
                          checked={settings.promotionalOffers}
                          onCheckedChange={(checked) => updateSetting("promotionalOffers", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="system-updates" className="font-medium">
                            System Updates
                          </Label>
                          <p className="text-sm text-muted-foreground">Important platform updates and announcements</p>
                        </div>
                        <Switch
                          id="system-updates"
                          checked={settings.systemUpdates}
                          onCheckedChange={(checked) => updateSetting("systemUpdates", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Delivery Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications" className="font-medium">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications" className="font-medium">
                            Push Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">Browser and mobile push notifications</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-notifications" className="font-medium">
                            SMS Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">Text message notifications</p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
                    <p className="text-muted-foreground">
                      {activeTab === "unread"
                        ? "All caught up! No unread notifications."
                        : "You don't have any notifications yet."}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => {
                    const IconComponent = notification.icon
                    return (
                      <Card
                        key={notification.id}
                        className={`hover:shadow-md transition-shadow ${!notification.read ? "border-primary/50 bg-primary/5" : ""}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-foreground">{notification.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                  <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {!notification.read && (
                                    <Badge className="bg-primary text-primary-foreground text-xs">New</Badge>
                                  )}
                                  <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="mt-3 bg-transparent"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Mark as Read
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
