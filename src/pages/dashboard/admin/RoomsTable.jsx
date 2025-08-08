/* eslint-disable unused-imports/no-unused-vars */
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

export default function RoomsTable({ rooms }) {
  const handleEdit = (roomId) => {
    // Handle edit logic
    // console.log('Edit room:', roomId);
  };

  const handleDelete = (roomId) => {
    // Handle delete logic
    // console.log('Delete room:', roomId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room Number</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room) => (
          <TableRow key={room.id}>
            <TableCell>{room.number}</TableCell>
            <TableCell>{room.type}</TableCell>
            <TableCell>{room.price}</TableCell>
            <TableCell>
              <Badge
                variant={
                  room.status === 'available'
                    ? 'default'
                    : room.status === 'occupied'
                      ? 'destructive'
                      : 'secondary'
                }
              >
                {room.status}
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
                  <DropdownMenuItem onClick={() => handleEdit(room.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDelete(room.id)}
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
