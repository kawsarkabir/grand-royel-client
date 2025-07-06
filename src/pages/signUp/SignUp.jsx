import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { validatePassword } from '@/utils/validatePassword';
import { useAuth } from '@/hooks/useAuth';

export default function SignUp() {
  const navigate = useNavigate();
  const { signUpUser, socialLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const photoURL = form.photoURL.value.trim();
    const termsAccepted = form.terms.checked;

    if (!email || !password || !name || !photoURL) {
      toast.error('Please fill in all fields.');
      setLoading(false);
      return;
    }

    const validation = validatePassword(password);
    if (validation !== 'valid') {
      toast.error(validation);
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      toast.error('You must accept the terms and conditions.');
      setLoading(false);
      return;
    }

    try {
      await signUpUser(email, password, name, photoURL);
      navigate('/signin');
    } catch {
      // ERROR: handle by contex
    } finally {
      setLoading(false);
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
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="name"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="photoURL">PhotoURL</Label>
          <Input
            name="photoURL"
            type="text"
            placeholder="photo url"
            disabled={loading}
          />
        </div>

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
        </div>

        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="terms" id="terms" disabled={loading} />
          <label>
            I agree to the{' '}
            <span className="underline text-blue-600 cursor-pointer">
              Terms & Conditions
            </span>
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </Button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>

        <div className="flex justify-between gap-2">
          <Button
            type="button"
            onClick={() => handleSocialSignIn(new GoogleAuthProvider())}
            variant="outline"
            className="w-1/2"
          >
            <FaGoogle className="mr-2" /> Google
          </Button>
          <Button
            type="button"
            onClick={() => handleSocialSignIn(new GithubAuthProvider())}
            variant="outline"
            className="w-1/2"
          >
            <FaGithub className="mr-2" /> GitHub
          </Button>
        </div>
      </form>
    </div>
  );
}
