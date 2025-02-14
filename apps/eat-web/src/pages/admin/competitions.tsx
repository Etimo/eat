import { AddCompetitionForm } from '@/components/forms';
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
import dayjs from 'dayjs';

export const CompetitionsPage = () => {
  const { data, refetch } = trpc.competitions.list.useQuery();
  const { modalName, openModal, closeModal } = useModal();

  if (!data) return null;
  return (
    <div className="flex-1 flex flex-col gap-2 pt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Tävlingar</h1>
        <Button className="dark" onClick={() => openModal('comp')}>
          Lägg till
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Tävling</TableHead>
            <TableHead>Startdatum</TableHead>
            <TableHead>Slutdatum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((competition) => (
            <TableRow key={competition.id} className="whitespace-nowrap">
              <TableCell className="w-full">{competition.name}</TableCell>
              <TableCell>
                {dayjs(competition.startDate).format('YYYY-MM-DD')}
              </TableCell>
              <TableCell>
                {dayjs(competition.endDate).format('YYYY-MM-DD')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={modalName === 'comp'}>
        <AddCompetitionForm
          onFinish={() => {
            closeModal();
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};
