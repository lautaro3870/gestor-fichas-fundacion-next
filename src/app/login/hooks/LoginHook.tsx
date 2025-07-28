'use client';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/lib/schemas';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function LoginHook() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [loginMutation, { data, loading, error }] = useMutation(LOGIN);

  const login = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Complete los campos',
      });
      return;
    }
    try {
      const response = await loginMutation({
        variables: {
          signupInput: {
            email,
            password,
          },
        },
      });
      // revisar porque data la primera vez es undefined aunque el loading haya terminado
      const token = loading ? '' : response.data.login.token;
      window.localStorage.setItem('token', token);
    } catch (err: any) {
      console.log(err);
      if (err.message === 'Email/Password do not match') {
        Swal.fire({
          icon: 'error',
          title: 'Usuario y/o contraseña incorrectos',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el sistema',
        });
      }
    }
  };

  useEffect(() => {
    if (data?.login?.token) {
      router.push('/proyectos');
    }
  }, [data, router]);

  return {
    login,
    email,
    setEmail,
    password,
    setPassword,
    loading,
  };
}
