import { AddCompetitionForm } from '@/components/forms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useParams } from 'react-router';


export const CompetitionPage = () => {
  const { id } = useParams();
  const { data, refetch } = trpc.competitions.get.useQuery(id!);
  const { modalName, closeModal } = useModal();

  if (!data) return null;
  return (
    <div className="flex-1 flex flex-col gap-2 pt-4">
      <Card className="flex-1 flex flex-col gap-2 p-4">
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <div className="text-lg font-medium">Startdatum</div>
                <div className="text-xl font-semibold text-green-400">
                  {data?.startDate}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-medium">Slutdatum</div>
                <div className="text-xl font-semibold text-red-400">
                  {data?.endDate}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Lag</TableHead>
            <TableHead>Minuter</TableHead>
            <TableHead>Aktiviteter</TableHead>
            <TableHead>Medlemmar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.teams.map((team) => (
            <TableRow key={team.id} className="whitespace-nowrap">
              <TableCell className="w-full">{team.name}</TableCell>
              <TableCell>{team.totalMinutes}</TableCell>
              <TableCell>{team.totalUniqueActivities}</TableCell>
              <TableCell>
                {team.members.map((member) => member.name).join(', ')}
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
