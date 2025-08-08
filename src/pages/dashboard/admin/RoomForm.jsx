/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useUpdateRoom } from '@/hooks/useRooms';
import { useAddRoom } from '@/hooks/useAddRoom';

export default function RoomForm({
  initialData = null,
  onSuccess,
  onCancel,
  isUpdating = false,
}) {
  const [imageUrls, setImageUrls] = useState(['', '', '', '']);
  const [amenities, setAmenities] = useState([{ name: '', icon: '' }]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    guests: 1,
    beds: 1,
    bathrooms: 1,
    location: '',
    available: true,
    rating: 0,
    totalReviews: 0,
    host: {
      name: '',
      joined: new Date().getFullYear().toString(),
      superhost: false,
      avatar: '/placeholder-user.jpg',
    },
  });

  const { mutate: addRoom } = useAddRoom();
  const updateRoomMutation = useUpdateRoom();

  // Initialize form when in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        guests: initialData.guests,
        beds: initialData.beds,
        bathrooms: initialData.bathrooms,
        location: initialData.location,
        available: initialData.available,
        rating: initialData.rating,
        totalReviews: initialData.totalReviews,
        host: {
          name: initialData.host.name,
          joined: initialData.host.joined,
          superhost: initialData.host.superhost,
          avatar: initialData.host.avatar,
        },
      });

      // Handle images
      const initialImages = [...initialData.images];
      while (initialImages.length < 4) initialImages.push('');
      setImageUrls(initialImages.slice(0, 4));

      // TODO: fix frist one item did not take initial data
      setAmenities(
        initialData.amenities?.length > 0
          ? [...initialData.amenities]
          : [{ name: '', icon: '' }],
      );
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' ||
        name === 'guests' ||
        name === 'beds' ||
        name === 'bathrooms' ||
        name === 'rating' ||
        name === 'totalReviews'
          ? Number(value)
          : value,
    }));
  };

  const handleHostChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      host: {
        ...prev.host,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const handleAmenityChange = (index, field, value) => {
    const newAmenities = [...amenities];
    newAmenities[index] = {
      ...newAmenities[index],
      [field]: value,
    };
    setAmenities(newAmenities);
  };

  const addAmenity = () => {
    setAmenities([...amenities, { name: '', icon: '' }]);
  };

  const removeAmenity = (index) => {
    const newAmenities = [...amenities];
    newAmenities.splice(index, 1);
    setAmenities(newAmenities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out empty image URLs
    const filteredImageUrls = imageUrls.filter((url) => url.trim() !== '');
    // Filter out amenities with empty names
    const filteredAmenities = amenities.filter((a) => a.name.trim() !== '');

    const roomData = {
      ...formData,
      images: filteredImageUrls,
      amenities: filteredAmenities,
    };

    if (isUpdating) {
      updateRoomMutation.mutate(
        {
          id: initialData._id,
          data: roomData,
        },
        {
          onSuccess: () => {
            toast.success('Room updated successfully');
            onSuccess();
          },
          onError: (error) => {
            toast.error('Error updating room', {
              description:
                error.response?.data?.message || 'Failed to update room',
            });
          },
        },
      );
    } else {
      addRoom(roomData, {
        onSuccess: () => {
          toast.success('Room added successfully');
          onSuccess();
        },
        onError: (error) => {
          toast.error('Error adding room', {
            description: error.response?.data?.message || 'Failed to add room',
          });
        },
      });
    }
  };

  const iconOptions = [
    'MapPin',
    'Sun',
    'Wifi',
    'Tv',
    'Utensils',
    'Car',
    'Snowflake',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {isUpdating ? 'Edit Room' : 'Add New Room'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Room Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Luxury Lakefront Room"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price per night ($)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enjoy peaceful lake views from your private balcony."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="guests">Max Guests</Label>
            <Input
              id="guests"
              name="guests"
              type="number"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="beds">Number of Beds</Label>
            <Input
              id="beds"
              name="beds"
              type="number"
              value={formData.beds}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Number of Bathrooms</Label>
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Lakeside Drive, Lakeshore"
            required
          />
        </div>

        {isUpdating && (
          <div className="space-y-2">
            <Label>Availability</Label>
            <Select
              value={formData.available ? 'available' : 'occupied'}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  available: value === 'available',
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Room Images</h2>
        <p className="text-sm text-gray-500">
          Add at least one image URL for the room.
        </p>

        {imageUrls.map((url, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`image-${index}`}>Image URL {index + 1}</Label>
            <div className="flex gap-2">
              <Input
                id={`image-${index}`}
                type="url"
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Amenities</h2>

        {amenities.map((amenity, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
          >
            <div className="space-y-2">
              <Label htmlFor={`amenity-name-${index}`}>Amenity Name</Label>
              <Input
                id={`amenity-name-${index}`}
                value={amenity.name}
                onChange={(e) =>
                  handleAmenityChange(index, 'name', e.target.value)
                }
                placeholder="Free Wi-Fi"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`amenity-icon-${index}`}>Icon</Label>
              <Select
                value={amenity.icon || ''}
                onValueChange={(value) =>
                  handleAmenityChange(index, 'icon', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon">
                    {amenity.icon ? (
                      <span className="flex items-center gap-2">
                        {amenity.icon}
                      </span>
                    ) : (
                      'Select an icon'
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => removeAmenity(index)}
              className="w-full md:w-auto"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addAmenity}
          className="w-full"
        >
          Add Amenity
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Host Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host-name">Host Name</Label>
            <Input
              id="host-name"
              name="name"
              value={formData.host.name}
              onChange={handleHostChange}
              placeholder="Lake Stay"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="host-joined">Year Joined</Label>
            <Input
              id="host-joined"
              name="joined"
              value={formData.host.joined}
              onChange={handleHostChange}
              placeholder="2016"
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="superhost"
            name="superhost"
            type="checkbox"
            checked={formData.host.superhost}
            onChange={handleHostChange}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="superhost">Superhost</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="host-avatar">Host Avatar URL</Label>
          <Input
            id="host-avatar"
            name="avatar"
            value={formData.host.avatar}
            onChange={handleHostChange}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isUpdating ? 'Update Room' : 'Add Room'}</Button>
      </div>
    </form>
  );
}
