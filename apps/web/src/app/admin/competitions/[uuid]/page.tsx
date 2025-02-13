import { NavigationTrail } from '@/components/navigation';

export default async function Page({ params }: { params: { uuid: string } }) {
  return (
    <main className="flex flex-col gap-5 px-4 pt-4">
      <NavigationTrail slug="Competition" />
      Tävling
    </main>
  );
}
