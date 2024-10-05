import { redirect } from 'next/navigation';

export default function Administration() {
  redirect('/administration/users');
}
