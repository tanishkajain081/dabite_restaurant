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
      </Tabs>
    </div>
  );
}