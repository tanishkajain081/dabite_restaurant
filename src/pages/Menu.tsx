import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";


const Menu = () => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  // Form states
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: true,
  });
  const [newPlan, setNewPlan] = useState({
    name: "",
    duration: "",
    mealsPerDay: "",
    price: "",
  });

  // Fetch data from Supabase
  useEffect(() => {
    fetchMenuItems();
    fetchSubscriptionPlans();
    fetchSubscribers();
  }, []);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase.from("menu_items").select("*").order("id", { ascending: true });
    if (error) console.error("Error fetching menu items:", error);
    else setMenuItems(data);
  };

  const fetchSubscriptionPlans = async () => {
    const { data, error } = await supabase.from("subscription_plans").select("*").order("id", { ascending: true });
    if (error) console.error("Error fetching subscription plans:", error);
    else setSubscriptionPlans(data);
  };

  const fetchSubscribers = async () => {
    const { data, error } = await supabase.from("subscribers").select("*").order("id", { ascending: true });
    if (error) console.error("Error fetching subscribers:", error);
    else setSubscribers(data);
  };

  // Add new menu item
  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("menu_items").insert([{
      name: newItem.name,
      description: newItem.description,
      price: Number(newItem.price),
      category: newItem.category,
      available: newItem.available,
    }]);
    if (error) console.error("Error adding menu item:", error);
    else {
      fetchMenuItems();
      setIsAddDialogOpen(false);
      setNewItem({ name: "", description: "", price: "", category: "", available: true });
    }
  };

  // Add new plan
  const handleAddPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("subscription_plans").insert([{
      name: newPlan.name,
      duration: newPlan.duration,
      meals_per_day: newPlan.mealsPerDay,
      price: Number(newPlan.price),
    }]);
    if (error) console.error("Error adding subscription plan:", error);
    else {
      fetchSubscriptionPlans();
      setIsAddPlanDialogOpen(false);
      setNewPlan({ name: "", duration: "", mealsPerDay: "", price: "" });
    }
  };

  // Delete menu item
  const handleDeleteMenuItem = async (id: number) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) console.error("Error deleting item:", error);
    else fetchMenuItems();
  };

  // Edit existing menu item
  const handleEditMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    const { error } = await supabase
      .from("menu_items")
      .update({
        name: editItem.name,
        description: editItem.description,
        price: Number(editItem.price),
        category: editItem.category,
        available: editItem.available,
      })
      .eq("id", editItem.id);

    if (error) console.error("Error updating menu item:", error);
    else {
      fetchMenuItems();
      setIsEditDialogOpen(false);
      setEditItem(null);
    }
  };

  // Delete subscription plan
  const handleDeletePlan = async (id: number) => {
    const { error } = await supabase.from("subscription_plans").delete().eq("id", id);
    if (error) console.error("Error deleting plan:", error);
    else fetchSubscriptionPlans();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Menu Management</h1>
        <p className="text-muted-foreground">Manage instant menu items and subscription plans</p>
      </div>

      <Tabs defaultValue="instant" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="instant">Instant Menu</TabsTrigger>
          <TabsTrigger value="subscription">Subscription Menu</TabsTrigger>
        </TabsList>

        {/* INSTANT MENU TAB */}
        <TabsContent value="instant" className="space-y-6">
          <div className="flex items-center justify-end">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="accent">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Menu Item</DialogTitle>
                  <DialogDescription>
                    Create a new dish for your menu. Fill in all the details below.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4" onSubmit={handleAddMenuItem}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Dish Name</Label>
                    <Input id="name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} placeholder="e.g., Dal Makhani Combo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} placeholder="Brief description of the dish" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input id="price" type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} placeholder="250" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} placeholder="e.g., Combo, Thali, Special" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="available" checked={newItem.available} onCheckedChange={(val) => setNewItem({ ...newItem, available: val })} />
                    <Label htmlFor="available">Available for orders</Label>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" variant="accent" className="flex-1">Add Item</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            {/* Edit Menu Item Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Edit Menu Item</DialogTitle>
                  <DialogDescription>Update the details for this menu item.</DialogDescription>
                </DialogHeader>
                {editItem && (
                  <form className="space-y-4 mt-4" onSubmit={handleEditMenuItem}>
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Dish Name</Label>
                      <Input
                        id="edit-name"
                        value={editItem.name}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        value={editItem.description}
                        onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price (₹)</Label>
                      <Input
                        id="edit-price"
                        type="number"
                        value={editItem.price}
                        onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Category</Label>
                      <Input
                        id="edit-category"
                        value={editItem.category}
                        onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="edit-available"
                        checked={editItem.available}
                        onCheckedChange={(val) => setEditItem({ ...editItem, available: val })}
                      />
                      <Label htmlFor="edit-available">Available for orders</Label>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" variant="accent" className="flex-1">
                        Update Item
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {/* Menu Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card><CardHeader><CardTitle>Total Items</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{menuItems.length}</div></CardContent></Card>
            <Card><CardHeader><CardTitle>Available</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-primary">{menuItems.filter(i => i.available).length}</div></CardContent></Card>
            <Card><CardHeader><CardTitle>Unavailable</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-destructive">{menuItems.filter(i => !i.available).length}</div></CardContent></Card>
          </div>

          {/* Menu Items */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map(item => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{item.name}</CardTitle>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <Badge variant={item.available ? "default" : "destructive"}>
                      {item.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">₹{item.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setEditItem(item);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteMenuItem(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* SUBSCRIPTION MENU TAB */}
        <TabsContent value="subscription" className="space-y-6">
          <div className="flex items-center justify-end">
            <Dialog open={isAddPlanDialogOpen} onOpenChange={setIsAddPlanDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="accent">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Subscription Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Plan</DialogTitle>
                  <DialogDescription>Enter details for the new meal subscription plan.</DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4" onSubmit={handleAddPlan}>
                  <div className="space-y-2"><Label>Plan Name</Label><Input value={newPlan.name} onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })} placeholder="Lunch Plan - 15 Days" /></div>
                  <div className="space-y-2"><Label>Duration</Label><Input value={newPlan.duration} onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })} placeholder="15 days" /></div>
                  <div className="space-y-2"><Label>Meals Per Day</Label><Input value={newPlan.mealsPerDay} onChange={(e) => setNewPlan({ ...newPlan, mealsPerDay: e.target.value })} placeholder="Lunch / Dinner / Both" /></div>
                  <div className="space-y-2"><Label>Price (₹)</Label><Input type="number" value={newPlan.price} onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })} placeholder="2100" /></div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" variant="accent" className="flex-1">Add Plan</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddPlanDialogOpen(false)}>Cancel</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Subscription Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card><CardHeader><CardTitle>Total Plans</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{subscriptionPlans.length}</div></CardContent></Card>
            <Card><CardHeader><CardTitle>Total Subscribers</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{subscribers.length}</div></CardContent></Card>
            <Card><CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-primary">₹{subscriptionPlans.reduce((t, p) => t + (p.revenue || 0), 0)}</div></CardContent></Card>
          </div>

          {/* Subscription Plans Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subscriptionPlans.map(plan => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    {plan.duration} • {plan.meals_per_day}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 text-2xl font-bold">₹{plan.price}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Active Subscribers: {plan.active_subscribers || 0}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Revenue: ₹{plan.revenue || 0}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeletePlan(plan.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subscribers Table */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Active Subscribers</h2>
            <div className="overflow-x-auto rounded-lg border">
              <table className="min-w-full text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Plan</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Customization</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="border-t hover:bg-muted/50">
                      <td className="p-3">{sub.customer_name}</td>
                      <td className="p-3">{sub.plan_type}</td>
                      <td className="p-3">
                        {sub.start_date} → {sub.end_date}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={sub.delivery_status === "Active" ? "default" : "secondary"}
                          className={
                            sub.delivery_status === "Paused"
                              ? "bg-yellow-100 text-yellow-800"
                              : ""
                          }
                        >
                          {sub.delivery_status}
                        </Badge>
                      </td>
                      <td className="p-3">{sub.customization}</td>
                      <td className="p-3 text-center space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Menu;