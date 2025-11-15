"use client";

import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "services" | "bundles" | "products";
  image: string;
}

const mockMenuItems: MenuItem[] = [
  {
    id: "s-001",
    name: "Express Wash",
    description: "Quick laundry wash service",
    price: 50_000,
    category: "services",
    image: "/express-wash.jpg",
  },
  {
    id: "s-002",
    name: "Premium Dry Clean",
    description: "Professional dry cleaning for delicate fabrics",
    price: 75_000,
    category: "services",
    image: "/dry-cleaning-shop.png",
  },
  {
    id: "s-003",
    name: "Ironing Service",
    description: "Professional ironing and pressing",
    price: 35_000,
    category: "services",
    image: "/ironing-service.jpg",
  },
  {
    id: "bnd-001",
    name: "Family Bundle",
    description: "5kg laundry + ironing + fabric treatment",
    price: 120_000,
    category: "bundles",
    image: "/family-bundle.jpg",
  },
  {
    id: "bnd-002",
    name: "Premium Bundle",
    description: "Dry cleaning + alterations + stain removal",
    price: 180_000,
    category: "bundles",
    image: "/premium-bundle.jpg",
  },
  {
    id: "p-001",
    name: "Laundry Detergent",
    description: "Premium laundry detergent 1L",
    price: 25_000,
    category: "products",
    image: "/laundry-detergent-bottles.png",
  },
];

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("services");

  const filteredItems = mockMenuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl">Our Services & Products</h1>
          <p className="text-muted-foreground">
            Choose from our wide range of laundry services
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
            <Input
              className="pl-10"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services or products..."
              value={searchQuery}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs
          className="mb-8"
          onValueChange={setActiveCategory}
          value={activeCategory}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="bundles">Bundles</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent className="mt-8" value="services">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <MenuItem item={item} key={item.id} />
              ))}
            </div>
          </TabsContent>

          <TabsContent className="mt-8" value="bundles">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <MenuItem item={item} key={item.id} />
              ))}
            </div>
          </TabsContent>

          <TabsContent className="mt-8" value="products">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <MenuItem item={item} key={item.id} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No items found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function MenuItem({ item }: { item: MenuItem }) {
  return (
    <Card className="overflow-hidden transition hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        <Image
          alt={item.name}
          className="h-full w-full object-cover transition hover:scale-105"
          height={1000}
          src={item.image || "/placeholder.svg"}
          width={1000}
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <CardDescription className="text-sm">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="font-bold text-2xl">
            Rp {new Intl.NumberFormat("id-ID").format(item.price)}
          </div>
          <Link href={`/my-orders/new?service=${item.id}`}>
            <Button size="sm">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
