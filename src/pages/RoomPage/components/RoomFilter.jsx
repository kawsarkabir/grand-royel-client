import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function RoomFilter() {
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState([50, 1000]);

  const handleApplyFilter = () => {
    // In a real application, this would trigger a server-side fetch
    // with the selected minPrice and maxPrice.
    console.log('Applying filter:', { minPrice, maxPrice });
    alert(
      `Filtering rooms from $${minPrice} to $${maxPrice}. (Server-side filter would apply here)`,
    );
  };

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
          {/* Assuming shadcn Slider component is available */}
          <Slider
            id="price-range-slider"
            min={0}
            max={1500}
            step={10}
            value={[minPrice, maxPrice]}
            onValueChange={(value) => {
              setMinPrice(value[0]);
              setMaxPrice(value[1]);
            }}
            className="mt-4"
          />
        </div>
        {/* Add more filter options here if needed, e.g., amenities, room type */}
        <Button onClick={handleApplyFilter} className="w-full">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
