import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@radix-ui/react-popover';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Command as CommandPrimitive } from 'cmdk';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from './ui/command';
import { CheckIcon } from 'lucide-react';
import { Input } from './ui/input';
import { trpc } from '@/trpc';

type Props = {
  name: string;
  selectedValue?: string;
  onSelectedValueChange: (value: string | null) => void;
};

export function ActivityTypeAutocomplete(props: Props) {
  const { name, selectedValue, onSelectedValueChange } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const form = useFormContext();
  const watch = useWatch({ name });
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<
    { id: string; name: string }[]
  >([]);

  const { data, isLoading } = trpc.activityTypes.list.useQuery();
  const utils = trpc.useUtils();
  const createActivityTypeMutation = trpc.activityTypes.create.useMutation({
    onSuccess: async (data) => {
      setSearchValue(data.name);
      form.setValue(name, data.id);
      void form.trigger(name);
      void utils.activityTypes.list.reset();
      void utils.activityTypes.invalidate();
    },
  });

  const onSearchValueChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  useEffect(() => {
    setFilteredData(
      (data ?? []).filter((item) =>
        item.name.toLowerCase().startsWith(searchValue.toLowerCase()),
      ),
    );
  }, [data, searchValue]);

  const mappedItems = useMemo(
    () =>
      (data ?? []).reduce(
        (acc, option) => {
          acc[option.id] = option.name;
          return acc;
        },
        {} as Record<string, string>,
      ),
    [data],
  );

  const currentName = useMemo(() => mappedItems[watch], [mappedItems, watch]);

  const reset = useCallback(() => {
    onSelectedValueChange(null);
    onSearchValueChange('');
  }, [onSearchValueChange, onSelectedValueChange]);

  const onSelectItem = useCallback(
    (value: string) => {
      if (value === selectedValue || value === undefined) {
        reset();
      } else {
        onSelectedValueChange(value);
        onSearchValueChange(`${mappedItems[value]}`);
      }
      setOpen(false);
    },
    [selectedValue, mappedItems],
  );

  const preventPopOverContentDefault = useCallback((e: Event) => {
    if (e.target instanceof Element && e.target.hasAttribute('cmdk-input')) {
      e.preventDefault();
    }
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Only show field value until we open the popover */}
      <Input
        value={currentName}
        placeholder="Ange typ av aktivitet..."
        readOnly
        onClick={() => setOpen(true)}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={onSearchValueChange}
              onKeyDown={(e) => setOpen(e.key !== 'Escape')}
              onMouseDown={() => setOpen((open) => !!searchValue || !open)}
              onFocus={() => setOpen(true)}
              className="absolute top-0 left-0 w-full bg-white"
              style={{ opacity: open ? '100' : '0' }}
            >
              <Input placeholder="Ange typ av aktivitet..." />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={preventPopOverContentDefault}
            className="border rounded-md border-gray-200 p-0 bg-white mt-1 shadow-md z-[99999]"
            style={{ width: wrapperRef.current?.offsetWidth }}
          >
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="py-4">LADDAR</div>
                </CommandPrimitive.Loading>
              )}
              {filteredData.length > 0 && !isLoading ? (
                <CommandGroup>
                  {filteredData.map(({ id, name }) => (
                    <CommandItem
                      key={id}
                      value={id}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                      className="flex gap-2"
                    >
                      <CheckIcon
                        className={cn(
                          'h-4 w-4',
                          selectedValue === id ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <div>{name}</div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                <CommandEmpty>
                  <button
                    className="cursor-pointer py-1 px-2 hover:bg-gray-200 transition-colors rounded-md"
                    onClick={() =>
                      createActivityTypeMutation.mutate({ name: searchValue })
                    }
                    disabled={createActivityTypeMutation.isLoading}
                  >
                    Lägg till <span className="font-medium">{searchValue}</span>
                    ...
                  </button>
                </CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
