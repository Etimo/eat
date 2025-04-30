import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc';
import { PenIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useModal } from '@/hooks/use-modal';
import { Modal } from './ui/modal';
import { UpdateTeamForm } from './forms/update-team-form';

type Props = {
  team: {
    id: string;
    name: string;
    minutes: number;
    activities: number;
    users: { id: string; name: string }[];
  };
};
export const TeamActivityCard = (props: Props) => {
  const currentTeamQuery = trpc.teams.getCurrentUserTeam.useQuery();
  const utils = trpc.useUtils();

  const { user } = useAuth();
  const isTeamMember = props.team.users.some((u) => u.id === user?.id);

  const { modalName, closeModal, openModal, targetId } = useModal();

  return (
    <>
      <Card
        className={cn({
          'bg-white/25': currentTeamQuery.data?.id === props.team.id,
        })}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="inline-block">{props.team.name}</CardTitle>
            {isTeamMember && (
              <Button
                variant="ghost"
                onClick={() =>
                  openModal(`update-${props.team.id}`, props.team.id)
                }
              >
                Ändra lagnamn
                <PenIcon className="group-hover:text-etimo transition-colors w-5 h-5" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <div className="text-lg font-medium">Total aktivitet</div>
                <div className="text-xl font-semibold text-green-400">
                  {props.team.minutes.toLocaleString('sv-SE')} min
                </div>
                <div className="text-lg font-medium">Antal aktiviteter</div>
                <div className="text-xl font-semibold text-green-400">
                  {props.team.activities}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">Medlemmar</h2>
              {props.team.users.map((u) => (
                <div
                  key={u.id}
                  className={cn('text-sm font-medium text-muted-foreground', {
                    'text-green-400 font-semibold': u.id === user?.id,
                  })}
                >
                  {u.name}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={modalName === `update-${props.team.id}`}>
        <UpdateTeamForm
          id={targetId!}
          onFinish={() => {
            closeModal();

            void utils.teams.getCurrentUserTeam.reset();
            void utils.teams.invalidate();
          }}
        />
      </Modal>
    </>
  );
};
