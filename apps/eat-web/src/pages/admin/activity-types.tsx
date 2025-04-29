import { AddActivityTypeForm } from '@/components/forms/add-activity-type-form';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useModal } from '@/hooks/use-modal';
import { trpc } from '@/trpc';

export const ActivityTypesPage = () => {
  const { data, refetch } = trpc.activityTypes.list.useQuery();
  const { modalName, openModal, closeModal } = useModal();


  if (!data) return null;
  return (
    <div className="flex-1 flex flex-col gap-2 pt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Aktivitetstyper</h1>
        <Button className="dark" onClick={() => openModal('comp')}>
          Lägg till
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Namn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((competition) => (
            <TableRow key={competition.id} className="whitespace-nowrap">
              <TableCell className="w-full">{competition.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={modalName === 'comp'}>
        <AddActivityTypeForm
          onFinish={() => {
            closeModal();
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};
