export const VOTE_HASH_MAPPING: Record<string, string> = {
  "1": "B86B273",
  "2": "FF34FC4", 
  "3": "E1C3D89",
  "4": "8F14E45",
  "5": "D4735E3",
  "6": "F58D3C7",
  "7": "A665A45",
  "8": "3C9B96B",
  "9": "19E8157",
  "10": "6B86B27",
  "11": "7B52009",
  "12": "BD307A3"
};

export const HASH_TO_ID_MAPPING: Record<string, string> = Object.fromEntries(
  Object.entries(VOTE_HASH_MAPPING).map(([id, hash]) => [hash, id])
);

export const getHashFromId = (id: string): string | null => {
  return VOTE_HASH_MAPPING[id] || null;
};

export const getIdFromHash = (hash: string): string | null => {
  return HASH_TO_ID_MAPPING[hash] || null;
};

export const isValidVoteHash = (hash: string): boolean => {
  return hash in HASH_TO_ID_MAPPING;
};
