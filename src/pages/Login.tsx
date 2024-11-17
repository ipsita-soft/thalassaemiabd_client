import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '@/redux/slices/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Swal from 'sweetalert2';

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { roles, status, token } = useSelector((state: RootState) => state.auth);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneErr, setPhoneErr] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ phone, password })).unwrap();
      Swal.fire({
        title: 'Success!',
        text: 'Login Successful',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-confirm-button',
        },
      });
    } catch (error: any) {
      setPhoneErr(error?.data?.phone || 'An error occurred');
    }
  };

  useEffect(() => {
    if (status === 'succeeded' && token) {
      if (roles.includes("admin")) {
        navigate('/dashboard');
      } else if (roles.includes("blood_donor")) {
        navigate('/userpanel');
      } else {
        navigate('/unauthorized');
      }
    }
  }, [status, token, navigate, roles]);

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your phone number and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phoneErr && <p className="text-red-500 mt-2">{phoneErr}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <div className="mt-4 text-center text-sm w-full">
              Don’t have an account?{' '}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Login;
