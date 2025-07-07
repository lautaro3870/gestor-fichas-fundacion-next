'use client';

import { GET_AREAS } from '@/lib/schemas';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import NavigationBar from '../components/NavigationBar';

export default function Proyectos() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_AREAS);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (error && error.cause?.message === 'Unauthorized') {
      Swal.fire({
        icon: 'info',
        title: 'Sesión expirada',
      });
      router.push('/login');
    } else {
      if (!loading) {
        console.log(data.areas);
      }
    }
  }, [loading]);

  return (
    <>
      <nav>
        <NavigationBar />
      </nav>
    </>
  );
}
