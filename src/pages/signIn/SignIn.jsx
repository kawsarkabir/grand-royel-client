import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { signInUser, socialLogin, resetPassword } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const signedInUser = await signInUser(email, password);
      if (!signedInUser) return;
      navigate('/');
    } catch {
      // ERROR: handle by contex
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = document.querySelector('input[name="email"]')?.value.trim();
    if (!email) {
      toast.error('Please enter your email first!');
      return;
    }

    try {
      await resetPassword(email);
    } catch {
      // ERROR: handle by contex
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      await socialLogin(provider);
      navigate('/');
    } catch {
      // ERROR: handle by contex
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-md bg-white shadow-md rounded p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              name="password"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              disabled={loading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:underline"
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <p className="text-center text-sm">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

        <div className="flex justify-between gap-2">
          <Button
            type="button"
            onClick={() => handleSocialSignIn(new GoogleAuthProvider())}
            variant="outline"
            className="w-1/2"
            disabled={loading}
          >
            <FaGoogle className="mr-2" /> Google
          </Button>
          <Button
            type="button"
            onClick={() => handleSocialSignIn(new GithubAuthProvider())}
            variant="outline"
            className="w-1/2"
            disabled={loading}
          >
            <FaGithub className="mr-2" />
            GitHub
          </Button>
        </div>
      </form>
    </div>
  );
}
