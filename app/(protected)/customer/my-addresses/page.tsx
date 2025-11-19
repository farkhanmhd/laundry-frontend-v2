import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Address {
  id: string;
  label: string;
  address: string;
  latitude: number;
  longitude: number;
}

const mockAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    address: "Jl. Merdeka 123, Jakarta Pusat",
    latitude: -6.1751,
    longitude: 106.865,
  },
  {
    id: "addr-2",
    label: "Office",
    address: "Jl. Sudirman 456, Jakarta Selatan",
    latitude: -6.2087,
    longitude: 106.7753,
  },
];

export default function MyAddressesPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">My Addresses</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your delivery addresses
            </p>
          </div>
          <Link href="/customer/my-addresses/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {mockAddresses.map((addr) => (
            <Card key={addr.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>{addr.label}</CardTitle>
                  <Badge>Default</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground text-sm">
                  {addr.address}
                </p>
                <div className="mb-4 flex h-40 w-full items-center justify-center rounded-lg bg-gray-200 text-muted-foreground text-sm">
                  [Map Preview]
                </div>
                <div className="flex gap-2">
                  <Link className="flex-1" href="/customer/my-addresses">
                    <Button className="w-full bg-transparent" variant="outline">
                      Edit
                    </Button>
                  </Link>
                  <Button className="flex-1" variant="destructive">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
