import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  team: {
    name: string
    minutes: number;
    activities: number
  }
}
export const TeamActivityCard = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.team.name}</CardTitle>
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
        </div>
      </CardContent>
    </Card>
  );
};
