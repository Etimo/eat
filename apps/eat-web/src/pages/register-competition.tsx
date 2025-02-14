import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '../components/datepickerwithrange';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CreateCompetition = () => {
    return (
    <div>
      <Label>Skapa ny tävling</Label> 
      <Input />
      <DatePickerWithRange />
      <Button>      
      <span className="text-lg">Spara tävling</span>
      </Button>
    </div>
  );
};
