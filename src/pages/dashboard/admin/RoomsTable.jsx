/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaEllipsisV } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useDeleteRoom } from '@/hooks/useRooms';

export default function RoomsTable({ rooms, onRefresh }) {
  const deleteRoomMutation = useDeleteRoom();

  const handleDelete = async (roomId) => {
    try {
      await deleteRoomMutation.mutateAsync(roomId);
      toast.success('Room deleted successfully');
      onRefresh();
    } catch (error) {
      toast.error('Failed to delete room', error.message);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room) => (
          <TableRow key={room._id}>
            <TableCell>{room.name}</TableCell>
            <TableCell>{room.location}</TableCell>
            <TableCell>${room.price}</TableCell>
            <TableCell>
              <Badge variant={room.available ? 'default' : 'destructive'}>
                {room.available ? 'Available' : 'Occupied'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <FaEllipsisV className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDelete(room._id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
