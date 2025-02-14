import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { trpc } from '@/trpc';
import dayjs from 'dayjs';

export const CompetitionsPage = () => {
  const { data } = trpc.competitions.list.useQuery();

  if (!data) return null;
  return (
    <div className="flex-1 flex flex-col gap-2 pt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Tävlingar</h1>
        <Button className="dark">Lägg till</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tävling</TableHead>
            <TableHead>Startdatum</TableHead>
            <TableHead>Slutdatum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((competition) => (
            <TableRow>
              <TableCell>
                {dayjs(competition.startDate).format('YYYY')}
              </TableCell>
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

      {/* <Modal open={true} onClose={() => {}}></Modal> */}
    </div>
  );
};
