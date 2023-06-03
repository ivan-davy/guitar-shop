export enum AvailableGuitarTypesEnum {
  Acoustic = 'Acoustic',
  Electric = 'Electric',
  Ukulele = 'Ukulele'
}

export enum AvailableGuitarStringsEnum {
  Four = 4,
  Six = 6,
  Seven = 7,
  Twelve = 12,
}

type GuitarTypeNamesType = {
  [key: string]: string;
}
export const GUITAR_TYPES_NAMES_PLURAL: GuitarTypeNamesType = {
  [AvailableGuitarTypesEnum.Acoustic]: 'Акустические гитары',
  [AvailableGuitarTypesEnum.Electric]: 'Электрогитары',
  [AvailableGuitarTypesEnum.Ukulele]: 'Укулеле',
};

export const GUITAR_TYPES_NAMES: GuitarTypeNamesType = {
  [AvailableGuitarTypesEnum.Acoustic]: 'Акустическая гитара',
  [AvailableGuitarTypesEnum.Electric]: 'Электрогитара',
  [AvailableGuitarTypesEnum.Ukulele]: 'Укулеле',
};

type AllowedStringsByGuitarType = {
  [key: string]: number[];
}
export const ALLOWED_STRINGS_BY_GUITAR: AllowedStringsByGuitarType = {
  [AvailableGuitarTypesEnum.Acoustic]: [6, 7, 12],
  [AvailableGuitarTypesEnum.Electric]: [4, 6, 7],
  [AvailableGuitarTypesEnum.Ukulele]: [4]
};


