import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const statsData = [
  { title: "Total Orders", value: "156", change: "+12%", icon: ShoppingBag, color: "text-primary" },
  { title: "Active Customers", value: "89", change: "+8%", icon: Users, color: "text-accent" },
  { title: "Revenue (Month)", value: "₹45,230", change: "+23%", icon: DollarSign, color: "text-secondary" },
  { title: "Growth Rate", value: "18%", change: "+5%", icon: TrendingUp, color: "text-primary" },
];

const orderData = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 19 },
  { day: "Wed", orders: 15 },
  { day: "Thu", orders: 25 },
  { day: "Fri", orders: 22 },
  { day: "Sat", orders: 30 },
  { day: "Sun", orders: 28 },
];

const revenueData = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 35000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 45230 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-accent font-medium">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Orders</CardTitle>
            <CardDescription>Orders received in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue for the last 5 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--accent))', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "#1234", customer: "Rahul Sharma", items: "2x Dal Makhani Combo", amount: "₹450", status: "Delivered" },
              { id: "#1235", customer: "Priya Patel", items: "1x Weekly Subscription", amount: "₹1,200", status: "Preparing" },
              { id: "#1236", customer: "Amit Kumar", items: "3x Veg Thali", amount: "₹750", status: "Delivered" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{order.customer}</div>
                  <div className="text-sm text-muted-foreground">{order.id} • {order.items}</div>
                </div>
                <div className="text-right mr-4">
                  <div className="font-semibold text-foreground">{order.amount}</div>
                  <div className={`text-sm ${order.status === 'Delivered' ? 'text-accent' : 'text-secondary'}`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
