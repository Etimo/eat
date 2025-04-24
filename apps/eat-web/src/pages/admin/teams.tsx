import { AddCompetitionForm, AddTeamForm } from '@/components/forms';
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

export const TeamsPage = () => {
  const { data, refetch } = trpc.teams.list.useQuery();
  const { modalName, openModal, closeModal } = useModal();

  if (!data) return null;
  return (
    <div className="flex-1 flex flex-col gap-2 pt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Lag</h1>
        <Button className="dark" onClick={() => openModal('comp')}>
          Lägg till
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Namn</TableHead>
            <TableHead>Medlemmar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((team) => (
            <TableRow key={team.id} className="whitespace-nowrap">
              <TableCell>{team.name}</TableCell>
              <TableCell className="w-full">
                {team.users.length
                  ? team.users.map(({ name }) => name).join(', ')
                  : 'Inga medlemmar'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={modalName === 'comp'}>
        <AddTeamForm
          onFinish={() => {
            closeModal();
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};
