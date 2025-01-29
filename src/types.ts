export type EmissionType = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

export type ChannelType = {
  id: number;
  emissions: EmissionType[];
};
