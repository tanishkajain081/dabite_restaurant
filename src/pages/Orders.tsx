import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Package } from "lucide-react";

const ordersData = {
  pending: [
    { id: "#1237", customer: "Sneha Reddy", items: "2x Paneer Butter Masala Combo", amount: "₹520", time: "10:30 AM", date: "Today" },
    { id: "#1238", customer: "Vikram Singh", items: "1x Monthly Subscription", amount: "₹3,600", time: "11:15 AM", date: "Today" },
    { id: "#1239", customer: "Anjali Verma", items: "4x Mixed Veg Thali", amount: "₹900", time: "12:00 PM", date: "Today" },
  ],
  preparing: [
    { id: "#1235", customer: "Priya Patel", items: "1x Weekly Subscription", amount: "₹1,200", time: "09:00 AM", date: "Today" },
    { id: "#1240", customer: "Arjun Mehta", items: "3x Chole Bhature", amount: "₹450", time: "10:00 AM", date: "Today" },
  ],
  delivered: [
    { id: "#1234", customer: "Rahul Sharma", items: "2x Dal Makhani Combo", amount: "₹450", time: "08:30 AM", date: "Today" },
    { id: "#1236", customer: "Amit Kumar", items: "3x Veg Thali", amount: "₹750", time: "09:45 AM", date: "Today" },
    { id: "#1233", customer: "Kavita Joshi", items: "1x Rajma Chawal Combo", amount: "₹280", time: "Yesterday", date: "Yesterday" },
  ],
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <Package className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-secondary text-secondary-foreground";
      case "preparing":
        return "bg-accent/20 text-accent-foreground";
      case "delivered":
        return "bg-primary/20 text-primary";
      default:
        return "bg-destructive/20 text-destructive";
    }
  };

  const renderOrderCard = (order: any, status: string) => (
    <Card key={order.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-lg text-foreground">{order.id}</span>
              <Badge className={getStatusColor(status)} variant="secondary">
                {getStatusIcon(status)}
                <span className="ml-1 capitalize">{status}</span>
              </Badge>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{order.customer}</h3>
            <p className="text-sm text-muted-foreground">{order.items}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-foreground mb-1">{order.amount}</div>
            <div className="text-sm text-muted-foreground">{order.time}</div>
          </div>
        </div>
        <div className="flex gap-2">
          {status === "pending" && (
            <>
              <Button size="sm" variant="default">Accept Order</Button>
              <Button size="sm" variant="outline">Decline</Button>
            </>
          )}
          {status === "preparing" && (
            <Button size="sm" variant="accent">Mark as Delivered</Button>
          )}
          {status === "delivered" && (
            <Button size="sm" variant="ghost">View Details</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage and track all your orders</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{ordersData.pending.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Preparing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{ordersData.preparing.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivered Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {ordersData.delivered.filter(o => o.date === "Today").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {ordersData.pending.length + ordersData.preparing.length + ordersData.delivered.filter(o => o.date === "Today").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Pending Orders</h3>
            {ordersData.pending.map(order => renderOrderCard(order, "pending"))}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Preparing</h3>
            {ordersData.preparing.map(order => renderOrderCard(order, "preparing"))}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Recently Delivered</h3>
            {ordersData.delivered.map(order => renderOrderCard(order, "delivered"))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          {ordersData.pending.map(order => renderOrderCard(order, "pending"))}
        </TabsContent>

        <TabsContent value="preparing">
          {ordersData.preparing.map(order => renderOrderCard(order, "preparing"))}
        </TabsContent>

        <TabsContent value="delivered">
          {ordersData.delivered.map(order => renderOrderCard(order, "delivered"))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
