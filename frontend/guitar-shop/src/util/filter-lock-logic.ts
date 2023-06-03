import { FiltersType } from '../types/filters-type';
import {
  ALLOWED_STRINGS_BY_GUITAR,
  AvailableGuitarStringsEnum,
  AvailableGuitarTypesEnum
} from '../const/available-products.enum';


export function filterLockLogic(filter: FiltersType): FiltersType {
  const activeTypes: string[] = filter.type;
  const activeStrings: number[] = filter.strings;

  const result = {
    type: Object.values(AvailableGuitarTypesEnum) as string[],
    strings: Object.values(AvailableGuitarStringsEnum)
      .filter((value) => typeof value === 'number') as number[]
  };

  if (activeStrings.length === 0 && activeTypes.length === 0) {
    return result;
  }

  const allowedTypes: string[] = [];
  const allowedStrings: number[] = [];

  activeTypes.forEach((type) => {
    allowedStrings.push(...ALLOWED_STRINGS_BY_GUITAR[type]);
  });

  activeStrings.forEach((stringQty) => {
    for (const [key, value] of Object.entries(ALLOWED_STRINGS_BY_GUITAR)) {
      if (value.includes(stringQty)) {
        allowedTypes.push(key);
      }
    }
  });

  return {
    type: activeStrings.length === 0 ? result.type : Array.from(new Set(allowedTypes)),
    strings: activeTypes.length === 0 ? result.strings : Array.from(new Set(allowedStrings)),
  };
}
