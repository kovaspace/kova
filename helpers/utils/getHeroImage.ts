const SUPABASE_URL =
  "https://qdsnlotkhjzlugngzjiw.supabase.co/storage/v1/object/public/app/";

export const getHeroImage = (accountId: string, spaceId: string): string => {
  return `${SUPABASE_URL}${accountId}/spaces/${spaceId}/0`;
};
