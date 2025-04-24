import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { useMemo, useState } from 'react';

export const ActivitiesPage = () => {
  const { data: competitions } = trpc.competitions.list.useQuery();
  const [competitionId, setCompetitionId] = useState<string | null>(null);
  const { data } = trpc.activities.list.useQuery(competitionId!, { enabled: !!competitionId });

  const defaultValue = useMemo(() => {
    const value =  competitions?.find((comp) => comp.isActive)?.id
    if (value) setCompetitionId(value);
    return value;
  }, [competitions])

  if (!competitions) return null;

  return (
    <div className="flex-1 flex flex-col gap-2 pt-4">
    <Select onValueChange={(value) => {
      setCompetitionId(value);
    }} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Tävling" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          { competitions?.map((competition) => (
            <SelectItem key={competition.id} value={competition.id}>
              {competition.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Namn</TableHead>
            <TableHead>Lagnamn</TableHead>
            <TableHead>Datum</TableHead>
            <TableHead>Aktivitetstyp</TableHead>
            <TableHead>Minuter</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((activity) => (
            <TableRow key={activity.id} className="whitespace-nowrap">
              <TableCell className="w-full">{activity.name}</TableCell>
              <TableCell className="w-full">{activity.teamName}</TableCell>
              <TableCell>
                {dayjs(activity.date).format('YYYY-MM-DD')}
              </TableCell>
              <TableCell className="w-full">{activity.activityType}</TableCell>
              <TableCell className="w-full">{activity.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
