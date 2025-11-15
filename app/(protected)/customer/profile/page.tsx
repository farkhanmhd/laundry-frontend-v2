"use client";

import { ArrowLeft, MapPin, Plus, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberId: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  points: number;
  joinedDate: string;
  addresses: Array<{
    id: string;
    label: string;
    address: string;
  }>;
}

const mockProfile: UserProfile = {
  name: "Richi Kusuma",
  email: "richi@email.com",
  phone: "+62812345678",
  memberId: "c-001",
  tier: "platinum",
  points: 2500,
  joinedDate: "2024-01-15",
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      address: "Jl. Merdeka 123, Jakarta Pusat",
    },
    {
      id: "addr-2",
      label: "Office",
      address: "Jl. Sudirman 456, Jakarta Selatan",
    },
  ],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockProfile);

  const tierColors = {
    bronze: "bg-amber-100 text-amber-800",
    silver: "bg-slate-100 text-slate-800",
    gold: "bg-yellow-100 text-yellow-800",
    platinum: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/my-orders">
            <Button className="mb-4" size="sm" variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-3xl">My Profile</h1>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
            >
              {isEditing ? "Done" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Profile Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label
                  className="font-medium text-muted-foreground text-sm"
                  htmlFor="name"
                >
                  Full Name
                </Label>
                <Input
                  className="mt-2"
                  disabled={!isEditing}
                  id="name"
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  value={profile.name}
                />
              </div>
              <div>
                <Label
                  className="font-medium text-muted-foreground text-sm"
                  htmlFor="email"
                >
                  Email Address
                </Label>
                <Input
                  className="mt-2"
                  disabled={!isEditing}
                  id="email"
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  type="email"
                  value={profile.email}
                />
              </div>
              <div>
                <Label
                  className="font-medium text-muted-foreground text-sm"
                  htmlFor="phone"
                >
                  Phone Number
                </Label>
                <Input
                  className="mt-2"
                  disabled={!isEditing}
                  id="phone"
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  value={profile.phone}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Membership Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Membership Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-4">
                <User className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground text-sm">Member ID</p>
                  <p className="font-medium font-mono">{profile.memberId}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={tierColors[profile.tier]}>
                  {profile.tier.charAt(0).toUpperCase() + profile.tier.slice(1)}
                </Badge>
                <div>
                  <p className="text-muted-foreground text-sm">Member Tier</p>
                  <p className="font-medium">
                    Since{" "}
                    {new Date(profile.joinedDate).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Loyalty Points</p>
                <p className="font-bold text-2xl">{profile.points}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saved Addresses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>Manage your delivery addresses</CardDescription>
            </div>
            <Link href="/my-addresses/new">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Address
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.addresses.map((addr) => (
                <div
                  className="flex items-start gap-4 rounded-lg border p-4 transition hover:bg-accent"
                  key={addr.id}
                >
                  <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{addr.label}</p>
                      <Badge className="text-xs" variant="outline">
                        Default
                      </Badge>
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm">
                      {addr.address}
                    </p>
                  </div>
                  <Link href={`/my-addresses/${addr.id}`}>
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
