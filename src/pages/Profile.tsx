import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building2, CreditCard, Bell } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="business">
            <Building2 className="w-4 h-4 mr-2" />
            Business
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="w-4 h-4 mr-2" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Rajesh" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Kumar" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="rajesh@dabitekitchen.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
              </div>
              <Button variant="accent">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Details</CardTitle>
              <CardDescription>Manage your kitchen or tiffin center information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" defaultValue="Rajesh's Home Kitchen" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  defaultValue="123, MG Road, Koramangala, Bangalore - 560034"
                  rows={3}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Bangalore" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" defaultValue="560034" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Tell customers about your kitchen..."
                  rows={4}
                  defaultValue="We serve authentic home-style North Indian cuisine made with love and fresh ingredients. Specializing in healthy, hygienic tiffin services."
                />
              </div>
              <Button variant="accent">Update Business Info</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Manage your bank account and UPI details for receiving payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Holder Name</Label>
                <Input id="accountName" defaultValue="Rajesh Kumar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Bank Account Number</Label>
                <Input id="accountNumber" defaultValue="••••••••4567" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input id="ifsc" defaultValue="HDFC0001234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input id="bankName" defaultValue="HDFC Bank" />
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold mb-4 text-foreground">UPI Details</h4>
                <div className="space-y-2">
                  <Label htmlFor="upi">UPI ID</Label>
                  <Input id="upi" defaultValue="rajesh@oksbi" />
                </div>
              </div>
              <Button variant="accent">Update Payment Info</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newOrders">New Orders</Label>
                  <p className="text-sm text-muted-foreground">Get notified when you receive a new order</p>
                </div>
                <Switch id="newOrders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="paymentReceived">Payment Received</Label>
                  <p className="text-sm text-muted-foreground">Notifications when customers complete payment</p>
                </div>
                <Switch id="paymentReceived" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="subscriptions">Subscription Renewals</Label>
                  <p className="text-sm text-muted-foreground">Alert when a subscription is about to renew</p>
                </div>
                <Switch id="subscriptions" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reviews">Customer Reviews</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new customer reviews</p>
                </div>
                <Switch id="reviews" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing">Marketing Updates</Label>
                  <p className="text-sm text-muted-foreground">Tips and updates from Dabite</p>
                </div>
                <Switch id="marketing" />
              </div>
              <Button variant="accent">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
