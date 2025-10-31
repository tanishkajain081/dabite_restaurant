import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { id: 1, name: "Dal Makhani Combo", description: "Creamy dal with rice, roti, and salad", price: 250, available: true, category: "Combo" },
  { id: 2, name: "Paneer Butter Masala Combo", description: "Rich paneer curry with rice and roti", price: 280, available: true, category: "Combo" },
  { id: 3, name: "Veg Thali", description: "Complete meal with 2 vegetables, dal, rice, roti, and sweet", price: 220, available: true, category: "Thali" },
  { id: 4, name: "Chole Bhature", description: "Spicy chickpeas with fried bread", price: 180, available: true, category: "Special" },
  { id: 5, name: "Rajma Chawal", description: "Kidney beans curry with steamed rice", price: 160, available: false, category: "Rice Bowl" },
];

const Menu = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Menu Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage your menu items</p>
        </div>
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
            <form className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Dish Name</Label>
                <Input id="name" placeholder="e.g., Dal Makhani Combo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of the dish" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" type="number" placeholder="250" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g., Combo, Thali, Special" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="available" defaultChecked />
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
      </div>

      {/* Menu Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{menuItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {menuItems.filter(item => item.available).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unavailable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              {menuItems.filter(item => !item.available).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Items Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{item.name}</CardTitle>
                  <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                </div>
                <Badge 
                  variant={item.available ? "default" : "destructive"}
                  className="ml-2"
                >
                  {item.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-foreground">₹{item.price}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Menu;
