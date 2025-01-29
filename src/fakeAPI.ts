// fakeApi.ts
export const fetchChannelData = (channelId: number) => {
  return new Promise<{ title: string; subtitle: string; imageUrl: string }[]>((resolve) => {
    setTimeout(() => {
      const fakeData = Array.from({ length: 10 }, (_, index) => ({
        title: `Show ${index + 1} - Channel ${channelId}`,
        subtitle: `Subtitle for Show ${index + 1}`,
        imageUrl: `https://picsum.photos/200?random=${channelId * 10 + index}`,
      }));
      resolve(fakeData);
    }, 1000); // Simulate API call delay
  });
};
