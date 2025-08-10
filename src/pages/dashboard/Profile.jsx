import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Edit, Upload } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile update functionality
    toast.info('Profile updated func is not implement yet!');
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    // TODO: Implement password change functionality
    toast.info('Password changed func is not implement yet!');
    e.target.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profile Information</CardTitle>
            <Button
              variant={isEditing ? 'default' : 'outline'}
              size="sm"
              onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            >
              {isEditing ? (
                'Save Changes'
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user?.photoURL || undefined}
                    alt={user?.displayName || 'User'}
                  />
                  <AvatarFallback>
                    {user?.displayName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer hover:bg-primary/90">
                    <Upload className="h-4 w-4 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        // TODO: Implement image upload functionality
                        if (e.target.files && e.target.files[0]) {
                          toast.info('Image upload feature coming soon!');
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              <div className="w-full space-y-2">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input
                    name="displayName"
                    value={profileData.displayName}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-1">
                  <Label>Role</Label>
                  <Input
                    value={user?.role || 'user'}
                    disabled
                    className="cursor-not-allowed hover:opacity-80"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Account Created</Label>
                  <Input
                    value={
                      user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'Unknown'
                    }
                    disabled
                    className="cursor-not-allowed hover:opacity-80"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Change Card */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label>Current Password</Label>
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  required
                  minLength={6}
                />
              </div>

              <Separator />

              <div className="space-y-1">
                <Label>New Password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-1">
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">Change Password</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
