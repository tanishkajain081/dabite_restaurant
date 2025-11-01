"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, []);

  async function getUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") console.error(error);
    else setProfile(data || {});
  }

  async function handleSave() {
    if (!user) return alert("User not logged in!");

    setLoading(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id, // 👈 FIXED: include user id
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      phone: profile.phone,
    });

    setLoading(false);
    if (error) alert("Error saving profile: " + error.message);
    else alert("✅ Profile updated successfully!");
  }
  // ✅ Save Business Info
async function handleSaveBusiness() {
  if (!user) return alert("User not logged in!");
  setLoading(true);
  const { error } = await supabase.from("business_details").upsert({
    user_id: user.id,
    business_name: profile.business_name,
    address: profile.address,
    city: profile.city,
    pincode: profile.pincode,
    description: profile.description,
  });
  setLoading(false);
  if (error) alert("Error saving business info: " + error.message);
  else alert("✅ Business info updated!");
}

// ✅ Save Payment Info
async function handleSavePayment() {
  if (!user) return alert("User not logged in!");
  setLoading(true);
  const { error } = await supabase.from("payment_details").upsert({
    user_id: user.id,
    account_holder: profile.account_name,
    account_number: profile.account_number,
    ifsc: profile.ifsc,
    bank_name: profile.bank_name,
    upi_id: profile.upi,
  });
  setLoading(false);
  if (error) alert("Error saving payment info: " + error.message);
  else alert("✅ Payment info updated!");
}

// ✅ Save Notification Preferences
async function handleSaveNotifications() {
  if (!user) return alert("User not logged in!");
  setLoading(true);
  const { error } = await supabase.from("notification_preferences").upsert({
    user_id: user.id,
    new_orders: profile.newOrders,
    payment_received: profile.paymentReceived,
    subscriptions: profile.subscriptions,
    reviews: profile.reviews,
    marketing: profile.marketing,
  });
  setLoading(false);
  if (error) alert("Error saving notifications: " + error.message);
  else alert("✅ Notification preferences updated!");
}

  return (
    <div className="p-6">
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="business">Business Info</TabsTrigger>
          <TabsTrigger value="payment">Payment Info</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={profile.first_name || ""}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={profile.last_name || ""}
                    onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={profile.email || ""}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
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
        <Input
          id="businessName"
          value={profile.business_name || ""}
          onChange={(e) => setProfile({ ...profile, business_name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={profile.address || ""}
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          rows={3}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={profile.city || ""}
            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            value={profile.pincode || ""}
            onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Business Description</Label>
        <Textarea
          id="description"
          value={profile.description || ""}
          onChange={(e) => setProfile({ ...profile, description: e.target.value })}
          placeholder="Tell customers about your kitchen..."
          rows={4}
        />
      </div>
      <Button onClick={handleSaveBusiness} disabled={loading}>
        {loading ? "Saving..." : "Update Business Info"}
      </Button>
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
        <Input
          id="accountName"
          value={profile.account_name || ""}
          onChange={(e) => setProfile({ ...profile, account_name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Bank Account Number</Label>
        <Input
          id="accountNumber"
          value={profile.account_number || ""}
          onChange={(e) => setProfile({ ...profile, account_number: e.target.value })}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ifsc">IFSC Code</Label>
          <Input
            id="ifsc"
            value={profile.ifsc || ""}
            onChange={(e) => setProfile({ ...profile, ifsc: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name</Label>
          <Input
            id="bankName"
            value={profile.bank_name || ""}
            onChange={(e) => setProfile({ ...profile, bank_name: e.target.value })}
          />
        </div>
      </div>
      <div className="border-t pt-4 mt-4">
        <h4 className="font-semibold mb-4 text-foreground">UPI Details</h4>
        <div className="space-y-2">
          <Label htmlFor="upi">UPI ID</Label>
          <Input
            id="upi"
            value={profile.upi || ""}
            onChange={(e) => setProfile({ ...profile, upi: e.target.value })}
          />
        </div>
      </div>
      <Button onClick={handleSavePayment} disabled={loading}>
        {loading ? "Saving..." : "Update Payment Info"}
      </Button>
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
      {[
        { id: "newOrders", label: "New Orders", desc: "Get notified when you receive a new order" },
        { id: "paymentReceived", label: "Payment Received", desc: "Notifications when customers complete payment" },
        { id: "subscriptions", label: "Subscription Renewals", desc: "Alert when a subscription is about to renew" },
        { id: "reviews", label: "Customer Reviews", desc: "Receive notifications for new customer reviews" },
        { id: "marketing", label: "Marketing Updates", desc: "Tips and updates from Dabite" },
      ].map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor={item.id}>{item.label}</Label>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
          <Switch
            id={item.id}
            checked={!!profile[item.id]}
            onCheckedChange={(checked) => setProfile({ ...profile, [item.id]: checked })}
          />
        </div>
      ))}
      <Button onClick={handleSaveNotifications} disabled={loading}>
        {loading ? "Saving..." : "Save Preferences"}
      </Button>
    </CardContent>
  </Card>
</TabsContent>
      </Tabs>
    </div>
  );
}