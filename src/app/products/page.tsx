"use client";

import { Filter, Search, Boxes, Star, X, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MinimalNav } from "@/components/nav/minimal-nav";
import Image from "next/image";

// Sample data - in real app this would come from an API
const products = [
  {
    id: "PROD-001",
    name: "Handcrafted Leather Wallet",
    category: "Fashion & Accessories",
    type: "physical",
    price: 59.99,
    rating: 4.5,
    sales: 124,
    vendor: "Leather Craft Co.",
    location: "New York",
    image: "/placeholder.jpg",
  },
  {
    id: "PROD-002",
    name: "Professional Photography Session",
    category: "Services",
    type: "service",
    price: 199.99,
    rating: 4.8,
    sales: 56,
    vendor: "Crystal Clear Photography",
    location: "Los Angeles",
    image: "/placeholder.jpg",
  },
  {
    id: "PROD-003",
    name: "Organic Skincare Set",
    category: "Beauty & Health",
    type: "physical",
    price: 89.99,
    rating: 4.7,
    sales: 238,
    vendor: "Natural Beauty Co.",
    location: "San Francisco",
    image: "/placeholder.jpg",
  },
  {
    id: "PROD-004",
    name: "Digital Marketing Course",
    category: "Digital Products",
    type: "digital",
    price: 299.99,
    rating: 4.6,
    sales: 415,
    vendor: "Marketing Masters",
    location: "Online",
    image: "/placeholder.jpg",
  },
  {
    id: "PROD-005",
    name: "Handmade Ceramic Vase",
    category: "Home & Living",
    type: "physical",
    price: 79.99,
    rating: 4.9,
    sales: 89,
    vendor: "Artistic Ceramics",
    location: "Portland",
    image: "/placeholder.jpg",
  },
  {
    id: "PROD-006",
    name: "Yoga Classes Package",
    category: "Services",
    type: "service",
    price: 149.99,
    rating: 4.8,
    sales: 167,
    vendor: "Zen Yoga Studio",
    location: "Miami",
    image: "/placeholder.jpg",
  }
];

// Get unique categories from products
const categories = Array.from(new Set(products.map(product => product.category)));
const types = ["all", "physical", "digital", "service"];
const sorts = ["Most Recent", "Price: Low to High", "Price: High to Low", "Most Popular", "Best Rating"];
const priceRanges = [
  { label: "All", value: "all" },
  { label: "Under $50", value: "0-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "Over $200", value: "200+" },
];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSort, setSelectedSort] = useState(sorts[0]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0].value);

  // Filter products based on search, category, type, and price range
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesType = selectedType === "all" || product.type === selectedType;
    
    // Handle price range filtering
    const matchesPriceRange = (() => {
      if (selectedPriceRange === "all") return true;
      if (selectedPriceRange === "0-50") return product.price < 50;
      if (selectedPriceRange === "50-100") return product.price >= 50 && product.price <= 100;
      if (selectedPriceRange === "100-200") return product.price >= 100 && product.price <= 200;
      if (selectedPriceRange === "200+") return product.price > 200;
      return true;
    })();

    return matchesSearch && matchesCategory && matchesType && matchesPriceRange;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Most Popular":
        return b.sales - a.sales;
      case "Best Rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <MaxWidthWrapper>
      <MinimalNav />
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-8">Discover Amazing Products & Services</h1>
          
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products, services, or vendors..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  {sorts.map(sort => (
                    <SelectItem key={sort} value={sort}>{sort}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-card">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <Badge variant={
                      product.type === 'physical' ? 'default' :
                      product.type === 'digital' ? 'secondary' : 'outline'
                    }>
                      {product.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin size={16} />
                    <span>{product.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-2">{product.vendor}</p>
                  <div className="flex items-center gap-2">
                    <Star className="fill-yellow-400 stroke-yellow-400" size={16} />
                    <span>{product.rating} · {product.sales} sales</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price}</span>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    View Details
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}