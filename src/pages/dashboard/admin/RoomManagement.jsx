import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import RoomsTable from './RoomsTable';
import AddRoomForm from './RoomForm';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RoomManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

  // Fetch rooms data
  const {
    data: rooms = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await axiosInstance.get('/rooms');
      return response.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    toast.error('Failed to load rooms');
    return <div>Error loading rooms</div>;
  }

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'available' && room.available) ||
      (statusFilter === 'occupied' && !room.available);
    return matchesSearch && matchesStatus;
  });

  const handleRoomAdded = () => {
    setIsAddRoomOpen(false);
    refetch();
    toast.success('Room added successfully');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>Room Management</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search rooms..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="whitespace-nowrap"
                onClick={() => setIsAddRoomOpen(true)}
              >
                Add Room
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RoomsTable rooms={filteredRooms} onRefresh={refetch} />
        </CardContent>
      </Card>

      {/* Add Room Dialog */}
      <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
          </DialogHeader>
          <AddRoomForm onSuccess={handleRoomAdded} />
        </DialogContent>
      </Dialog>
    </>
  );
}
