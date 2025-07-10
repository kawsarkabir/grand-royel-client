/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function RoomFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filter Rooms</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="price-range">Price Range</Label>
          <div className="flex items-center gap-2">
            <Input
              id="min-price"
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-1/2"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              id="max-price"
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-1/2"
            />
          </div>
          <Slider
            id="price-range-slider"
            min={0}
            max={1500}
            step={10}
            value={[minPrice, maxPrice]}
            onValueChange={([min, max]) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
            className="mt-4"
          />
        </div>
      </CardContent>
    </Card>
  );
}
