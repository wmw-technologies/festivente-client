// import { cookies } from 'next/headers';
import Form from './form';

type AdministrationUsersFormProps = {
  params: {
    id: string;
  };
};

async function fetchData(id: string) {
  return [];
}

export default async function AdministrationUsersForm({ params }: AdministrationUsersFormProps) {
  const { id } = params;
  const isEdit = id !== 'add';
  const data = isEdit ? await fetchData(id) : null;

  return <Form isEdit={isEdit} data={data} />;
}
