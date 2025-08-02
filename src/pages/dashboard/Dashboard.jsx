import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHotel,
  FaUsers,
  FaBed,
  FaMoneyBillWave,
  FaChartLine,
  FaSearch,
  FaUserCircle,
  FaEllipsisV,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router';

export default function DashboardHome() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [roomSearchTerm, setRoomSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [roomStatusFilter, setRoomStatusFilter] = useState('all');
  const [userLocationFilter, setUserLocationFilter] = useState('all');

  // Mock data
  const stats = [
    { title: 'Total Users', value: 42, icon: <FaUsers className="text-orange-500" />, trend: 'down' },
    { title: 'Total Rooms', value: 87, icon: <FaBed className="text-green-500" />, trend: 'up' },
    { title: 'Total Revenue', value: '$24,580', icon: <FaMoneyBillWave className="text-purple-500" />, trend: 'up' },
  ];

  const rooms = [
    { id: 1, number: 'Deluxe 201', type: 'Deluxe', price: '$200', status: 'occupied' },
    { id: 2, number: 'Suite 305', type: 'Suite', price: '$350', status: 'available' },
    { id: 3, number: 'Standard 102', type: 'Standard', price: '$120', status: 'maintenance' },
    { id: 4, number: 'Premium 401', type: 'Premium', price: '$280', status: 'available' },
    { id: 5, number: 'Deluxe 202', type: 'Deluxe', price: '$200', status: 'occupied' }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', location: 'New York', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 (555) 987-6543', location: 'Los Angeles', status: 'active' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '+1 (555) 456-7890', location: 'Chicago', status: 'inactive' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+1 (555) 789-0123', location: 'Miami', status: 'active' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', phone: '+1 (555) 234-5678', location: 'New York', status: 'active' }
  ];

  // Filter rooms based on search and status filter
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(roomSearchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(roomSearchTerm.toLowerCase());
    const matchesStatus = roomStatusFilter === 'all' || room.status === roomStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter users based on search and location filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase());
    const matchesLocation = userLocationFilter === 'all' || user.location === userLocationFilter;
    return matchesSearch && matchesLocation;
  });

  const handleRoomAction = (action, roomId) => {
    console.log(`${action} room with id: ${roomId}`);
    // Implement your actual edit/delete logic here
  };

  const handleUserAction = (action, userId) => {
    console.log(`${action} user with id: ${userId}`);
    // Implement your actual edit/delete logic here
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </CardTitle>
                      {stat.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.trend === 'up' ? '↑ 12% from last month' : '↓ 8% from last month'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        );
      case 'rooms':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
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
                        value={roomSearchTerm}
                        onChange={(e) => setRoomSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={roomStatusFilter} onValueChange={setRoomStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="whitespace-nowrap">Add Room</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
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
                    {filteredRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>{room.number}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>{room.price}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              room.status === 'available' ? 'default' :
                                room.status === 'occupied' ? 'destructive' :
                                  'secondary'
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
                              <DropdownMenuItem onClick={() => handleRoomAction('edit', room.id)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleRoomAction('delete', room.id)}
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
              </CardContent>
            </Card>
          </motion.div>
        );
      case 'users':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        className="pl-9"
                        value={userSearchTerm}
                        onChange={(e) => setUserSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={userLocationFilter} onValueChange={setUserLocationFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
                        <SelectItem value="Miami">Miami</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant={user.status === 'active' ? 'default' : 'secondary'}
                          >
                            {user.status}
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
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleUserAction('delete', user.id)}
                              >
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="hidden md:flex md:flex-col w-64 bg-primary text-white h-full fixed"
      >
        <div className="p-4 border-b border-primary-700">
          <h2 className="text-xl font-bold flex items-center">
            <FaHotel className="mr-2" /> Grand Royel
          </h2>
        </div>
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <Button
                onClick={() => setActiveTab('dashboard')}
                variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'dashboard' ? 'bg-accent text-accent-foreground' : 'hover:bg-white hover:text-primary'}`}
              >
                <FaChartLine className="mr-2" /> Dashboard
              </Button>
            </li>
            <li>
              <Button
                onClick={() => setActiveTab('rooms')}
                variant={activeTab === 'rooms' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'rooms' ? 'bg-accent text-accent-foreground' : 'hover:bg-white hover:text-primary'}`}
              >
                <FaBed className="mr-2" /> Room Management
              </Button>
            </li>
            <li>
              <Button
                onClick={() => setActiveTab('users')}
                variant={activeTab === 'users' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'users' ? 'bg-accent text-accent-foreground' : 'hover:bg-white hover:text-primary'}`}
              >
                <FaUsers className="mr-2" /> User Management
              </Button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-primary-700 space-y-2">
          <Link to="/">
            <Button
              variant={"ghost"}

              className="w-full justify-start hover:bg-white hover:text-primary"
            >

              <FaHome className="mr-2" /> Go Back

            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start  hover:bg-white hover:text-primary"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab}
          </h1>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='cursor-pointer'>
                  <FaUserCircle className="h-8 w-8  border-primary border-2 rounded-full" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FaUserCircle className="mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FaHome className="mr-2" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FaSignOutAlt className="mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4">
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            onClick={() => setActiveTab('dashboard')}
            className={`flex-col h-auto py-2 ${activeTab === 'dashboard' ? 'text-primary' : 'text-gray-600'}`}
          >
            <FaChartLine className="mb-1" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('rooms')}
            className={`flex-col h-auto py-2 ${activeTab === 'rooms' ? 'text-primary' : 'text-gray-600'}`}
          >
            <FaBed className="mb-1" />
            <span className="text-xs">Rooms</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('users')}
            className={`flex-col h-auto py-2 ${activeTab === 'users' ? 'text-primary' : 'text-gray-600'}`}
          >
            <FaUsers className="mb-1" />
            <span className="text-xs">Users</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex-col h-auto py-2">
                <FaUserCircle className="mb-1" />
                <span className="text-xs">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="center">
              <DropdownMenuItem>
                <FaHome className="mr-2" /> Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaUserCircle className="mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <FaSignOutAlt className="mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}